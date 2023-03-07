import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import categorySvg from "../../assets/img/categorySvg.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../utils/Navbar";
import TodoAddBtn from "./TodoAddBtn";

const PlannerCategory = () => {
  return (
    <>
      <StDiv>
        {/* ------------ 투두 헤더 -------------*/}
        <div className="header">
          <div className="categoryBox">
            <StDateInput
              type="date"
              min={1}
              max="2030-12-31"
              name="selectedDate"
              onChange={(e) => {}}
            ></StDateInput>
          </div>
          <img
            className="category"
            src={categorySvg}
            alt="categoryIcon"
            onClick={() => {}}
          />
        </div>

        {/* -------- 투두 바디부분 시작 ---------*/}
        <StCategoryContainer></StCategoryContainer>
        {/* --------- 투두 바디부분 끝 ----------*/}

        {/* --------- 네비게이션바 ----------*/}
        <Navbar planner={true} />
        {/* --------- 투두 추가 고정버튼 ----------*/}
        <TodoAddBtn />
      </StDiv>
    </>
  );
};

const StDiv = styled.div`
  background-color: #fafafa;
  overflow: hidden auto;

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
      align-items: center;
      justify-content: center;

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

const StDateInput = styled.input`
  background-color: #ffffff;
  border: none;
  focus: none;
  width: 20vh;
  box-sizing: border-box;
  font-size: 2.5vh;
`;

export default PlannerCategory;
