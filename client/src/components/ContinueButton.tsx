import React from "react";
import { StyledButton } from "./StyledButton";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

export const ContinueButton: React.FC<{
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}> = ({ onClick = () => null, disabled = false }) => {
  return (
    <StyledButton
      endIcon={<ArrowForwardIosRoundedIcon />}
      type="submit"
      disabled={disabled}
      onClick={onClick}
      alignRight={true}
    >
      Continue
    </StyledButton>
  );
};
