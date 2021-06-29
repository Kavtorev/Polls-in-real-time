import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

export const StyledAvatar = withStyles({
  root: {
    width: 35,
    height: 35,
  },
})(Avatar);
