import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import categorySvg from "../../assets/img/categorySvg.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  __getCategory,
  __getTodayTodo,
} from "../../redux/modules/plannerSlice";
import dayjs from "dayjs";
import OtherPageCalender from "./OtherPageCalender";
import toggleSvg from "../../assets/img/toggleSvg.svg";
import OtherProfilePlannerDate from "./OtherProfilePlannerDate";
import doneSvg from "../../assets/img/doneSvg.svg";
import notDoneSvg from "../../assets/img/notDoneSvg.svg";
import { useRef } from "react";
import { useParams } from "react-router-dom";

const OtherProfilePlanner = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [selectDate, setSelectDate] = useState(null);
  const [firstCheck, setFirstCheck] = useState(true);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const [calenderdate, setCalenderdate] = useState(
    dayjs(Date.now()).format("YYYY-MM-DD")
  );
  const [categoryTodoList, setCategoryTodoList] = useState([]);
  const [categoryTodoComplete, setCategoryTodoComplete] = useState([]);

  const { category, todos, dateTodo, date } = useSelector(
    (state) => state.planner
  );

  const onClickSelectCategoryToTodoListHandler = (e) => {
    const { innerText } = e.target.children[0];
    const { id } = e.target.parentElement;
    localStorage.setItem("category", innerText);
    localStorage.setItem("categoryId", id);
    // navigate("/planner/category/todolist");
  };

  const onClickShowTodoHandler = (e) => {
    if (e.currentTarget.childNodes[2].style.display === "block") {
      e.currentTarget.childNodes[1].childNodes[1].style.transform =
        "rotate(0deg)";
      e.currentTarget.childNodes[2].style.display = "none";
    } else {
      e.currentTarget.childNodes[1].childNodes[1].style.transform =
        "rotate(-180deg)";
      e.currentTarget.childNodes[2].style.display = "block";
    }
  };

  useEffect(() => {
    const arr = [];
    const arrRate = [];

    // length를 구해놓고 for문을 돌리면 성능이 빨라짐 -> 코드 수정하기
    if (todos !== "") {
      for (let i = 0; i < category.length; i++) {
        const data = todos.filter(
          (data) => data.category === category[i].title
        );
        arr.push(data);
      }

      for (let i = 0; i < arr.length; i++) {
        const rate = (
          (arr[i].filter((data) => data.complete === true).length /
            arr[i].length) *
          100
        ).toFixed();
        arrRate.push(rate);
      }
    }
    setCategoryTodoComplete(arrRate);
    setCategoryTodoList(arr);
  }, [category, todos]);

  useEffect(() => {
    dispatch(__getCategory(params.id));
    dispatch(__getTodayTodo(params.id));
  }, []);

  return (
    <>
      <StDiv>
        <div className='header'>
          <OtherPageCalender
            calenderdate={calenderdate}
            setCalenderdate={setCalenderdate}
            setFirstCheck={setFirstCheck}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
          />
        </div>

        {firstCheck ? (
          <StCategoryContainer>
            {category.length > 0 &&
              category.map((data, index) => (
                <StCategoryItem
                  key={data.id}
                  id={data.id}
                  name={data.title}
                  onClick={onClickShowTodoHandler}
                >
                  <div
                    className='top'
                    onClick={onClickSelectCategoryToTodoListHandler}
                  >
                    <p className='title'>{data.title}</p>

                    <p onClick={(e) => e.stopPropagation()}>
                      {categoryTodoList[index] === undefined
                        ? 0
                        : categoryTodoList[index].filter(
                            (data) => data.complete === true
                          ).length}
                      /
                      {categoryTodoList[index] === undefined
                        ? 0
                        : categoryTodoList[index].length}
                    </p>
                  </div>

                  <StToggleBox>
                    <StProgressBarBox onClick={(e) => e.stopPropagation()}>
                      <StProgressBar
                        width={
                          categoryTodoComplete[index] === "NaN"
                            ? 0
                            : categoryTodoComplete[index]
                        }
                      ></StProgressBar>
                    </StProgressBarBox>
                    <StToggleImgBox>
                      <img src={toggleSvg} alt='toggleIcon' />
                    </StToggleImgBox>
                  </StToggleBox>

                  <StTodoToggleBox>
                    <StTodoContainer>
                      {categoryTodoList[index] === undefined
                        ? null
                        : categoryTodoList[index]
                            .filter((data) => data.complete === false)
                            .map((data) => (
                              <StTodoItem key={data.todoId} name={data.title}>
                                <div className='top' id={data.todoId}>
                                  <div
                                    className='content'
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img src={notDoneSvg} alt='notDoneIcon' />
                                    <StTodoTitle className='title'>
                                      {data.content}
                                    </StTodoTitle>
                                  </div>
                                </div>
                              </StTodoItem>
                            ))}
                    </StTodoContainer>

                    <StTodoContainer>
                      {categoryTodoList[index] === undefined
                        ? null
                        : categoryTodoList[index]
                            .filter((data) => data.complete === true)
                            .map((data) => (
                              <StTodoItem key={data.todoId} name={data.title}>
                                <div className='top' id={data.todoId}>
                                  <div
                                    className='content'
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img src={doneSvg} alt='doneIcon' />
                                    <StTodoTitle
                                      className='title'
                                      color='#E8E8E8'
                                    >
                                      {data.content}
                                    </StTodoTitle>
                                  </div>
                                </div>
                              </StTodoItem>
                            ))}
                    </StTodoContainer>
                  </StTodoToggleBox>
                </StCategoryItem>
              ))}
          </StCategoryContainer>
        ) : (
          <OtherProfilePlannerDate />
        )}
      </StDiv>
      {/* <Planner x={x} setX={setX} /> */}
    </>
  );
};

