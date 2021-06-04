import React from "react";
import styled from "styled-components";
import { Button as StyledButton } from "./StyledButton";
import { ButtonContent } from "./ButtonContent";
import { ShuffleIcon } from "../icons/ShuffleIcon";
import { usePollContext } from "../globalProvider";
import { shuffle } from "../lib/utils";

const Button = styled(StyledButton)`
  border: 3px solid var(--primary-button-backgroundColor);
  color: var(--primary-button-color);
  background-color: white;
  font-weight: 600;
`;

export const ShuffleButton: React.FC = () => {
  const { state, dispatch } = usePollContext();
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    dispatch({
      type: "shuffleOptions",
      payload: shuffle([...state.pollOptions]),
    });
  return (
    <Button onClick={handleOnClick}>
      <ButtonContent>
        Shuffle... <ShuffleIcon />
      </ButtonContent>
    </Button>
  );
};
