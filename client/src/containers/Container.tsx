import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1024px;
  height: 100vh;
  margin: 0 auto;

  .fade-enter {
    opacity: 0.01;
    margin-top: 30em;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in, margin 300ms ease-in;
    margin-top: 0;
  }
`;

export const Container: React.FC = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};
