import React, { useState } from "react";
import styled from "styled-components";
import Planner from "../components/planner/Planner";
import whitePlusSvg from "../assets/img/whitePlusSvg.svg";

const TodolistPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const onClickAddTodoModalHandler = () => {
    setModalVisible(true);
  };

  return (
    <StContainer>
      <Planner modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <StNavBox>
        <StPlusBtnBox onClick={onClickAddTodoModalHandler}>
          <img src={whitePlusSvg} alt='plusBtnIcon' />
        </StPlusBtnBox>
      </StNavBox>
    </StContainer>
  );
};

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden auto;
  justify-content: space-between;
  background-color: #fafafa;
  justify-content: center;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  /* box-sizing:border-box; */
  /* overflow:hidden; */

  @media screen and (min-width: 768px) {
    width: 600px;
  }
`;

const StNavBox = styled.div`
  /* z-index: 10;
  width: 100%;
  min-width: 360px;
  height: 71px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ddd;
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center; */

  position: absolute;
  bottom: 5.5rem;
  right: 24px;
  z-index: 4;

  width: 55px;
  height: 55px;
  background-color: #ff8f27;
  border-radius: 50%;
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
`;

const StPlusBtnBox = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: #ff8f27;
  /* position: absolute; */
  /* bottom: 100px; */
  /* right: 26px; */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export default TodolistPage;
