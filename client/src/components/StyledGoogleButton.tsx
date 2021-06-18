import { withStyles } from "@material-ui/core/styles";
import { StyledButton } from "./StyledButton";

export const StyledGoogleButton = withStyles({
  root: {
    backgroundColor: "transparent",
    color: "var(--active-dark-color)",
    "& img": {
      margin: "0.3em",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
})(StyledButton);
