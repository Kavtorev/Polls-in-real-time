import React, { useState } from "react";
import styled from "styled-components";
import { usePollContext, OPTIONS_LIMIT } from "../globalProvider";
import { PlusIcon } from "../icons/PlusIcon";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { StyledTextInput as TextInput } from "./TextInput";

const StyledOptionInput = styled(TextInput)`
  height: 45px;
  font-size: 1.3rem;
  border: 0;
`;

const Form = styled.form`
  display: flex;
  align-items: baseline;
  position: relative;
`;

const StyledLabel = styled.label`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 0.9rem;
  color: var(--inactive-dark-color);
`;

export const OptionHolder: React.FC = () => {
  let { state, dispatch } = usePollContext();
  let [option, setOption] = useState("");

  let handleOnOptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOption(event.target.value);

  let handleOnSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    event.preventDefault();
    if (option.trim() && !state.isLimitReached) {
      dispatch({
        type: "addOption",
        payload: { id: uuidv4(), text: option, votes: [], selected: false },
      });
      setOption("");
      return;
    }
    toast("Field is empty.");
  };

  return (
    <Form action="" onSubmit={handleOnSubmit}>
      <StyledOptionInput
        id="new option"
        autoFocus={true}
        placeholder={
          state.isLimitReached
            ? `You have reached the limit.`
            : `Add an option...`
        }
        name="newOption"
        onChange={handleOnOptionChange}
        disabled={state.isLimitReached}
        value={state.isLimitReached ? "" : option}
      />
      {!state.isLimitReached ? (
        <>
          <StyledLabel htmlFor="new option">
            {`You can add ${
              OPTIONS_LIMIT - Object.keys(state.pollOptions).length
            } more options`}
          </StyledLabel>
          <PlusIcon onClick={handleOnSubmit} />
        </>
      ) : null}
    </Form>
  );
};
