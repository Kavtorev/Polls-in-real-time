import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import googleIcon from "../assets/free-icon-google-300221(1).svg";
import { StyledGoogleButton } from "./StyledGoogleButton";

export const GoogleSignIn: React.FC = () => {
  const [state, setState] = useState("idle");
  const handleGoogleSingIn = () => {
    setState("pending");
    auth()
      .setPersistence(auth.Auth.Persistence.LOCAL)
      .then(() => {
        return auth()
          .signInWithPopup(googleProvider)
          .then((_) => setState("success"));
      })
      .catch((error) => {
        setState("error");
        // Handle Errors here.
        // var errorMessage = error.message;
      });
  };
  return (
    <StyledGoogleButton
      onClick={handleGoogleSingIn}
      disabled={state === "pending"}
    >
      <img src={googleIcon} alt="google icon" width="16px" height="16px" />
      Sign In
    </StyledGoogleButton>
  );
};
