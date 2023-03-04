import React from "react";
import Main from "../components/main/Main";
import Navbar from "../components/utils/Navbar";
import styled from "styled-components";

const MainPage = () => {
  return (
    <StContainer>
      <Main />
    </StContainer>
  );
};

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fafafa;
  box-sizing: border-box;

  @media screen and (min-width: 768px) {
    width: 600px;
  }
`;

export default MainPage;
