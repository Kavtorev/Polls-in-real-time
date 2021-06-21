import React from "react";
import { OptionsList } from "../components/OptionsList";
import { InitialStateType } from "../globalProvider";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import { getInitials } from "../lib/utils";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import styled from "styled-components";

const StyledLabel = styled.span`
  display: flex;
  font-size: 1rem;
  /* color: var(--inactive-dark-color); */
`;

export const PollView: React.FC<{
  pollOptions: any;
  meta: any;
}> = ({ pollOptions, meta }) => {
  // sorts options in descending order
  const sortPollOptions = (pollOptions: InitialStateType["pollOptions"]) => {
    let sorted = Object.entries(pollOptions).sort((a: any, b: any) => {
      return Object.keys(b[1].votes).length - Object.keys(a[1].votes).length;
    });
    return Object.fromEntries(sorted);
  };

  return (
    <OptionsList
      options={sortPollOptions(pollOptions)}
      render={(id) => (
        <>
          {!meta.anonymousVoting ? (
            <AvatarGroup max={4}>
              {Object.keys(pollOptions[id].votes).map((voteID) => {
                let vote = pollOptions[id].votes[voteID];
                return (
                  <Avatar
                    key={id + voteID}
                    alt={getInitials(vote.username)}
                    src={vote.photoURL}
                  />
                );
              })}
            </AvatarGroup>
          ) : (
            <StyledLabel>
              {Object.keys(pollOptions[id].votes).length ? (
                <>
                  {Object.keys(pollOptions[id].votes).length}
                  <CheckRoundedIcon />
                </>
              ) : null}
            </StyledLabel>
          )}
        </>
      )}
    />
  );
};
