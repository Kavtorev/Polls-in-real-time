import RadioMUI, { RadioProps } from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";

export const Radio = withStyles({
  root: {
    color: "var(--checkbox-radio-color)",
    "&$checked": {
      color: "var(--checkbox-radio-color)",
    },
  },
  checked: {},
})((props: RadioProps) => <RadioMUI color="default" {...props} />);
