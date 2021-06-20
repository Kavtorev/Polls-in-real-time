import React from "react";
import styled from "styled-components";
import { usePollContext } from "../globalProvider";
import IconButton from "@material-ui/core/IconButton";
import ShuffleRoundedIcon from "@material-ui/icons/ShuffleRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import { toast } from "react-toastify";
import { shuffle } from "../lib/utils";
import { UndoButton } from "./UndoButton";
import _ from "lodash";

const StyledToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-right: 0.5em;
`;

enum ButtonIds {
  shuffle = "SHUFFLE",
  delete = "DELETE",
}

export const Toolbar: React.FC = () => {
  let { state, dispatch } = usePollContext();

  let handleClicks = (event: React.MouseEvent) => {
    const id = event.currentTarget.id;
    switch (id) {
      case ButtonIds.shuffle:
        dispatch({
          type: "shuffleOptions",
          payload: Object.fromEntries(
            shuffle(Object.entries(_.cloneDeep(state.pollOptions)))
          ),
        });
        break;
      case ButtonIds.delete:
        toast(<UndoButton />, {
          autoClose: 4000,
          onClick: () => {
            dispatch({ type: "setPollOptions", payload: state.pollOptions });
          },
          position: "top-center",
        });
        dispatch({
          type: "removeAllOptions",
        });
        break;
      default:
        throw new Error("Invalid button id: " + id);
    }
  };

  let tooltipsPlacement: TooltipProps["placement"] = "top-start";
  let buttons = [
    {
      title: "Shuffle options",
      id: ButtonIds.shuffle,
      icon: <ShuffleRoundedIcon />,
      disabled: Object.keys(state.pollOptions).length < 2,
    },
    {
      title: "Delete all options",
      id: ButtonIds.delete,
      icon: <DeleteOutlineRoundedIcon />,
      disabled: Object.keys(state.pollOptions).length < 1,
    },
  ];

  return (
    <StyledToolbar>
      {buttons.map(({ id, title, icon, disabled }) => (
        <Tooltip title={title} key={id} placement={tooltipsPlacement} arrow>
          <div className="">
            <IconButton onClick={handleClicks} disabled={disabled} id={id}>
              {icon}
            </IconButton>
          </div>
        </Tooltip>
      ))}
    </StyledToolbar>
  );
};
