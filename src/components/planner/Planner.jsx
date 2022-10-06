import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import leftArrowSvg from "../../assets/img/leftArrowSvg.svg";
import whitePlusSvg from "../../assets/img/whitePlusSvg.svg";
import notDoneSvg from "../../assets/img/notDoneSvg.svg";
import doneSvg from "../../assets/img/doneSvg.svg";
import threeDotSvg from "../../assets/img/threeDotSvg.svg";
import threeDotDoneSvg from "../../assets/img/threeDotDoneSvg.svg";
import { useNavigate } from "react-router-dom";
import {
  __getTodayTodo,
  __postTodo,
  __deleteTodo,
  __updateTodo,
} from "../../redux/modules/plannerSlice";
import Modal from "../utils/Modal";

const Planner = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  // const [modalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoId, setTodoId] = useState(null);
  const [selectTodo, setSelectTodo] = useState(null);
  const [editTodoName, setEditTodoName] = useState(false);
  const [deleteTodoCheckModalVisible, setDeleteTodoCheckModalVisible] =
    useState(false);
  const [todoRate, setTodoRate] = useState(0);
  const todoInputRef = useRef(null);

  const { todos } = useSelector((state) => state.planner);

  const closeModal = () => {
    setModalVisible(false);
    setEditModalVisible(false);
    setEditTodoName(false);
    setDeleteTodoCheckModalVisible(false);
    setTodo("");
  };

  const onChangeInputHandler = (e) => {
    const { value } = e.target;
    setTodo(value);
  };

  const onClickBackPlannerHandler = () => {
    navigate("/planner");
  };

  const onClickAddTodoModalHandler = () => {
    setModalVisible(true);
  };

  const onClickTodoAddHandler = async () => {
    let nickname = localStorage.getItem("nickname");

    if (todo.length > 0) {
      const newTodo = {
        content: todo,
        category: categoryName,
        isComplete: false,
      };
      await dispatch(__postTodo(newTodo));
      await dispatch(__getTodayTodo(nickname));
      setTodo("");
      todoInputRef.current.focus();
    }
  };

  const onClickSelectToTodoHandler = (e) => {
    const { id } = e.target.parentElement.parentElement;
    const data = todoList?.filter((data) => data.todoId === Number(id));
    setSelectTodo(...data);
    setEditModalVisible(true);
    setTodoId(id);
    setTodo(data[0]?.content);
  };

  const onClickEditTodoName = () => {
    setEditTodoName(true);
  };

  const onClickTodoDeleteHandler = () => {
    setDeleteTodoCheckModalVisible(true);
    setEditModalVisible(false);
  };

  const onClickEditTodoNameCancel = () => {
    setEditTodoName(false);
  };

  const onClickEditTodoHandler = async (e) => {
    let nickname = localStorage.getItem("nickname");
    const editTodo = {
      content: todo,
      isComplete: false,
    };
    await dispatch(__updateTodo({ todoId, editTodo }));
    await dispatch(__getTodayTodo(nickname));
    setModalVisible(false);
    setEditModalVisible(false);
    setEditTodoName(false);
    setTodo("");
  };

  const onClickEditTodoDeleteCancel = () => {
    setEditModalVisible(true);
    setDeleteTodoCheckModalVisible(false);
  };

  const onClickEditTodoDeleteCheck = async () => {
    let nickname = localStorage.getItem("nickname");
    await dispatch(__deleteTodo(todoId));
    await dispatch(__getTodayTodo(nickname));
    setDeleteTodoCheckModalVisible(false);
    setTodo("");
  };

  const onClickTodoCompleteHandler = async (e) => {
    let nickname = localStorage.getItem("nickname");
    const { id } = e.target.parentElement.parentElement;
    const data = todoList?.filter((data) => data.todoId === Number(id));
    setTodoId(id);
    const completeTodo = {
      content: data[0].content,
      isComplete: !data[0].complete,
    };
    await dispatch(__updateTodo({ todoId: id, editTodo: completeTodo }));
    await dispatch(__getTodayTodo(nickname));
  };

  useEffect(() => {
    if (todoList.length > 0) {
      const rate = (
        (todoList?.filter((data) => data.complete === true).length /
          todoList.length) *
        100
      ).toFixed();
      setTodoRate(rate);
    }
  }, [todoList]);

  useEffect(() => {
    if (todos !== "") {
      const data = todos.filter((data) => data.category === categoryName);
      setTodoList([...data]);
    } else {
      setTodoList([]);
    }
  }, [todos]);

  useEffect(() => {
    let category = localStorage.getItem("category");
    let categoryId = localStorage.getItem("categoryId");
    let nickname = localStorage.getItem("nickname");
    setCategoryName(category);
    setCategoryId(categoryId);
    dispatch(__getTodayTodo(nickname));
  }, [dispatch]);

  return (
    <StDiv>
      <div className='header'>
        <StHeaderBox>
          <div className='iconBox'>
            <img
              src={leftArrowSvg}
              alt='leftArrowIcon'
              onClick={onClickBackPlannerHandler}
            />
          </div>
          <div className='categoryTitle'>
            <p>{categoryName}</p>
          </div>
          <div></div>
        </StHeaderBox>
        <StCategoryProgressContainer>
          <div className='top'>
            <p className='title'>
              {todoList.length === 0
                ? 0
                : todoList.filter((data) => data.complete === true).length}
              /{todoList.length}
            </p>
            <p>{isNaN(todoRate) ? 0 : todoRate}%</p>
          </div>
          <StProgressBarBox>
            <StProgressBar
              width={isNaN(todoRate) ? 0 : todoRate}
              backgroundColor='#74E272'
            ></StProgressBar>
          </StProgressBarBox>
        </StCategoryProgressContainer>
      </div>
      {/* <StPlusBtnBox onClick={onClickAddTodoModalHandler}>
        <img src={whitePlusSvg} alt='plusBtnIcon' />
      </StPlusBtnBox> */}

      <StTodoContainer>
        {todoList.length > 0 &&
          todoList
            ?.filter((data) => data.complete === false)
            .map((data) => (
              <StTodoItem key={data.todoId} name={data.title}>
                <div className='top' id={data.todoId}>
                  <div
                    className='content'
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={notDoneSvg}
                      alt='notDoneIcon'
                      onClick={onClickTodoCompleteHandler}
                    />
                    <StTodoTitle className='title'>{data.content}</StTodoTitle>
                  </div>
                  <div className='option' onClick={onClickSelectToTodoHandler}>
                    <img src={threeDotSvg} alt='threeDotIcon' />
                  </div>
                </div>
              </StTodoItem>
            ))}
      </StTodoContainer>

      <StTodoContainerComplete>
        {todoList.length > 0 &&
          todoList
            ?.filter((data) => data.complete === true)
            .map((data) => (
              <StTodoItem key={data.todoId} name={data.title}>
                <div className='top' id={data.todoId}>
                  <div
                    className='content'
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={doneSvg}
                      alt='doneIcon'
                      onClick={onClickTodoCompleteHandler}
                    />
                    <StTodoTitle className='title' color='#E8E8E8'>
                      {data.content}
                    </StTodoTitle>
                  </div>
                  <div className='option'>
                    <img src={threeDotDoneSvg} alt='threeDotDoneIcon' />
                  </div>
                </div>
              </StTodoItem>
            ))}
      </StTodoContainerComplete>

      <Modal
        visible={modalVisible}
        closable={true}
        maskClosable={true}
        onClose={closeModal}
        width='290px'
        height='180px'
        radius='40px'
        top='40%'
        backgroundcolor='rgba(0, 0, 0, 0.2)'
      >
        <StModalBtnBox>
          <p className='addtitle'>투두 추가</p>
          <StTodoInput
            minLength='2'
            maxLength='15'
            placeholder='내용을 입력해주세요.(2-15자 이내)'
            type='text'
            value={todo}
            onChange={onChangeInputHandler}
            ref={todoInputRef}
          />
          <StEditBtnbox>
            <StModalAddBtn onClick={onClickTodoAddHandler}>추가</StModalAddBtn>
            <StModalCancelBtn onClick={closeModal}>취소</StModalCancelBtn>
          </StEditBtnbox>
        </StModalBtnBox>
      </Modal>

      <Modal
        visible={editModalVisible}
        closable={true}
        maskClosable={true}
        onClose={closeModal}
        width='290px'
        height='170px'
        radius='40px'
        top='40%'
        backgroundcolor='rgba(0, 0, 0, 0.2)'
      >
        <StModalBtnBox>
          {!editTodoName ? (
            <StEditBtnBox>
              <p className='edittitle'>{selectTodo?.content}</p>
              <p onClick={onClickEditTodoName} className='updatetitle'>
                이름 변경
              </p>
              <div className='btnBox'>
                <StModalDeleteBtn onClick={onClickTodoDeleteHandler}>
                  삭제
                </StModalDeleteBtn>
              </div>
              <StEditCancelBtn onClick={closeModal}>취소</StEditCancelBtn>
            </StEditBtnBox>
          ) : (
            <>
              <p className='title'>투두 내용 변경</p>
              <StTodoInput
                minLength='2'
                maxLength='15'
                type='text'
                value={todo}
                onChange={onChangeInputHandler}
              />
              <StEditBtnbox>
                <StModalAddBtn onClick={onClickEditTodoHandler}>
                  확인
                </StModalAddBtn>
                <StModalCancelBtn onClick={onClickEditTodoNameCancel}>
                  취소
                </StModalCancelBtn>
              </StEditBtnbox>
            </>
          )}
        </StModalBtnBox>
      </Modal>

      <Modal
        visible={deleteTodoCheckModalVisible}
        closable={true}
        maskClosable={true}
        onClose={closeModal}
        width='290px'
        height='180px'
        radius='40px'
        top='40%'
        backgroundcolor='rgba(0, 0, 0, 0.2)'
      >
        <StModalBtnBox>
          <p className='deletetitle'>투두를 삭제하시겠습니까?</p>
          <p className='confirm'>삭제하면 다시 불러올 수 없습니다</p>
          <StDeleteBtnbox>
            <StModalAddBtn onClick={onClickEditTodoDeleteCheck}>
              확인
            </StModalAddBtn>
            <StModalCancelBtn onClick={onClickEditTodoDeleteCancel}>
              취소
            </StModalCancelBtn>
          </StDeleteBtnbox>
        </StModalBtnBox>
      </Modal>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  min-width: 360px;
  background-color: #fafafa;
  height: 100%;
  font-family: "SUIT-Regular", sans-serif;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;

  @media screen and (min-width: 768px) {
    width: 600px;
  }

  /* @media screen and (min-height: 850px) {
  height:1180px;
  }

  @media screen and (min-height: 915px) {
  height:1024px;
  }

  @media screen and (min-height: 1024px) {
  height:1180px;
  }
  @media screen and (min-height: 1180px) {
  height:1366px;
  } */

  & .header {
    width: 100%;
    /* min-width: 360px; */
    height: 112px;
    position: fixed;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #f1f3f5;
    box-sizing: border-box;
    z-index: 5;

    @media screen and (min-width: 768px) {
      width: 600px;
    }
  }
`;

const StHeaderBox = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;

  & div {
    flex: 1;
  }

  & .iconBox {
    padding-left: 10px;

    img {
      /* position: absolute;
      bottom: 0px;
      transform: translateY(-50%); */
    }
  }

  & .categoryTitle {
    font-weight: 600;
    text-align: center;
    transform: translateX(-5px);
  }
`;

const StCategoryProgressContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* margin-bottom: 16px; */
  padding: 0px 30px;

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
  transition: all 0.3s;
  height: 13px;
  border-radius: 10px;
`;

const StPlusBtnBox = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: #ff8f27;
  position: absolute;
  bottom: 100px;
  right: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const StModalBtnBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 1rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 40px;
  & p {
    width: 100%;
    margin: 0;
    text-align: center;
  }

  & p.updatetitle {
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 45px;
    border-top: 1px solid #f1f3f5;
    cursor: default;
  }

  & p.title {
    font-size: 17px;
    font-weight: 700;
    position: relative;
    /* bottom: 5px; */
  }

  & p.deletetitle {
    font-size: 17px;
    font-weight: 700;
    position: relative;
    top: 10px;
  }

  & p.confirm {
    position: relative;
    top: 5px;
  }

  & p.edittitle {
    font-size: 17px;
    font-weight: 700;
    position: relative;
    bottom: 12px;
    margin-bottom: 10px;
    cursor: default;
  }

  & p.addtitle {
    font-weight: 700;
    position: relative;
    font-size: 17px;
    bottom: -5px;
  }

  & .btnBox {
    display: flex;
  }
`;

const StTodoInput = styled.input`
  // props로 입력할 때 마다 border 색 변경하기
  border: 1px solid #d7d5d5;
  margin-top: 10px;
  height: 25px;
  width: 250px;
  padding: 0.5rem;
  border-radius: 16px;
  outline: none;
  resize: none;
  font-size: 15px;
  font-family: "SUIT-Regular";
  &:focus {
    border-color: #ff8f27;
  }
`;

const StModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50%;
  outline: none;
  border: none;
  background-color: white;
  color: #ff8f27;

  margin-top: 5%;

  &:last-child {
    border-bottom: none;
  }
`;

const StTodoContainer = styled.div`
  padding: 10px 20px 0px 20px;
  transform: translateY(100px);
`;

const StTodoContainerComplete = styled.div`
  padding: 0px 20px 71px 20px;
  transform: translateY(100px);
`;

const StTodoItem = styled.div`
  width: 100%;
  height: 52px;
  border-radius: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 16px 0;
  padding: 15px 20px;
  -webkit-box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);

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

const StModalAddBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 40px;
  outline: none;
  border-right: none;
  border-top: 1px solid #f1f3f5;
  border-left: none;
  border-bottom: none;
  border-radius: 0 0 0 16px;
  background-color: white;
  color: #ff8f27;
  font-family: "SUIT-Regular";
  font-weight: 600;
  font-size: 16px;

  &:last-child {
    border-bottom: none;
  }
`;

const StModalCancelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 40px;
  outline: none;
  border-left: none;
  border-top: 1px solid #f1f3f5;
  border-left: 1px solid #f1f3f5;
  border-right: none;
  border-bottom: none;
  border-radius: 0 0 16px 0;
  background-color: white;
  color: black;
  font-family: "SUIT-Regular";
  font-weight: 600;
  font-size: 16px;

  &:last-child {
    border-bottom: none;
  }
`;

const StModalDeleteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 40px;
  color: red;
  padding-top: 12px;
  outline: none;
  border-top: 1px solid #f1f3f5;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-radius: 0 0 16px 16px;
  background-color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: "SUIT-Regular";
`;

const StbuttonSet = styled.div`
  display: flex;
`;

const StEditCancelBtn = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 250px;
  height: 40px;
  margin-top: 26px;

  cursor: default;
`;

const StEditBtnBox = styled.div`
  position: relative;
  top: 20px;
`;

const StEditBtnbox = styled.div`
  display: flex;
  position: relative;
  top: 10px;
`;

const StDeleteBtnbox = styled.div`
  display: flex;
  position: relative;
  top: 10px;
`;
export default Planner;
