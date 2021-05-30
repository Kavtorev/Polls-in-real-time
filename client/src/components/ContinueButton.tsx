import React from "react";
import styled from "styled-components";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";

const Button = styled.button`
  display: block;
  width: 147px;
  height: 35px;
  border-radius: 2px;
  outline: none;
  border: 0;
  cursor: pointer;
  background-color: var(--primary-button-backgroundColor);
  margin-left: auto;
  margin-right: 0;
  color: var(--primary-button-color);
  font-weight: 600;

  :hover {
    box-shadow: 0 0 35px -2px rgba(0, 0, 0, 0.2);
  }

  :not(:hover),
  :hover {
    transition: ease-in-out all 0.4s;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-around;
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
