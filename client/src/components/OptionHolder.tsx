import React, { useState } from "react";
import styled from "styled-components";
import { usePollContext } from "../globalProvider";
import { PlusIcon } from "../icons/PlusIcon";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { StyledTextInput as TextInput } from "./TextInput";

const StyledOptionInput = styled(TextInput)`
  height: 45px;
  font-size: 1.3rem;
  border: 0;
`;

export const OptionHolder: React.FC = () => {
  let { dispatch } = usePollContext();
  let [option, setOption] = useState("");

  let handleOnOptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOption(event.target.value);

  let handleOnSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    event.preventDefault();
    if (option.trim()) {
      dispatch({ type: "addOption", payload: { id: uuidv4(), text: option } });
      setOption("");
      return;
    }
    toast("Field is empty.");
  };

  return (
    <form action="" onSubmit={handleOnSubmit}>
      <StyledOptionInput
        autoFocus={true}
        placeholder="an option..."
        name="newOption"
        onChange={handleOnOptionChange}
        value={option}
      />
      <PlusIcon onClick={handleOnSubmit} />
    </form>
  );
};
