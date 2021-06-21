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
import { useParams } from "react-router-dom";
import { LinkHolder } from "../components/LinkHolder";
import { getInitials } from "../lib/utils";
import TimerRoundedIcon from "@material-ui/icons/TimerRounded";
import Avatar from "@material-ui/core/Avatar";
import ah from "../assets/anonymousHolder.png";
import _ from "lodash";
import { PollView } from "./PollView";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import styled from "styled-components";

const SERVER_URL = "http://localhost:5000";

const StyledPollFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Poll: React.FC = () => {
  let socketRef = useRef<Socket>();
  let { state } = usePollContext();
  let { id } = useParams<{ id: string }>();

  let [pollOptions, setPollOptions] = useState<InitialStateType["pollOptions"]>(
    { "": { text: "", selected: false, votes: {} } }
  );

  let [users, setUsers] = useState<any>(null);
  let [meta, setMeta] = useState<any>(null);
  let [radioSelected, setRadioSelected] = useState<any>({ "": {} });

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
    console.log("Can't connect:", error.message);
  };

  const OnVoted = ({ pollOptions, meta }: { pollOptions: any; meta: any }) => {
    setPollOptions(pollOptions);
    setMeta(meta);
  };

  function setUpSocket() {
    socketRef.current = io(SERVER_URL, {
      autoConnect: false,
      auth: {
        sessionID: id,
        userID: state.userID,
        username: state.username,
        photoURL: state.photoURL,
      },
    });

    socketRef.current.on("session", OnSession);
    socketRef.current.on("user_connected", OnUserConnected);
    socketRef.current.on("user_disconnected", OnUserDisconnected);
    socketRef.current.on("connect_error", OnConnectError);
    socketRef.current.on("voted", OnVoted);
    socketRef.current.connect();
    socketRef.current.onAny((event: any, ...args: any) => {
      console.log(event, args);
    });
  }

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

  if (!pollOptions || !users || !meta) {
    return <h1>Loading...</h1>;
  }

  //TODO refactor to separate views => //TODO For a user who voted, for those who voted
  //TODO verdict button => //TODO verdict component
  //TODO limit reconnect attempts
  //TODO optional username input for non-creators
  //TODO "would be nice to have" better types...
  //TODO test for errors

  return (
    <>
      <h2>Users Online: {Object.keys(users).length}</h2>
      <UsersSlider {...settings(Object.keys(users).length)}>
        {Object.keys(users).map((userID: string) => {
          let user = users[userID];
          return meta.anonymousVoting ? (
            <Avatar src={ah} key={userID} />
          ) : (
            <Avatar
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
        {state.userID === meta.pollCreator && (
          <StyledButton endIcon={<TimerRoundedIcon />}>Verdict</StyledButton>
        )}
        <StyledButton endIcon={<CheckRoundedIcon />} onClick={handleVoteClick}>
          Vote
        </StyledButton>
      </StyledPollFooter>
    </>
  );
};
