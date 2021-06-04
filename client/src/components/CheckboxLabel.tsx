import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface Props {
  label: string;
  children: React.ReactElement;
}

export const CheckboxLabel: React.FC<Props> = ({ label, children }) => {
  return <FormControlLabel control={children} label={label} />;
};
