import React from "react";
import { usePollContext } from "../globalProvider";
import { OptionHolder } from "../components/OptionHolder";
import { OptionsList } from "../components/OptionsList";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import { validateInitPage } from "./InitPage";
import { ContinueButton } from "../components/ContinueButton";
import { Truncate } from "../components/Truncate";
import { Toolbar } from "../components/Toolbar";

const StyledHeader = styled.h1`
  font-size: 1.6rem;
  margin-left: auto;
  border-top: 2px solid var(--primary-button-backgroundColor);
  border-radius: 4px;
  margin-bottom: var(--top-bottom-margin);
  ${Truncate}
`;

export const ConfigPage: React.FC = ({ children }) => {
  let { state } = usePollContext();
  return (
    <>
      {validateInitPage(state) ? (
        <Route path="/config">
          <Toolbar />
          <StyledHeader>{state.pollName}</StyledHeader>
          <div className="">
            <OptionsList />
            <OptionHolder />
            <ContinueButton />
          </div>
        </Route>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
