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
import { Button as StyledButton } from "../components/StyledButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Tooltip from "@material-ui/core/Tooltip";
import ShareIcon from "@material-ui/icons/Share";

const StyledHeader = styled.h1`
  font-size: 1.6rem;
  margin-left: auto;
  border-top: 2px solid var(--primary-button-backgroundColor);
  border-radius: 4px;
  margin-bottom: var(--top-bottom-margin);
  ${Truncate}
`;

const StyledConfigFooter = styled.div`
  margin-top: calc(var(--top-bottom-margin) * 2);
`;

interface StyledCopyButtonProps {
  active: boolean;
}

const StyledLinkHolder = styled.div<StyledCopyButtonProps>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  border: 2px solid var(--primary-button-backgroundColor);
  margin-bottom: var(--top-bottom-margin);
  margin-right: 0.3em;
  ${(props) =>
    props.active
      ? "color: var(--primary-button-color); border: 2px solid var(--primary-button-backgroundColor);"
      : "color: var(--inactive-dark-color); border: 2px solid var(--inactive-dark-color);"};
  border-radius: 2px;
  transition: all 1s;

  :hover {
    box-shadow: inset 0 0 6px -2px rgba(0, 0, 0, 0.2);
  }
`;

const StyledLinkText = styled.div`
  width: 99%;
  padding-left: 0.5em;
  font-size: 0.95rem;
  align-self: center;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: scroll;
  white-space: nowrap;
`;

const StyledLinkButton = styled(StyledButton)`
  background-color: transparent;
  color: currentColor;
  width: 40px;
  height: inherit;
  :hover {
    box-shadow: none;
  }
`;

const StyledCopyButton = styled(StyledLinkButton)``;

const StyledShareButton = styled(StyledLinkButton)``;

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
            <StyledConfigFooter>
              <StyledLinkHolder active={false}>
                <StyledLinkText>
                  http://localhost:3000/2@^#2g3qc2@^#2g3qc2@^#2g3qc
                </StyledLinkText>
                <Tooltip title="Copy the link">
                  <StyledCopyButton>
                    <FileCopyIcon />
                  </StyledCopyButton>
                </Tooltip>
                <Tooltip title="Share the link">
                  <StyledShareButton>
                    <ShareIcon />
                  </StyledShareButton>
                </Tooltip>
              </StyledLinkHolder>
              <ContinueButton />
            </StyledConfigFooter>
          </div>
        </Route>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
