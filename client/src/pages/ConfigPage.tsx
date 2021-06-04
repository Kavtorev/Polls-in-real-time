import React from "react";
import { ContinueButton } from "../components/ContinueButton";
import { usePollContext } from "../globalProvider";
import { OptionHolder } from "../components/OptionHolder";
import { OptionsList } from "../components/OptionsList";
import { ShuffleButton } from "../components/ShuffleButton";
import styled from "styled-components";

const StyledHeader = styled.h1`
  font-size: 1.5rem;
  width: 70%;
`;

const StyledFooter = styled.div`
  display: flex;
  /* justify-content: space-around; */
`;

export const ConfigPage: React.FC = ({ children }) => {
  let { state } = usePollContext();

  return (
    <div className="">
      <StyledHeader>{state.pollName}</StyledHeader>
      <OptionsList />
      <OptionHolder />
      <StyledFooter>
        {state.pollOptions.length >= 2 && <ShuffleButton />}
        <ContinueButton />
      </StyledFooter>
    </div>
  );
};
