import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { UsersSlider, settings } from "../components/UsersSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PollActive } from "./PollActive";
import {
  InitialStateType,
  OptionType,
  usePollContext,
} from "../globalProvider";
import { StyledButton } from "../components/StyledButton";
import { useHistory, useParams } from "react-router-dom";
import { LinkHolder } from "../components/LinkHolder";
import { getInitials } from "../lib/utils";
import TimerRoundedIcon from "@material-ui/icons/TimerRounded";
import { StyledAvatar } from "./Avatar";
import ah from "../assets/anonymousHolder.png";
import _ from "lodash";
import { PollView } from "./PollView";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import styled from "styled-components";
import { PieChart } from "../components/PieChart";
import getRandomColor from "randomcolor";
import { toast } from "react-toastify";
import { HOST } from "../config";

const StyledPollFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Poll: React.FC = () => {
  let socketRef = useRef<Socket>();
  let history = useHistory();
  let { state, dispatch } = usePollContext();
  let { id } = useParams<{ id: string }>();
  // to avoid confusion, meta object has 'isSummarized' property which means: count votes and show a pie chart
  let [isPollFinished, setIsPollFinished] = useState(false);

  let [pollOptions, setPollOptions] = useState<InitialStateType["pollOptions"]>(
    { "": { text: "", selected: false, votes: {} } }
  );

  let [users, setUsers] = useState<any>();
  let [meta, setMeta] = useState<any>({});
  let [radioSelected, setRadioSelected] = useState<
    InitialStateType["pollOptions"]
  >({
    "": { text: "", selected: false, votes: {} },
  });

  const OnUserConnected = ({
    id,
    username,
    photoURL,
  }: {
    id: string;
    username: string;
    photoURL: string;
  }) => {
    setUsers((oldUsers: any) => {
      // if doesn't exist
      if (!oldUsers[id]) {
        let deepClone = _.cloneDeep(oldUsers);
        deepClone[id] = { username, photoURL };
        return deepClone;
      }
      return oldUsers;
    });
  };

  const OnUserDisconnected = ({ id }: { id: string }) => {
    setUsers((oldUsers: any) => {
      // if exists and not self
      if (oldUsers[id] && state.userID !== id) {
        let deepClone = _.cloneDeep(oldUsers);
        delete deepClone[id];
        return deepClone;
      }
      return oldUsers;
    });
  };

  const OnSession = ({
    pollOptions,
    meta,
    users,
  }: {
    pollOptions: any;
    meta: any;
    users: any;
  }) => {
    setPollOptions(pollOptions);
    setMeta(meta);
    setUsers(users);
  };

  const OnConnectError = (error: any) => {
    setIsPollFinished(true);
    toast("Connection error.", { position: "top-right" });
  };

  const OnVoted = ({ pollOptions, meta }: { pollOptions: any; meta: any }) => {
    // receiving pollOption to track votes for each individual option and meta to get the overall list of voted users.
    setPollOptions(pollOptions);
    setMeta(meta);
  };

  const OnSummarize = ({ meta }: { meta: any }) => {
    // receiving meta to track the 'isSummarized flag'
    setMeta(meta);
  };

  const OnConnect = () => setIsPollFinished(false);

  const connectClient = () => {
    setIsPollFinished(false);
    socketRef.current?.connect();
  };

  const OnPollClose = ({ userID }: { userID: string }) => {
    setIsPollFinished(true);

    if (userID === state.userID) {
      dispatch({ type: "closePoll" });
      history.push("/");
    }

    socketRef.current?.disconnect();
  };

  const setUpSocket = () => {
    socketRef.current = io(HOST, {
      autoConnect: false,
      auth: {
        sessionID: id,
        userID: state.userID,
        username: state.username,
        photoURL: state.photoURL,
      },
      reconnectionAttempts: 5,
    });

    socketRef.current.on("session", OnSession);
    socketRef.current.on("user_connected", OnUserConnected);
    socketRef.current.on("user_disconnected", OnUserDisconnected);
    socketRef.current.on("connect_error", OnConnectError);
    socketRef.current.on("voted", OnVoted);
    socketRef.current.on("summarize", OnSummarize);
    socketRef.current.on("connect", OnConnect);
    socketRef.current.on("close_poll", OnPollClose);

    connectClient();

    socketRef.current.onAny((event: any, ...args: any) => {
      console.log(event, args);
    });
  };

  useEffect(() => {
    setUpSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.offAny();
      }
    };
  }, []);

  const handleOnChange =
    (id: OptionType["id"]) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (pollOptions && pollOptions[id]) {
        if (meta.multipleAnswers) {
          setPollOptions({
            ...pollOptions,
            [id]: { ...pollOptions[id], selected: !pollOptions[id].selected },
          });
        } else {
          setRadioSelected({ [id]: { ...pollOptions[id], selected: true } });
        }
      }
    };

  const handleVoteClick = () => {
    if (pollOptions || radioSelected) {
      let votes;
      if (meta.multipleAnswers) {
        votes = Object.keys(pollOptions)
          .filter((id) => pollOptions[id].selected)
          .reduce((acc, id) => {
            return { ...acc, [id]: { ...pollOptions[id] } };
          }, {});
      } else {
        votes = radioSelected;
      }
      socketRef.current?.emit("voted", { votes });
    }
  };

  const handleOnSummarizeClick = () => {
    socketRef.current?.emit("summarize");
  };

  const handleOnClosePollClick = () => {
    socketRef.current?.emit("close_poll", { userID: state.userID });
  };

  const hasSelected = (options: InitialStateType["pollOptions"]) =>
    Object.keys(options).some((key) => options[key].selected);

  const areThereEnoughVotes = () => {
    return Object.keys(meta.alreadyVoted).length > 0;
  };

  if (isPollFinished) {
    return (
      <>
        <h2>
          Either you are experiencing connection problems or the selected poll
          has been deleted.😞
        </h2>
        <StyledButton alignRight={true} onClick={connectClient}>
          Try Reconnect
        </StyledButton>
      </>
    );
  }

  if (!pollOptions || !users || !meta) {
    return <h1>Loading...</h1>;
  }

  if (meta.isSummarized) {
    let labelsData = Object.keys(pollOptions).reduce(
      ([labels, data]: Array<Array<string | number>>, key: string) => {
        return [
          labels.concat(pollOptions[key].text),
          data.concat(Object.keys(pollOptions[key].votes).length),
        ];
      },
      [[], []]
    );

    let backGroundColor = Array(Object.keys(pollOptions).length)
      .fill(0)
      .map((_) => getRandomColor({ format: "rgb", luminosity: "light" }));
    return (
      <>
        <PieChart
          data={labelsData[1] as number[]}
          labels={labelsData[0] as string[]}
          label="Results"
          backgroundColor={backGroundColor}
        />
        <StyledButton alignRight={true} onClick={handleOnClosePollClick}>
          Close the poll
        </StyledButton>
      </>
    );
  }

  const isCreator = meta.pollCreator === state.userID;
  const hasAlreadyVoted = Object.keys(meta.alreadyVoted).includes(state.userID);

  return (
    <>
      <h2>Users Online: {Object.keys(users).length}</h2>
      <UsersSlider {...settings(Object.keys(users).length)}>
        {Object.keys(users).map((userID: string) => {
          let user = users[userID];
          return meta.anonymousVoting ? (
            <StyledAvatar src={ah} key={userID} />
          ) : (
            <StyledAvatar
              src={user.photoURL}
              alt={getInitials(user.username)}
              key={userID}
            />
          );
        })}
      </UsersSlider>
      {state.userID === meta.pollCreator && <LinkHolder />}
      {!meta.alreadyVoted[state.userID] ? (
        <PollActive
          meta={meta}
          onChange={handleOnChange}
          pollOptions={pollOptions}
          radioSelected={radioSelected}
        />
      ) : (
        <PollView meta={meta} pollOptions={pollOptions} />
      )}

      <StyledPollFooter>
        {isCreator && hasAlreadyVoted && (
          <StyledButton
            endIcon={<TimerRoundedIcon />}
            onClick={handleOnSummarizeClick}
            disabled={!areThereEnoughVotes}
          >
            Verdict
          </StyledButton>
        )}
        {!hasAlreadyVoted && (
          <StyledButton
            endIcon={<CheckRoundedIcon />}
            onClick={handleVoteClick}
            disabled={
              !hasSelected(meta.multipleAnswers ? pollOptions : radioSelected)
            }
          >
            Vote
          </StyledButton>
        )}
      </StyledPollFooter>
    </>
  );
};
