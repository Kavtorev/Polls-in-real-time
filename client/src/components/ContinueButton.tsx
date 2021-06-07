import React from "react";
import styled from "styled-components";
import { Button as StyledButton } from "./StyledButton";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { ButtonContent } from "./ButtonContent";
const Button = styled(StyledButton)`
  background-color: var(--primary-button-backgroundColor);
  color: var(--primary-button-color);
  font-weight: 600;
  margin-top: var(--top-bottom-margin);
  margin-left: auto;
  @media only screen and (max-width: 600px) {
    margin: 0 auto;
  }
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
