import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TodoAdd = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stdiv>
        <div
          id="prev"
          onClick={() => {
            navigate("/planner-main");
          }}
        >
          이전
        </div>
        <div id="title">할일 추가</div>
        <div id="confirm">확인</div>
        {/* <div id="arrow-left"></div> */}
        {/* <div id="arrow-right"></div> */}
      </Stdiv>
    </>
  );
};

export default TodoAdd;

const Stdiv = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 2rem;
  font-size: 2.5vh;

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
