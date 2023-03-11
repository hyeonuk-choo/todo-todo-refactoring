import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import categorySvg from "../../assets/img/categorySvg.svg";
import Navbar from "../utils/Navbar";
import TodoAddBtn from "./TodoAddBtn";

const PlannerMain = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [todos, setTodos] = useState([]);
  const [toggle, setToggle] = useState(false);
  const uniqueId = uuidv4();

  const onChangeInput = (e) => {
    const { name, value, id } = e.target;
    const updatedTodo = todos.find(
      (todo) => todo.addMode || (todo.updateMode && todo.id === id)
    );

    if (updatedTodo) {
      updatedTodo[name] = value;
      setTodos([...todos]);
    }
  };

  // 투두 추가하기 토글버튼 + post요청
  const onClickAddToggleBtn = (id) => {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.addMode = !todo.addMode;
      }
      return todo;
    });

    setTodos(newTodos);

    axios
      .put(`${BASE_URL}/todo-update`, {
        todos: newTodos,
      })
      .then((response) => {
        // 비동기 이슈, 서버에 업데이트가 되고 resolve되서 응답올 때, get요청
        console.log(response.data);
        getTodos();
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  // 투두 수정하기 토글버튼
  const onClickUpdateToggleBtn = (id) => {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.updateMode = !todo.updateMode;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // 투두추가'+'버튼을 눌렀을 때, 데이터추가
  const onClickAdd = () => {
    setTodos([
      {
        title: "",
        content: "",
        updateMode: false,
        addMode: true,
        id: uniqueId,
      },
      ...todos,
    ]);
  };

  // get요청 코드 입니다.
  function getTodos() {
    axios
      .get(`${BASE_URL}/planner-main`, {
        params: {
          timestamp: new Date().getTime(),
        },
      })
      .then((data) => {
        setTodos(data.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(getTodos, []);

  console.log(todos);

  // 투두 Update하는 코드 입니다.
  const onClickUpdate = async (id) => {
    const newTodos = todos.filter((todo) => {
      if ((todo.updateMode = true && todo.id == id)) {
        todo.updateMode = false;
      }
      return todo;
    });

    await axios
      .put(`${BASE_URL}/todo-update`, {
        todos: newTodos,
      })
      .then((response) => {
        // 비동기 이슈, 서버에 업데이트가 되고 resolve되서 응답올 때, get요청
        console.log(response.data);
        getTodos();
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  // 투두 delete를 하는 코드 입니다.
  const onClickDelete = async (id) => {
    // todos.filter((todo) => todo.updateMode === true && todo.id === id);
    await axios
      .delete(`${BASE_URL}/todo-delete`, {
        data: {
          id,
        },
      })
      .then((response) => {
        // 비동기 이슈, 서버에 delete가 된 이후에 get요청
        // Handle success
        console.log(response.data);
        getTodos();
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

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
        <StCategoryContainer>
          {todos?.map((each) => (
            <div className="todo" key={each.id}>
              {each.addMode ? (
                <>
                  <input
                    value={each.title}
                    name="title"
                    id={each.id}
                    onChange={onChangeInput}
                  ></input>
                  <input
                    value={each.content}
                    name="content"
                    id={each.id}
                    onChange={onChangeInput}
                  ></input>
                  <button
                    onClick={() => {
                      // onClickUpdate(each.id);
                      onClickAddToggleBtn(each.id);
                    }}
                  >
                    추가하기
                  </button>
                </>
              ) : each.updateMode ? (
                <>
                  <input
                    value={each.title}
                    name="title"
                    id={each.id}
                    onChange={onChangeInput}
                  ></input>
                  <input
                    value={each.content}
                    name="content"
                    id={each.id}
                    onChange={onChangeInput}
                  ></input>
                  <button
                    onClick={() => {
                      onClickUpdate(each.id);
                      onClickUpdateToggleBtn(each.id);
                    }}
                  >
                    수정완료
                  </button>
                </>
              ) : (
                <>
                  <div>{each.title}</div>
                  <div>{each.content}</div>
                  <button
                    onClick={() => {
                      onClickUpdateToggleBtn(each.id);
                    }}
                  >
                    수정
                  </button>
                </>
              )}
              <button
                onClick={(e) => {
                  onClickDelete(each.id);
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </StCategoryContainer>
        {/* --------- 투두 바디부분 끝 ----------*/}

        {/* --------- 네비게이션바 ----------*/}
        <Navbar planner={true} />
        {/* --------- 투두 추가 고정버튼 ----------*/}
        <TodoAddBtn todos={todos} setTodos={setTodos} onClickAdd={onClickAdd} />
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

  .todo {
    display: flex;
  }
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

export default PlannerMain;
