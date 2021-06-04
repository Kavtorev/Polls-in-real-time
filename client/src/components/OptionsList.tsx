import React from "react";
import { usePollContext } from "../globalProvider";
import { CrossIcon } from "../icons/CrossIcon";
import { OptionItem } from "./OptionItem";

export const OptionsList: React.FC = () => {
  const { state } = usePollContext();
  return (
    <>
      {(state.pollOptions.length || null) &&
        state.pollOptions.map(({ id, text }) => {
          return (
            <OptionItem key={id} text={text}>
              <CrossIcon id={id} />
            </OptionItem>
          );
        })}
    </>
  );
};
