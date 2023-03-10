import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TodoAdd = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [todo, setTodo] = useState({});

  const onChangeInput = async (e) => {
    const { name, value } = await e.target;
    setTodo({ ...todo, [name]: value, mode: false });
  };
  console.log(todo);

  const onClickAdd = () => {
    axios
      .post(`${BASE_URL}/todo-add`, todo)
      .then((response) => {
        console.log(response.data);
        // Handle success
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });

    navigate("/planner-main");
  };

  return (
    <>
      <StHeader>
        <div
          id="prev"
          onClick={() => {
            navigate("/planner-main");
          }}
        >
          이전
        </div>
        <div id="title">할일 추가</div>
        <div id="confirm" onClick={onClickAdd}>
          확인
        </div>
        {/* <div id="arrow-left"></div> */}
        {/* <div id="arrow-right"></div> */}
      </StHeader>
      <></>
      <StBody>
        <div id="titleInput">
          할일 제목: <input name="title" onChange={onChangeInput}></input>
        </div>
        <div id="contentInput">
          할일 상세항목:
          <input name="content" onChange={onChangeInput}></input>
        </div>
      </StBody>
    </>
  );
};

export default TodoAdd;

const StHeader = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 2rem;
  font-size: 2.5vh;
  font-weight: bold;
  background-color: white;

  #prev {
    color: gray;
    cursor: pointer;
  }

  #confirm {
    color: #1e90ff;
    cursor: pointer;
  }

  // #arrow-left {
  //   position: relative;
  //   left: 1rem;
  //   width: 2.5vh; /* 사이즈 */
  //   height: 2.5vh; /* 사이즈 */
  //   border-top: 0.7vh solid #000; /* 선 두께 */
  //   border-right: 0.7vh solid #000; /* 선 두께 */
  //   transform: rotate(-135deg); /* 각도 */
  // }

  // #arrow-right {
  //   position: relative;
  //   right: 1rem;
  //   width: 2.5vh; /* 사이즈 */
  //   height: 2.5vh; /* 사이즈 */
  //   border-top: 0.7vh solid #000; /* 선 두께 */
  //   border-right: 0.7vh solid #000; /* 선 두께 */
  //   transform: rotate(45deg); /* 각도 */
  // }
`;

const StBody = styled.div`
  width: 50%;
  margin: auto;
`;
