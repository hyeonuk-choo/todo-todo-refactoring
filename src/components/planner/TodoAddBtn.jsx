import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import whitePlusSvg from "../../assets/img/whitePlusSvg.svg";
import {
  __getImages,
  __postImages,
  __getMyInfo,
} from "../../redux/modules/mySlice";

const TodoAddBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profilePhotoBtn } = useSelector((state) => state.my);
  const nickname = localStorage.getItem("nickname");
  const uploadRef = useRef(null);

  return (
    <StTodoAddBtn
      onClick={() => {
        navigate("/planner-add");
      }}
    >
      <img src={whitePlusSvg} alt="camera" />
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
