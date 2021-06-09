import React from "react";
import styled from "styled-components";
import { StyledButton } from "./StyledButton";

const StyledUndoButton = styled(StyledButton)`
  margin: 0 auto;
  width: 100%;
  font-size: 1rem;
  background-color: transparent;
  text-transform: uppercase;
  color: currentColor;
  :hover {
    box-shadow: none;
  }
`;

export const UndoButton: React.FC = () => {
  return <StyledUndoButton>Undo</StyledUndoButton>;
};
