import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { UsersSlider, settings } from "../components/UsersSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Avatar } from "../components/Avatar";
import { OptionsList } from "../components/OptionsList";
import { Checkbox } from "../components/Checkbox";
import { Radio } from "../components/Radio";
import { OptionType, usePollContext } from "../globalProvider";
import { StyledButton } from "../components/StyledButton";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

const SERVER_URL = "http://localhost:5000";

export const PollPage: React.FC = () => {
  let socketRef = useRef<Socket>();
  let { state } = usePollContext();
  let [selected, setSelected] = useState<any>(
    state.multipleAnswers
      ? state.pollOptions.reduce((acc, { id }: OptionType) => {
          return { ...acc, [id]: false };
        }, {})
      : ""
  );

  useEffect(() => {
    socketRef.current = io(SERVER_URL, { autoConnect: false });

    // emit joined

    // on voted

    // on submitted

    // on disconnected

    socketRef.current.onAny((event, ...args) => {
      console.log(event, args);
    });
    return () => {
      // emit disconnected
    };
  }, []);

  const handleOnChange =
    (id: OptionType["id"]) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (state.multipleAnswers) {
        setSelected({ ...selected, [id]: !selected[id] });
      } else {
        setSelected(id);
      }
    };
  return (
    <>
      <UsersSlider {...settings}>
        <Avatar initials="DK" />
        <Avatar initials="DK" />
        <Avatar initials="DK" />
        <Avatar initials="DK" />
        <Avatar initials="DK" />
        <Avatar initials="DK" />
      </UsersSlider>
      <form action="">
        <OptionsList
          render={(id) =>
            state.multipleAnswers ? (
              <Checkbox onChange={handleOnChange(id)} />
            ) : (
              <Radio onChange={handleOnChange(id)} checked={selected === id} />
            )
          }
        />
        <StyledButton endIcon={<CheckRoundedIcon />}>Vote</StyledButton>
      </form>
    </>
  );
};
