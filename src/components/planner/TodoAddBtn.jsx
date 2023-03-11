import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import whitePlusSvg from "../../assets/img/whitePlusSvg.svg";
import axios from "axios";

const TodoAddBtn = ({ todos, onClickAdd }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profilePhotoBtn } = useSelector((state) => state.my);
  const nickname = localStorage.getItem("nickname");
  const uploadRef = useRef(null);

  return (
    <StTodoAddBtn
      onClick={() => {
        onClickAdd();
        // navigate("/planner-add");
        // console.log(todos);
      }}
    >
      <img src={whitePlusSvg} alt="whitePlusSvg" />
    </StTodoAddBtn>
  );
};

const StTodoAddBtn = styled.div`
  position: absolute;
  bottom: 12vh;
  right: 2vh;
  z-index: 1;
  width: 8vh;
  height: 8vh;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border-radius: 50%;
  background-color: #ff8f27;

  input {
    display: none;
  }

  img {
    height: 4vh;
    width: 4vh;
  }
`;

export default TodoAddBtn;
