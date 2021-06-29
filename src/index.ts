import express, { Application, Request, Response } from "express";
import { Server, Socket } from "socket.io";
import path from "path";
import { nanoid } from "nanoid";
import SessionStore from "./SessionStore";
import { SESSION_EXPIRY_TIME_MS } from "./config/session";
import { IN_PROD } from "./config/app";

const app: Application = express();
const PORT = 5000;
const sessionStore = new SessionStore();

const getUniqueId = () => nanoid();

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "..", "client", "build")));
app.get("/", (req, res) => {
  res.sendFile(
    path.resolve(path.join(__dirname, "..", "client", "build", "index.html"))
  );
});

app.post("/get_link", async (req, res) => {
  // get stuff from body
  let { userID, pollName, pollOptions, multipleAnswers, anonymousVoting } =
    req.body;

  //TODO validate stuff from body

  // generate a unique hash

  let sessionID = getUniqueId();

  // create a session

  sessionStore.createSession(sessionID, {
    pollOptions,
    meta: {
      pollName,
      multipleAnswers,
      anonymousVoting,
      pollCreator: userID,
      alreadyVoted: {},
      isSummarized: false,
      createdAt: Date.now(),
    },
  });

  // response with a link

  res.json({ sessionID });
});

app.post("validate_session", async (req, res) => {
  let { id } = req.body;
});

const server = app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.use((socket: any, next) => {
  let { sessionID, userID, username, photoURL } = socket.handshake.auth;

  if (!sessionID || !userID) {
    return next(new Error("Invalid session indentifier."));
  }

  let session = sessionStore.getSessionById(sessionID);

  if (!session || session.createdAt + SESSION_EXPIRY_TIME_MS < Date.now()) {
    return next(new Error("Poll has expired."));
  }

  socket.sessionID = sessionID;
  socket.userID = userID;
  socket.username = username;
  socket.photoURL = photoURL;
  next();
});

io.on("connection", async (socket: any) => {
  let sessionID = socket.sessionID;
  let session = sessionStore.getSessionById(sessionID);
  let users: any = {};

  // join session...
  socket.join(sessionID);
  // to be in sync with multiple tabs
  socket.join(socket.userID);
  // sockets - a list of Sockets for a 'sesionID' room
  try {
    const sockets = (await io.in(sessionID).fetchSockets()) as any;
    for (let { username, photoURL, userID } of sockets) {
      users[userID] = {
        username,
        photoURL,
      };
    }
  } catch (error) {}

  // send sessions' data
  socket.emit("session", {
    pollOptions: session.pollOptions,
    meta: session.meta,
    users,
  });
  // notify others about recent connection
  socket.to(sessionID).emit("user_connected", {
    id: socket.userID,
    username: socket.username,
    photoURL: socket.photoURL,
  });
  //
  socket.on("voted", (args: any) => {
    if (args.votes) {
      // update sessions' votes
      for (let key of Object.keys(args.votes)) {
        session.pollOptions[key].votes[socket.userID] = {
          username: socket.username,
          photoURL: socket.photoURL,
        };
      }
      // unique votes
      session.meta.alreadyVoted[socket.userID] = {
        username: socket.username,
      };

      io.to(sessionID).to(socket.userID).emit("voted", {
        pollOptions: session.pollOptions,
        meta: session.meta,
      });
    }
    console.log("someone voted: ....", session);
  });

  socket.on("summarize", () => {
    io.to(sessionID)
      .to(socket.userID)
      .emit("summarize", {
        meta: sessionStore.summarizeSession(sessionID).meta,
      });
  });

  socket.on("close_poll", ({ userID }: { userID: string }) => {
    sessionStore.removeSession(sessionID);
    io.to(sessionID).to(socket.userID).emit("close_poll", { userID });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    socket.to(sessionID).emit("user_disconnected", { id: socket.userID });
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err: any, req: Request, res: Response) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error." });
});
