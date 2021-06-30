import React from "react";
import styled from "styled-components";
import { usePollContext } from "../globalProvider";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { SocialMediaShareButton } from "./SocialMediaShareButton";
import { HOST } from "../config";

const StyledLinkHolderContainer = styled.div`
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

export const LinkHolder: React.FC = () => {
  let { state } = usePollContext();
  let voteURL = `${HOST}/poll/${state.sessionID}`;

  const handleLinkTextClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (state.sessionID) {
      navigator.clipboard.writeText(voteURL).then(
        () => toast("Successfully copied to the clipboard"),
        () => toast("Please copy the link manually")
      );
    }
  };
  return (
    <StyledLinkHolderContainer>
      <StyledLinkHolder active={!!voteURL}>
        <StyledLinkText onClick={handleLinkTextClick}>{voteURL}</StyledLinkText>
        <Tooltip title="Share the link">
          <SocialMediaShareButton />
        </Tooltip>
      </StyledLinkHolder>
    </StyledLinkHolderContainer>
  );
};
