import React, { useRef } from "react";
import { usePollContext } from "../globalProvider";
import { OptionHolder } from "../components/OptionHolder";
import { OptionsList } from "../components/OptionsList";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import { validateInitPage } from "./InitPage";
import { ContinueButton } from "../components/ContinueButton";
import { Truncate } from "../components/Truncate";
import { Toolbar } from "../components/Toolbar";
import { StyledButton } from "../components/StyledButton";
import { toast } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
import ShareIcon from "@material-ui/icons/Share";
import { CrossIcon } from "../icons/CrossIcon";

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
  cursor: pointer;
  ${(props) =>
    props.active
      ? "color: var(--primary-button-backgroundColor); border: 2px solid var(--primary-button-backgroundColor);"
      : "color: var(--inactive-dark-color); border: 2px solid var(--inactive-dark-color);"};
  border-radius: 2px;
  transition: all 1s;

  :hover {
    box-shadow: inset 0 0 5px -2px rgba(0, 0, 0, 0.2);
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

const StyledShareButton = styled(StyledLinkButton)``;

export const ConfigPage: React.FC = ({ children }) => {
  let { state } = usePollContext();
  let linkHolderRef = useRef<HTMLDivElement>(null);

  const handleLinkTextClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (state.invitationalLink) {
      navigator.clipboard.writeText(state.invitationalLink).then(
        () => toast("Successfully copied to the clipboard"),
        () => toast("Please copy the link manually")
      );
    }
  };

  return (
    <>
      {validateInitPage(state) ? (
        <Route path="/config">
          <Toolbar />
          <StyledHeader>{state.pollName}</StyledHeader>
          <div className="">
            <OptionsList render={(id) => <CrossIcon id={id} />} />
            <OptionHolder />
            <StyledConfigFooter>
              <StyledLinkHolder
                active={!!state.invitationalLink}
                ref={linkHolderRef}
              >
                <StyledLinkText onClick={handleLinkTextClick}>
                  {state.invitationalLink}
                </StyledLinkText>
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
