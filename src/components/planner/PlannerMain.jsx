// 라이브러리
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// 컴포넌트
import Navbar from "../utils/Navbar";
import TodoAddBtn from "./TodoAddBtn";

// 이미지
import threeDotSvg from "../../assets/img/threeDotSvg.svg";
import ModalBasic from "../utils/ModalBasic";

const PlannerMain = () => {
  // 상태관리 라이브러리 사용하지 않고 구현
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const uniqueId = uuidv4();
  const [todos, setTodos] = useState([]);
  const [modalId, setModalId] = useState(null);

  // 클릭한 DOM요소의 id를 state값으로 가져오기
  const handleDivClick = (id) => {
    setModalId(id);
  };

  // setModalId state값으로 모달창 토글
  const handleCloseModal = () => {
    setModalId(null);
  };

  // onChange 핸들러
  const onChangeInput = (e) => {
    const { name, value, id } = e.target;
    const updatedTodo = todos.find(
      (todo) =>
        (todo.addMode && todo.id === id) || (todo.updateMode && todo.id === id)
    );

    if (updatedTodo) {
      updatedTodo[name] = value;
      setTodos([...todos]);
    }
  };

  // 투두 추가하기 버튼 + post요청
  const onClickAddButton = (id) => {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.addMode = !todo.addMode;
      }
      return todo;
    });

    // 서버와 바로 연동
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

  // 투두추가를 취소하는 버튼
  const onClickCancel = (id) => {
    const filterTodo = todos.filter((todo) => todo.id !== id);
    // 서버와 바로 연동
    axios
      .put(`${BASE_URL}/todo-update`, {
        todos: filterTodo,
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

  // 투두추가'+'버튼을 눌렀을 때, 데이터추가
  const onClickAdd = () => {
    setTodos([
      {
        id: uniqueId,
        title: "",
        content: "",
        updateMode: false,
        addMode: true,
        isCompleted: false,
      },
      ...todos,
    ]);
  };

  // get요청 코드 입니다.
  const getTodos = () => {
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
  };

  useEffect(getTodos, []);

  console.log(todos);

  // 투두 수정하기 토글버튼
  const onClickUpdateToggleBtn = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.updateMode = !todo.updateMode;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // 투두 Update하는 코드 입니다.
  const onClickUpdate = async (id) => {
    const newTodos = todos.filter((todo) => {
      if (todo.id === id) {
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
    // const filteredTodos = todosData.todos.filter((todo) => todo.id !== id);
    // 해당 제거로직은 서버코드에서 작성

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

  const checkBoxHandler = (e) => {
    const anotherTodos = todos.map((todo) => {
      if (todo.id === e.target.id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(anotherTodos);
  };

  return (
    <>
      <StDiv>
        {/* ------------ 투두 헤더 -------------*/}
        <div className="header">
          <span>OOO님의 플래너</span>
          {/* <div className="categoryBox">
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
          /> */}
        </div>

        {/* -------- 투두 바디부분 시작 ---------*/}
        <StBody>
          {todos?.map((each) => (
            <div id="todo" key={each.id}>
              {each.addMode ? (
                <>
                  <div className="titleDivBox">
                    <input
                      value={each.title}
                      name="title"
                      id={each.id}
                      onChange={onChangeInput}
                    ></input>
                  </div>

                  <div className="contentDiv">
                    <input
                      value={each.content}
                      name="content"
                      id={each.id}
                      onChange={onChangeInput}
                    ></input>
                  </div>

                  <div className="buttonBox">
                    <button
                      onClick={() => {
                        onClickAddButton(each.id);
                      }}
                    >
                      추가하기
                    </button>
                    <button
                      onClick={() => {
                        onClickCancel(each.id);
                      }}
                    >
                      취소
                    </button>
                  </div>
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
                    }}
                  >
                    수정완료
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    name=""
                    value=""
                    id={each.id}
                    onChange={checkBoxHandler}
                  />
                  <div id="titleDivBoxAndContentDiv">
                    <div className="titleDivBox">
                      <div className="titleDiv">{each.title}</div>
                      <img
                        src={threeDotSvg}
                        alt="threeDotSvg"
                        onClick={() => {
                          handleDivClick(each.id);
                        }}
                      />
                    </div>

                    <div className="contentDiv">{each.content}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </StBody>
        {/* --------- 투두 바디부분 끝 ----------*/}

        {/* --------- 네비게이션바 ----------*/}
        <Navbar planner={true} />
        {/* --------- 투두 추가 고정버튼 ----------*/}
        <TodoAddBtn todos={todos} setTodos={setTodos} onClickAdd={onClickAdd} />
        {/* --------- 수정/삭제 모달창 ----------*/}
        {modalId ? (
          <ModalBasic
            modalWidth={30 + "%"}
            modalHeight={30 + "%"}
            modalTop={(100 - 30) / 2 + "%"}
            modalLeft={(100 - 30) / 2 + "%"}
            onClickUpdateToggleBtn={onClickUpdateToggleBtn}
            handleCloseModal={handleCloseModal}
            onClickDelete={onClickDelete}
            id={modalId}
          />
        ) : null}
      </StDiv>
    </>
  );
};

const StDiv = styled.div`
  background-color: #fafafa;
  overflow: hidden auto;

  & .header {
    box-sizing: border-box;
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #ffffff;
    border-bottom: 1px solid #f1f3f5;

    span {
      font-size: 3vh;
      font-weight: 600;
    }

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

const StBody = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 10vh - 10vh);
  padding-top: 1.3rem;

  overflow: auto;

  #todo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    width: 85%;
    height: 15%;
    // 위아래 마진을 주면, border-box인데도 공간을 더 밀어낸다.
    margin: 0 auto 1rem auto;
    box-shadow: 0px 4px 15px rgba(19, 19, 19, 0.15);
    border-radius: 1rem;
    background-color: white;

    input[type="checkbox"] {
      width: 13%;
      height: 20%;
    }

    #titleDivBoxAndContentDiv {
      /* display: flex; */
      /* flex-direction: column; */
      width: calc(100% - 13%);
      height: 50%;
      box-sizing: border-box;
    }

    .titleDivBox {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;

      .titleDiv {
        width: 100%;
      }

      img {
        cursor: pointer;
        position: absolute;
        right: 2%;
      }

      input {
        width: 100%;
      }
    }

    .contentDiv {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      input {
        width: 100%;
      }
    }

    button {
    }
  }
`;

const StDateInput = styled.input`
  background-color: #ffffff;
  border: none;
  width: 20vh;
  box-sizing: border-box;
  font-size: 2.5vh;
`;

export default PlannerMain;
