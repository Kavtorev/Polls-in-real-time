import React, { useEffect, useRef } from "react";
import { StyledTextInput as TextInput } from "../components/TextInput";
import { ContinueButton } from "../components/ContinueButton";
import { CheckboxLabel } from "../components/CheckboxLabel";
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
  const { state, dispatch } = usePollContext();
  const history = useHistory();

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
        autoFocus={true}
        placeholder="polls' name..."
        name="pollName"
        onChange={handleOnPollNameChange}
        value={state.pollName}
      />
      <CheckBoxGroup>
        <CheckboxLabel label="Anonymous voting">
          <Checkbox
            name="anonymousVoting"
            checked={state.anonymousVoting}
            onChange={() =>
              dispatch({
                type: "setConfigurationOption",
                payload: "anonymousVoting",
              })
            }
          />
        </CheckboxLabel>

        <CheckboxLabel label="Multiple answers">
          <Checkbox
            name="multipleAnswers"
            checked={state.multipleAnswers}
            onChange={() =>
              dispatch({
                type: "setConfigurationOption",
                payload: "multipleAnswers",
              })
            }
          />
        </CheckboxLabel>
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
