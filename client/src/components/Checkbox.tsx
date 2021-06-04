import CheckboxMUI, { CheckboxProps } from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

export const Checkbox = withStyles({
  root: {
    color: "rgb(255, 167, 196)",
    width: "50px",
    "&$checked": {
      color: "rgb(255, 167, 196)",
    },
    "& .MuiSvgIcon-root": {
      width: "1.3em",
      height: "1.3em",
    },
  },
  checked: {},
})((props: CheckboxProps) => <CheckboxMUI color="default" {...props} />);
