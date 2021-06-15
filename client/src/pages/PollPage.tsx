import React, { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { UsersSlider, settings } from "../components/UsersSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Avatar } from "../components/Avatar";

const SERVER_URL = "http://localhost:5000";

export const PollPage: React.FC = () => {
  let socketRef = useRef<Socket>();

  useEffect(() => {
    console.log("hello");
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

  return (
    <UsersSlider {...settings}>
      <Avatar initials="DK" />
      <Avatar initials="DK" />
      <Avatar initials="DK" />
      <Avatar initials="DK" />
      <Avatar initials="DK" />
      <Avatar initials="DK" />
    </UsersSlider>
  );
};
