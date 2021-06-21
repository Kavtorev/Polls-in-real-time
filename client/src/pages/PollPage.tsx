import React from "react";
import { usePollContext } from "../globalProvider";
import { GoogleSignIn } from "../components/GoogleSignIn";
import { Poll } from "../components/Poll";

export const PollPage: React.FC = () => {
  let { state } = usePollContext();

  if (!state.isSignedIn) {
    return (
      <>
        <h1>Please Sign In</h1>
        <GoogleSignIn />
      </>
    );
  }

  return <Poll />;
};
