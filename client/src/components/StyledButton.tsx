import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

export const StyledButton = withStyles({
  root: {
    display: "flex",
    marginLeft: "auto",
    width: "147px",
    height: "35px",
    borderRadius: "2px",
    marginTop: "var(--top-bottom-margin)",
    fontWeight: 600,
    backgroundColor: "var(--primary-button-backgroundColor)",
    color: "var(--primary-button-color)",
    textTransform: "none",
    "&:hover": {
      boxShadow: "0 0 35px -2px rgba(0, 0, 0, 0.2)",
      backgroundColor: "var(--primary-button-backgroundColor)",
    },

    "&:not(:hover), :hover": {
      transition: "ease-in-out all 0.4s",
    },
  },
})(Button);
