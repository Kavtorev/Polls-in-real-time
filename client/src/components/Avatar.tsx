import React from "react";
import styled from "styled-components";

const StyledAvatar = styled.div`
  display: grid;
  place-items: center;
  width: 78px;
  height: 78px;
  border: 3px solid black;
  border-radius: 50%;
`;

const StyledAvatarInitials = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.6rem;
`;

export const Avatar: React.FC<{ initials: string }> = ({ initials }) => {
  return (
    <StyledAvatar>
      <StyledAvatarInitials>{initials}</StyledAvatarInitials>
    </StyledAvatar>
  );
};
