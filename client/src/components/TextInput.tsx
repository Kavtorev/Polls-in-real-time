import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 500px;
  height: 55px;
  color: var(--inactive-dark-color);
  border: 0;
  border-bottom: 2px solid var(--inactive-dark-color);
  font-size: 1.75rem;
  margin-bottom: var(--top-bottom-margin);

  &:focus {
    border-bottom-color: var(--active-dark-color);
    color: var(--active-dark-color);
    outline: 0;
    transition: all ease 0.4s;
  }

  &:not(:focus) {
    transition: all ease 0.4s;
  }

  &::placeholder {
    font-style: italic;
  }
`;

interface Props {
  placeholder: string;
  name: string;
}

export const TextInput: React.FC<Props> = ({ placeholder, name }) => {
  return <Input placeholder={placeholder} name={name} type="text" required />;
};
