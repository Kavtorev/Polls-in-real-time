import React from "react";
import { auth } from "../firebase";
import googleIcon from "../assets/free-icon-google-300221(1).svg";
import { StyledGoogleButton } from "./StyledGoogleButton";
import { usePollContext } from "../globalProvider";

export const GoogleSignOut: React.FC = () => {
  const { dispatch } = usePollContext();
  const handleGoogleLogOut = () => {
    auth()
      .signOut()
      .then(() => dispatch({ type: "signOut" }))
      .catch((err) => {
        console.log("error happened:", err);
      });
  };
  return (
    <StyledGoogleButton onClick={handleGoogleLogOut}>
      <img src={googleIcon} alt="google icon" width="16px" height="16px" />
      Sign out
    </StyledGoogleButton>
  );
};
