import styled from "styled-components";

export const Button = styled.button`
  display: block;
  width: 147px;
  height: 35px;
  border-radius: 2px;
  outline: none;
  border: 0;
  cursor: pointer;
  font-weight: 600;

  :hover {
    box-shadow: 0 0 35px -2px rgba(0, 0, 0, 0.2);
  }

  :not(:hover),
  :hover {
    transition: ease-in-out all 0.4s;
  }
`;
