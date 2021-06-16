import React from "react";
import styled from "styled-components";
import { Truncate } from "./Truncate";
import Tooltip from "@material-ui/core/Tooltip";

const StyledOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  border-bottom: 1px solid var(--inactive-dark-color);
  padding: calc(var(--top-bottom-padding) * 1.5) 0;
  ${Truncate}
`;

const StyledText = styled.span`
  width: 90%;
  ${Truncate}
`;

export const OptionItem: React.FC<{
  text: string;
  children: React.ReactElement;
}> = ({ text, children }) => {
  return (
    <StyledOption>
      <Tooltip title={text} placement="right-start" arrow>
        <StyledText>{text}</StyledText>
      </Tooltip>
      {children}
    </StyledOption>
  );
};
