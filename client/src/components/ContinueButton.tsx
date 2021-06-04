import React from "react";
import styled from "styled-components";
import { Button as StyledButton } from "./StyledButton";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { ButtonContent } from "./ButtonContent";
const Button = styled(StyledButton)`
  background-color: var(--primary-button-backgroundColor);
  color: var(--primary-button-color);
  font-weight: 600;
  margin-left: auto;
`;

export const ContinueButton: React.FC = () => {
  return (
    <Button>
      <ButtonContent>
        Continue... <ArrowRightIcon />
      </ButtonContent>
    </Button>
  );
};
