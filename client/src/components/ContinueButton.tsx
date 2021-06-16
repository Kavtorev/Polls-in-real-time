import React from "react";
import { StyledButton } from "./StyledButton";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

export const ContinueButton: React.FC = () => {
  return (
    <StyledButton endIcon={<ArrowForwardIosRoundedIcon />} type="submit">
      Continue
    </StyledButton>
  );
};
