import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckboxMUI, { CheckboxProps } from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

const GreenCheckbox = withStyles({
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

interface Props {
  label: string;
  name: string;
  onChange: () => void;
  [x: string]: any;
}

export const Checkbox: React.FC<Props> = ({
  label,
  name,
  onChange,
  ...rest
}) => {
  return (
    <FormControlLabel
      control={<GreenCheckbox name={name} onChange={onChange} {...rest} />}
      label={label}
    />
  );
};