const StDiv = styled.div`
  background-color: #fafafa;
  height: auto;
  min-height: 50vh;
  font-family: "SUIT-Regular", sans-serif;

  & div {
    box-sizing: border-box;
  }

  & div.header {
    /* width: 100%; */
    height: 80px;
    display: flex;
    background-color: #ffffff;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1rem;
    border-bottom: 1px solid #f1f3f5;

    .categoryBox {
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      img.category {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

const StCategoryContainer = styled.div`
  padding: 20px;
`;

const StCategoryItem = styled.div`
  width: 100%;
  height: auto;
  border-radius: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: 16px;
  padding: 15px 20px;
  -webkit-box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);

  & .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    p {
      margin: 0;
    }
  }
`;

const StProgressBarBox = styled.div`
  width: 100%;
  height: 13px;
  border-radius: 10px;
  background-color: #ececec;
`;

const StProgressBar = styled.div`
  ${({ width }) => {
    if (width < 33) {
      return css`
        width: ${width}%;
        background-color: #d34c4c;
      `;
    } else if (width < 66) {
      return css`
        width: ${width}%;
        background-color: #ffdb80;
      `;
    } else if (width <= 100) {
      return css`
        width: ${width}%;
        background-color: #74e272;
      `;
    }
  }};
  height: 13px;
  border-radius: 10px;
`;

const StToggleBox = styled.div`
  display: flex;
  align-items: center;
`;

const StToggleImgBox = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  transition: all 0.3s;
`;

const StTodoToggleBox = styled.div`
  display: none;
`;

const StTodoContainer = styled.div`
  width: 100%;
  &:first-child {
    margin-bottom: 16px;
  }
`;

const StTodoItem = styled.div`
  width: 100%;
  height: 52px;
  border-radius: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  & .top {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;

    div.content {
      width: 90%;
    }

    div.option {
      width: 10%;
    }
  }
`;

const StTodoTitle = styled.p`
  padding-left: 10px;
  margin: 0;
  color: ${(props) => props.color || "#111"};
`;

export default OtherProfilePlanner;
