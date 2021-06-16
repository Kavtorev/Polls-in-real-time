import CheckboxMUI, { CheckboxProps } from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

export const Checkbox = withStyles({
  root: {
    color: "var(--checkbox-radio-color)",
    width: "50px",
    "&$checked": {
      color: "var(--checkbox-radio-color)",
    },
    "& .MuiSvgIcon-root": {
      width: "1.3em",
      height: "1.3em",
    },
  },
  checked: {},
})((props: CheckboxProps) => <CheckboxMUI color="default" {...props} />);
