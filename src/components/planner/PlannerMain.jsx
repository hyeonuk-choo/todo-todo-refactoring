// 라이브러리
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// 이미지
import threeDotSvg from "../../assets/img/threeDotSvg.svg";
import ModalBasic from "../utils/ModalBasic";
// 컴포넌트
import Navbar from "../utils/Navbar";
import TodoAddBtn from "./TodoAddBtn";
import { getUserInfo } from "../../redux/modules/mainSlice";

const PlannerMain = () => {
  // 상태관리 라이브러리 사용하지 않고 구현
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.main); // mainSlice
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
      if (value.length <= 17) {
        updatedTodo[name] = value;
        updatedTodo.inputMessage = "";
      } else {
        updatedTodo.inputMessage = "입력가능한 글자수는 최대17자입니다.";
      }
      setTodos([...todos]);
    }
  };

  // 투두 추가하기 버튼 + post요청
  const onClickAddButton = (id) => {
    const selectedOne = todos.filter((todo) => todo.id === id);
    if (selectedOne[0].title.length < 2) {
      // alert방식
      // alert("두글자 이상 입력해주세요.");
      // state변경 방식
      selectedOne[0].inputMessage = "두글자 이상 입력해주세요.";
      setTodos([...todos]);
      return; // 추가 버튼 실행하지 않음
    }

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
        inputMessage: "",
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
      .catch((error) => console.error(error));
  };

  useEffect(getTodos, []);
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

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
    const selectedTodo = todos.filter((todo) => todo.id === id);
    if (selectedTodo[0].title.length < 2) {
      // alert방식
      // alert("두글자 이상 입력해주세요.");
      // state변경 방식
      selectedTodo[0].inputMessage = "두글자 이상 입력해주세요.";
      setTodos([...todos]);
      return; // 추가 버튼 실행하지 않음
    }

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

        getTodos();
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  // checkbox, 투두 완료여부 상태변경
  const checkBoxHandler = (e) => {
    const anotherTodos = todos.map((todo) => {
      if (todo.id === e.target.id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });

    axios
      .put(`${BASE_URL}/todo-update`, {
        todos: anotherTodos,
      })
      .then((response) => {
        // 비동기 이슈, 서버에 업데이트가 되고 resolve되서 응답올 때, get요청

        getTodos();
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <StRootDiv>
      {/* ------------ 투두 헤더 -------------*/}
      <div className="header">
        <span>{userInfo.nickname}님의 플래너</span>
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
          <StTodo key={each.id} isCompleted={each.isCompleted}>
            {each.addMode ? (
              <>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  id={each.id}
                  onChange={checkBoxHandler}
                  // 렌더링 이전의input, 이후의input 모두에 속성을 넣어야한다.
                  checked={each.isCompleted}
                />
                <div className="titleDivBox">
                  <div className="adjust"></div>
                  <label>
                    <input
                      value={each.title}
                      name="title"
                      id={each.id}
                      onChange={onChangeInput}
                      autoFocus
                      placeholder="최대 17자까지 입력가능합니다."
                    />
                    <div className="buttonBox">
                      <button
                        className="leftButton"
                        onClick={() => {
                          // ※추가하기 '버튼'에는 value가 없다. event를 가져오는게 무의미
                          onClickAddButton(each.id);
                        }}
                      >
                        추가하기
                      </button>
                      <button
                        className="rightButton"
                        onClick={() => {
                          onClickCancel(each.id);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </label>
                  <div className="adjust">{each.inputMessage}</div>
                </div>
              </>
            ) : each.updateMode ? (
              <>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  id={each.id}
                  onChange={checkBoxHandler}
                  // 렌더링 이전의input, 이후의input 모두에 속성을 넣어야한다.
                  checked={each.isCompleted}
                />
                <div className="titleDivBox">
                  <div className="adjust"></div>
                  <label>
                    <input
                      value={each.title}
                      name="title"
                      id={each.id}
                      onChange={onChangeInput}
                      autoFocus
                      placeholder="최대 17자까지 입력가능합니다."
                    />
                    <button
                      className="rightButton"
                      onClick={() => {
                        onClickUpdate(each.id);
                      }}
                    >
                      수정완료
                    </button>
                  </label>
                  <div className="adjust">{each.inputMessage}</div>
                </div>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  id={each.id}
                  onChange={checkBoxHandler}
                  // 렌더링 이전의input, 이후의input 모두에 속성을 넣어야한다.
                  checked={each.isCompleted}
                />

                <div className="titleDivBox">
                  <div
                    className={`titleDiv ${each.isCompleted ? "complete" : ""}`}
                  >
                    {each.title}
                  </div>
                  <img
                    src={threeDotSvg}
                    alt="threeDotSvg"
                    onClick={() => {
                      handleDivClick(each.id);
                    }}
                  />
                </div>

                {/* <div className="contentDiv">{each.content}</div> */}
              </>
            )}
          </StTodo>
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
    </StRootDiv>
  );
};

const StTodo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  width: 85%;
  height: 14%;
  // 위아래 마진을 주면, border-box인데도 공간을 더 밀어낸다.
  margin: 0 auto 1rem auto;
  box-shadow: 0px 4px 15px rgba(19, 19, 19, 0.15);
  border-radius: 1rem;
  background-color: ${(props) =>
    props.isCompleted ? "rgb(250, 250, 250)" : "white"};

  input[type="checkbox"] {
    width: 13%;
    height: 20%;
    cursor: pointer;
  }

  .titleDivBox {
    // calc 빼기할 때, -마이너스 양옆 공백중요
    width: calc(100% - 13%);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .adjust {
      box-sizing: border-box;
      height: 30%;
      padding-left: 2%;
      font-size: 1.4vh;
      color: red;
      font-weight: 600;

      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    label {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      height: 40%;
      width: 95%;
    }

    input {
      height: 100%;
      width: 100%;
      font-size: 100%;
      border: 0.5vh solid rgb(255, 233, 213);
      border-radius: 0.5rem;
      font-family: "Gowun Dodum", sans-serif;
    }

    input:focus {
      outline: none;
    }

    & button {
      cursor: pointer;
    }

    .rightButton {
      position: absolute;
      top: 0;
      right: 0.6vh;

      background-color: rgb(255, 143, 39);
      border: none;
      height: 100%;
      width: 17%;
      color: white;
      border-radius: 0.5rem;

      font-family: "Gowun Dodum", sans-serif;
    }

    .leftButton {
      position: absolute;
      top: 0;
      right: calc(0.8vh + 17%);

      background-color: rgb(255, 143, 39);
      border: none;
      height: 100%;
      width: 17%;
      color: white;
      border-radius: 0.5rem;

      font-family: "Gowun Dodum", sans-serif;
    }

    .titleDiv {
      width: 100%;
    }

    .complete {
      text-decoration: line-through;
    }

    img {
      cursor: pointer;
      position: absolute;
      right: 2%;
    }
  }
`;

const StBody = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 10vh - 10vh);
  padding-top: 1.3rem;

  overflow: auto;
  .completeBackground {
    background-color: gray;
  }
`;

const StRootDiv = styled.div`
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
  }
`;

export default PlannerMain;
