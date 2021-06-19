import React from "react";
import {
  usePollContext,
  OptionType,
  InitialStateType,
} from "../globalProvider";
import { OptionItem } from "./OptionItem";
import styled from "styled-components";

const StyledOptionsList = styled.div`
  max-height: 400px;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
  margin-top: var(--top-bottom-margin);
  /* ::-webkit-scrollbar: display: none;  */
  /* for Chrome, Safari, and Opera */
`;

export const OptionsList: React.FC<{
  render: (
    id: OptionType["id"],
    selected: OptionType["selected"]
  ) => React.ReactElement;
  options: InitialStateType["pollOptions"] | undefined;
}> = ({ render, options = [] }) => {
  return (
    <StyledOptionsList>
      {(Object.keys(options).length || null) &&
        Object.entries(options).map(([id, { text, selected }]) => {
          return (
            <OptionItem key={id} text={text}>
              {render(id, selected)}
            </OptionItem>
          );
        })}
    </StyledOptionsList>
  );
};
