import React from "react";
import { usePollContext } from "../globalProvider";
import { CrossIcon } from "../icons/CrossIcon";
import { OptionItem } from "./OptionItem";
import styled from "styled-components";

const StyledOptionsList = styled.div`
  max-height: 400px;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
  /* ::-webkit-scrollbar: display: none;  */
  /* for Chrome, Safari, and Opera */
`;

export const OptionsList: React.FC = () => {
  const { state } = usePollContext();
  return (
    <StyledOptionsList>
      {(state.pollOptions.length || null) &&
        state.pollOptions.map(({ id, text }) => {
          return (
            <OptionItem key={id} text={text}>
              <CrossIcon id={id} />
            </OptionItem>
          );
        })}
    </StyledOptionsList>
  );
};
