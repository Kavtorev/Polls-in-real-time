import React, { useState } from "react";
import { TextInput } from "../components/TextInput";
import { ContinueButton } from "../components/ContinueButton";
import { Checkbox } from "../components/Checkbox";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const CheckBoxGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const InitPage: React.FC = () => {
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    history.push("/config");
  };
  return (
    <div className="pageWrapper">
      <form action="" onSubmit={handleSubmit}>
        <TextInput placeholder="Your poll name..." name="poll name" />
        <CheckBoxGroup>
          <Checkbox name="anonym" label="Anonymous voting" />
          <Checkbox name="multans" label="Multiple answers" />
        </CheckBoxGroup>
        <TextInput placeholder="Your username..." name="username" />
        <ContinueButton />
      </form>
    </div>
  );
};
