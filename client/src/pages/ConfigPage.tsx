import React from "react";
import { usePollContext, InitialStateType } from "../globalProvider";
import { OptionHolder } from "../components/OptionHolder";
import { OptionsList } from "../components/OptionsList";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { validateInitPage } from "./InitPage";
import { ContinueButton } from "../components/ContinueButton";
import { Truncate } from "../components/Truncate";
import { Toolbar } from "../components/Toolbar";
import { toast } from "react-toastify";
import { CrossIcon } from "../icons/CrossIcon";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { HOST } from "../config";

const StyledHeader = styled.h1`
  font-size: 1.6rem;
  margin-left: auto;
  border-top: 2px solid var(--primary-button-backgroundColor);
  border-radius: 4px;
  ${Truncate}
`;

export const validateConfigPage = (state: InitialStateType) =>
  Object.keys(state.pollOptions).length > 1;

export const ConfigPage: React.FC = () => {
  let { state, dispatch } = usePollContext();
  let history = useHistory();

  //TODO send a request to generate a unique hash...
  const handleClick = () => {
    if (validateConfigPage(state)) {
      let { userID, pollName, multipleAnswers, anonymousVoting, pollOptions } =
        state;

      axios
        .post("/get_link", {
          userID,
          pollName,
          pollOptions,
          multipleAnswers,
          anonymousVoting,
        })
        .then(
          ({ data: { sessionID } }) => {
            dispatch({
              type: "setSessionID",
              payload: sessionID,
            });
            history.push(`/poll/${sessionID}`);
          },
          ({
            response: {
              data: { message, extra },
            },
          }) => {
            let linksToPolls = [<></>];
            if (extra && Array.isArray(extra)) {
              linksToPolls = extra.map((e, idx) => (
                <>
                  <a href={`${HOST}/poll/${e}`}>Poll №{idx}</a>
                  <br />
                </>
              ));
            }
            toast(
              <>
                {message}
                <br />
                {linksToPolls}
              </>
            );
          }
        );
    } else {
      toast("Please provide more than one option...");
    }
  };

  if (!validateInitPage(state)) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Toolbar />
      <StyledHeader>{state.pollName}</StyledHeader>
      <OptionsList
        render={(id) => <CrossIcon id={id} />}
        options={state.pollOptions}
      />
      <OptionHolder />
      <ContinueButton
        onClick={handleClick}
        disabled={!validateConfigPage(state)}
      />
    </>
  );
};
