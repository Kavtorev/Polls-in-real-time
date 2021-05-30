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
  /* background-color: grey; */
`;

export const Container: React.FC = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};
