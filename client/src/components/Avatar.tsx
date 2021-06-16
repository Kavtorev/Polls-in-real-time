import React from "react";
import styled from "styled-components";

const StyledAvatar = styled.div`
  display: grid;
  place-items: center;
  width: 65px;
  height: 65px;
  border: 3px solid var(--active-dark-color);
  border-radius: 50%;
`;

const StyledAvatarInitials = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.4rem;
`;

export const Avatar: React.FC<{ initials: string }> = ({ initials }) => {
  return (
    <StyledAvatar>
      <StyledAvatarInitials>{initials}</StyledAvatarInitials>
    </StyledAvatar>
  );
};
