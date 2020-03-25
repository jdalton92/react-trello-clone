import styled from "styled-components";

export const StyledPointer = styled.button`
  margin: 5px 0px 5px 0px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-around;
  width: 15px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1;
  &:hover div {
    background: #e2e2e2;
  }
  div {
    z-index: 1;
    width: 22px;
    height: 2px;
    background: black;
    transition: all 0.3s linear;
    position: relative;
    :first-child {
      transform-origin: bottom center;
      transform: ${({ shrink }) =>
        shrink ? "rotate(45deg)" : "rotate(-45deg)"};
    }
    :nth-child(2) {
      transform-origin: top center;
      transform: ${({ shrink }) =>
        shrink ? "rotate(-45deg)" : "rotate(45deg)"};
    }
  }
`;
