import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import PlannerCalender from "./PlannerCalender";
import categorySvg from "../../assets/img/categorySvg.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getTodo } from "../../redux/modules/plannerSlice";
import Navbar from "../utils/Navbar";
import dayjs from "dayjs";
import PlannerDate from "./PlannerDate";

const PlannerCategoryDate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectDate, setSelectDate] = useState(null);

  const { dateTodo, date } = useSelector((state) => state.planner);

  const [calenderdate, setCalenderdate] = useState(null);
  const [dateTodoObj, setDateTodoObj] = useState({});
  const [categoryTodoList, setCategoryTodoList] = useState([]);
  const [categoryTodoComplete, setCategoryTodoComplete] = useState({});
  const [display, setDisplay] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const onClickAddCategoryHandler = () => {
    navigate("/planner/category");
  };

  const onClickSelectCategoryToTodoListHandler = (e) => {
    const { title } = e.currentTarget;
    setSelectedCategoryName(title);
    setDisplay(true);
  };

  useEffect(() => {
    const obj = {};
    let arr = [];
    const arrComplete = {};
    if (dateTodo !== "") {
      const completeTodo = dateTodo.filter((data) => data["complete"] === true);

      for (let i = 0; i < dateTodo.length; i++) {
        obj[`${dateTodo[i].category}`] =
          (obj[`${dateTodo[i].category}`] || 0) + 1;
      }

      for (let i = 0; i < completeTodo.length; i++) {
        arrComplete[`${completeTodo[i].category}`] =
          (arrComplete[`${completeTodo[i].category}`] || 0) + 1;
      }
    }

    arr = Object.keys(obj);
    setCategoryTodoComplete(arrComplete);
    setCategoryTodoList(arr);
    setDateTodoObj(obj);
  }, [dateTodo]);

  useEffect(() => {
    let date = localStorage.getItem("date");
    setCalenderdate(date);
  }, [date]);

  useEffect(() => {
    let date = localStorage.getItem("date");
    let nickname = localStorage.getItem("nickname");

    dispatch(__getTodo({ date: date, nickname }));
  }, [dispatch]);

  return (
    <StDiv>
      <div className='header'>
        <PlannerCalender
          calenderdate={calenderdate}
          setCalenderdate={setCalenderdate}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />
        {/* <div className='categoryBox'>
            <img
              className='category'
              src={categorySvg}
              alt='categoryIcon'
              onClick={onClickAddCategoryHandler}
            />
          </div> */}
      </div>

      <StCategoryContainer>
        {categoryTodoList.length > 0 &&
          categoryTodoList.map((data, index) => (
            <StCategoryItem key={index} id={index}>
              <div
                className='top'
                title={data}
                onClick={onClickSelectCategoryToTodoListHandler}
              >
                <p className='title'>{data}</p>
                {categoryTodoList.length > 0 && (
                  <p onClick={(e) => e.stopPropagation()}>
                    {categoryTodoComplete[`${categoryTodoList[index]}`] ===
                    undefined
                      ? 0
                      : categoryTodoComplete[`${categoryTodoList[index]}`]}
                    /{dateTodoObj[`${categoryTodoList[index]}`]}
                  </p>
                )}
              </div>
              <StProgressBarBox onClick={(e) => e.stopPropagation()}>
                <StProgressBar
                  width={
                    isNaN(
                      categoryTodoComplete[`${categoryTodoList[index]}`] /
                        dateTodoObj[`${categoryTodoList[index]}`]
                    )
                      ? 0
                      : (categoryTodoComplete[`${categoryTodoList[index]}`] /
                          dateTodoObj[`${categoryTodoList[index]}`]) *
                        100
                  }
                  backgroundColor='#74E272'
                ></StProgressBar>
              </StProgressBarBox>
            </StCategoryItem>
          ))}
      </StCategoryContainer>
      <PlannerDate
        selectedCategoryName={selectedCategoryName}
        dateTodo={dateTodo}
        display={display}
        setDisplay={setDisplay}
      />
    </StDiv>
  );
};

const StDiv = styled.div`
  background-color: #fafafa;
  width: 100%;
  height: 100%;
  overflow: hidden auto;
  margin: 0 auto;
  font-family: "SUIT-Regular", sans-serif;
  position: relative;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  & .header {
    width: 100%;
    min-width: 360px;
    height: 71px;
    display: flex;
    background-color: #ffffff;
    justify-content: space-between;
    /* align-items: center; */
    /* padding: 10px; */
    box-sizing: border-box;
    border-bottom: 1px solid #f1f3f5;

    @media screen and (min-width: 768px) {
      width: 600px;
    }

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
  height: 100%;
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

export default PlannerCategoryDate;
