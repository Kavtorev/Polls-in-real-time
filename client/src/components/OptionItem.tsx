import React from "react";
import styled from "styled-components";

const StyledOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  border-bottom: 1px solid var(--inactive-dark-color);
  padding: var(--top-bottom-padding) 0;
`;

export const OptionItem: React.FC<{
  text: string;
  children: React.ReactElement;
}> = ({ text, children }) => {
  return (
    <StyledOption>
      {text}
      {children}
    </StyledOption>
  );
};
