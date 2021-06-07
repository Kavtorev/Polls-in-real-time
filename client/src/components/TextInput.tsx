import styled from "styled-components";

export const StyledTextInput = styled.input`
  width: 100%;
  height: 55px;
  color: var(--inactive-dark-color);
  border: 0;
  border-bottom: 2px solid var(--inactive-dark-color);
  font-size: 1.5rem;
  margin-bottom: var(--top-bottom-margin);

  :focus {
    outline: 0;
    transition: all ease 0.4s;
  }

  :not(:focus) {
    transition: all ease 0.4s;
  }

  ::placeholder {
    font-style: italic;
  }

  :not(:placeholder-shown),
  :focus {
    color: var(--active-dark-color);
    border-bottom-color: var(--active-dark-color);
  }

  :disabled {
    background-color: transparent;
  }
`;
