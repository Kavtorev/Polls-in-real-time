import React from "react";
import styled from "styled-components";
import { usePollContext } from "../globalProvider";
import { StyledIconWrapper } from "./StyledIconWrapper";

const StyledCrossIconWrapper = styled(StyledIconWrapper)``;
const StyledCrossIcon = styled.svg``;

export const CrossIcon: React.FC<{ id: string }> = ({ id }) => {
  let { dispatch } = usePollContext();
  let handleOnClick = (event: React.MouseEvent<HTMLDivElement>) =>
    dispatch({ type: "removeOption", payload: id });

  return (
    <StyledCrossIconWrapper onClick={handleOnClick}>
      <StyledCrossIcon
        width="13"
        height="12"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0239 8.51667L17.6753 1.89701C18.1082 1.46643 18.1082 0.770241 17.6753 0.33966C17.2427 -0.0909217 16.5431 -0.0909217 16.1105 0.33966L9.45887 6.95932L2.80748 0.33966C2.37462 -0.0909217 1.67527 -0.0909217 1.24261 0.33966C0.809753 0.770241 0.809753 1.46643 1.24261 1.89701L7.894 8.51667L1.24261 15.1363C0.809753 15.5669 0.809753 16.2631 1.24261 16.6937C1.45823 16.9085 1.74174 17.0164 2.02505 17.0164C2.30835 17.0164 2.59166 16.9085 2.80748 16.6937L9.45887 10.074L16.1105 16.6937C16.3263 16.9085 16.6096 17.0164 16.8929 17.0164C17.1762 17.0164 17.4595 16.9085 17.6753 16.6937C18.1082 16.2631 18.1082 15.5669 17.6753 15.1363L11.0239 8.51667Z"
          fill="#525151"
        />
      </StyledCrossIcon>
    </StyledCrossIconWrapper>
  );
};
