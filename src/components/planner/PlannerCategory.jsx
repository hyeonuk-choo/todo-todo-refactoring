import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import categorySvg from "../../assets/img/categorySvg.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __getCategory,
  __getTodayTodo,
} from "../../redux/modules/plannerSlice";
import Navbar from "../utils/Navbar";

const PlannerCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate("/planner/category/todolist");
  };

  useEffect(() => {
    const arr = [];
    const arrRate = [];

    // length를 구해놓고 for문을 돌리면 성능이 빨라짐 -> 코드 수정하기
    if (todos.length > 0) {
      for (let i = 0; i < category.length; i++) {
        const data = todos.filter(
          (data) => data.category === category[i].title
        );
        arr.push(data);
      }
    }

    if (arr.length > 0) {
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
    let nickname = localStorage.getItem("nickname");
    dispatch(__getCategory(nickname));
    dispatch(__getTodayTodo(nickname));
  }, [dispatch]);

  return (
    <>
      <StDiv>
        <div className="header">
          <div className="categoryBox">
            <img
              className="category"
              src={categorySvg}
              alt="categoryIcon"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* --------- 투두 바디부분 시작 ----------*/}
        <StCategoryContainer>
          {category.length > 0 &&
            category.map((data, index) => (
              <StCategoryItem key={data.id} id={data.id} name={data.title}>
                <div
                  className="top"
                  onClick={onClickSelectCategoryToTodoListHandler}
                >
                  <p className="title" onClick={(e) => e.stopPropagation()}>
                    {data.title}
                  </p>
                  <p onClick={(e) => e.stopPropagation()}>
                    {categoryTodoList.length === 0
                      ? 0
                      : categoryTodoList[index].filter(
                          (data) => data.complete === true
                        ).length}
                    /
                    {categoryTodoList.length === 0
                      ? 0
                      : categoryTodoList[index].length}
                  </p>
                </div>
                <StProgressBarBox onClick={(e) => e.stopPropagation()}>
                  <StProgressBar
                    width={
                      categoryTodoComplete[index] === "NaN"
                        ? 0
                        : categoryTodoComplete[index]
                    }
                  ></StProgressBar>
                </StProgressBarBox>
              </StCategoryItem>
            ))}
        </StCategoryContainer>
        {/* --------- 투두 바디부분 끝 ----------*/}

        {/* --------- 네비게이션바 ----------*/}
        <Navbar planner={true} />
      </StDiv>
    </>
  );
};

const StDiv = styled.div`
  background-color: #fafafa;
  overflow: hidden auto;
  font-family: "SUIT-Regular", sans-serif;
  // -ms-overflow-style: none;
  // &::-webkit-scrollbar {
  // }

  & .header {
    box-sizing: border-box;
    width: 100%;
    height: 10vh;
    display: flex;
    background-color: #ffffff;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #f1f3f5;

    .categoryBox {
      cursor: pointer;
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
  box-sizing: border-box;
  height: 80vh;
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
    font-weight: 600;
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

export default PlannerCategory;
