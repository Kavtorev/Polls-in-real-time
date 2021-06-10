import express, { Application, Request, Response } from "express";
import { Server, Socket } from "socket.io";

const app: Application = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

const server = app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("connected");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err: any, req: Request, res: Response) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error." });
});
