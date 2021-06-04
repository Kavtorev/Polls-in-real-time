import styled from "styled-components";

export const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  cursor: pointer;

  :hover {
    background-color: var(--primary-button-backgroundColor);
    border-radius: 2px;
    path {
      fill: white;
    }
  }
`;
