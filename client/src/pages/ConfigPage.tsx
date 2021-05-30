import React from "react";
import { TextInput } from "../components/TextInput";
import { ContinueButton } from "../components/ContinueButton";

export const ConfigPage: React.FC = () => {
  return (
    <div className="pageWrapper">
      <TextInput placeholder="Ask a question..." name="question" />
      <ContinueButton />
    </div>
  );
};
