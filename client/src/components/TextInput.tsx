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
    outline: 0;
    transition: all ease 0.4s;
  }

  &:not(:focus) {
    transition: all ease 0.4s;
  }

  &::placeholder {
    font-style: italic;
  }

  &:not(:placeholder-shown),
  &:focus {
    color: var(--active-dark-color);
    border-bottom-color: var(--active-dark-color);
  }
`;

interface Props {
  placeholder: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const TextInput: React.FC<Props> = ({
  placeholder,
  name,
  onChange,
  value,
}) => {
  return (
    <Input
      placeholder={placeholder}
      name={name}
      type="text"
      required
      value={value}
      onChange={onChange}
    />
  );
};
