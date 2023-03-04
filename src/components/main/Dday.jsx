import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { __getDday, __updateDday } from "../../redux/modules/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../utils/Modal";

const Dday = () => {
  const dispatch = useDispatch();
  const [ddate, setDdate] = useState({
    title: "",
    selectedDate: "",
  });
  const [complete, setComplete] = useState({
    ok: false,
  });

  const { dday } = useSelector((state) => state.main);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setDdate({
      ...ddate,
      title: value,
    });
  };

  const onChangeDateHandler = (e) => {
    const { value } = e.target;
    setDdate({
      ...ddate,
      selectedDate: value,
    });
  };

  const onSubmitHandler = async () => {
    await dispatch(
      __updateDday({
        ...ddate,
        title: ddate.title,
        selectedDate: ddate.selectedDate,
      })
    );
    await dispatch(__getDday());
  };

  const onCompleteHandler = () => {
    setComplete({
      ...complete,
      ok: true,
    });
  };

  useEffect(() => {
    dispatch(__getDday());
  }, [dispatch]);

  useEffect(() => {
    if (ddate.title.length > 0 && ddate.selectedDate !== "") {
      setComplete({
        ...complete,
        ok: false,
      });
    }
  }, [ddate]);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setDdate({
      ...ddate,
      title: "",
      selectedDate: "",
    });
    setComplete({
      ...complete,
      ok: false,
    });
  };

  //state를 불러오는중이라 null인 상태일때는 아래 if문을,response를 받게되면 원래의 return문 출력
  if (!dday) {
    return <div></div>;
  }

  return (
    <div>
      {/* 모달창 */}
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          width="350px"
          height="330px"
          top="45%"
          radius="48px"
          backgroundcolor="rgba(31, 31, 31, 0.116)"
        >
          <StModalTop>디데이</StModalTop>
          <StInputbox>
            <input
              type="text"
              maxLength="8"
              placeholder="8자 이내로 입력해주세요."
              onChange={onChangeHandler}
            />
          </StInputbox>
          <StDate>날짜</StDate>
          <StDateInput
            type="date"
            min="2012-01-01"
            max="2032-12-31"
            onChange={onChangeDateHandler}
          ></StDateInput>
          {complete.ok === true ? (
            <Stalert>입력하지 않은 항목이 있는지 확인해주세요!</Stalert>
          ) : (
            <div></div>
          )}

          <StModalBottom>
            <StCancelBtn onClick={closeModal}>취소</StCancelBtn>

            {ddate.title.length == 0 || ddate.selectedDate.length == 0 ? (
              <StNotCompleteBtn
                onClick={() => {
                  onCompleteHandler();
                }}
              >
                완료
              </StNotCompleteBtn>
            ) : (
              <StCompleteBtn
                onClick={() => {
                  onSubmitHandler();
                  closeModal();
                }}
              >
                완료
              </StCompleteBtn>
            )}
          </StModalBottom>
        </Modal>
      )}

      <StDdayBox onClick={openModal}>
        {dday.title}
        {dday.remainingDay}
      </StDdayBox>
    </div>
  );
};

const StDdayBox = styled.div`
  width: 9vw;
  height: 7vh;
  font-size: 2vh;
  font-weight: 600;
  color: #ff8f27;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  padding: 8px 12px;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06),
    0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  border-radius: 16px;
`;

const StModalTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 85px;

  border-radius: 48px 48px 0 0;
  font-weight: bold;
  font-size: 1.2em;
`;

const StInputbox = styled.div`
  display: flex;
  justify-content: center;
  input {
    width: 300px;
    height: 50px;
    border: 1px solid #e8e8e8;
    border-radius: 16px;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 15px;
  }
`;

const StDate = styled.div`
  margin-left: 25px;
  padding-top: 15px;
`;

const StDateInput = styled.input`
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  margin-left: 25px;
  margin-top: 8px;
  width: 170px;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  font-family: "SUIT-Regular";
  font-size: 15px;
`;

const StModalBottom = styled.div`
  position: relative;
  top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 55px;
  border-top: 1px solid #f1f3f5;
`;

const StCancelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 50px;
  border-right: 1px solid #f1f3f5;
`;
const StCompleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 50px;
  color: #ff7b00;
`;

const StNotCompleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 50px;
  color: black;
`;

const Stalert = styled.div`
  color: #ff7b00;
  position: absolute;
  margin-left: 25px;
  padding-top: 10px;
`;
export default Dday;
