import React from "react";
import { TextInput } from "../components/TextInput";
import { ContinueButton } from "../components/ContinueButton";
import { Checkbox } from "../components/Checkbox";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { usePollContext } from "../globalProvider";
import { toast } from "react-toastify";

const CheckBoxGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const InitPage: React.FC = () => {
  const history = useHistory();
  const { state, dispatch } = usePollContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pollName = state.pollName.trim();
    const username = state.username.trim();

    if (pollName && (username || state.anonymousVoting)) {
      history.push("/config");
      return;
    }
    toast("Please fill all the fields");
    return;
  };

  const handleOnPollNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "setPollName", payload: event.target.value });
  const handleOnUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "setUsername", payload: event.target.value });

  return (
    <form action="" onSubmit={handleSubmit}>
      <TextInput
        placeholder="Your poll's name..."
        name="pollName"
        onChange={handleOnPollNameChange}
        value={state.pollName}
      />
      <CheckBoxGroup>
        <Checkbox
          name="anonymousVoting"
          label="Anonymous voting"
          checked={state.anonymousVoting}
          onChange={() =>
            dispatch({
              type: "setConfigurationOption",
              payload: "anonymousVoting",
            })
          }
        />
        <Checkbox
          name="multipleAnswers"
          label="Multiple answers"
          checked={state.multipleAnswers}
          onChange={() =>
            dispatch({
              type: "setConfigurationOption",
              payload: "multipleAnswers",
            })
          }
        />
      </CheckBoxGroup>
      {!state.anonymousVoting && (
        <TextInput
          placeholder="Your username..."
          name="username"
          onChange={handleOnUsernameChange}
          value={state.username}
        />
      )}
      <ContinueButton />
    </form>
  );
};
