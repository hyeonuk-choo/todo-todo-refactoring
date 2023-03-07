import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { __getDday, __updateDday } from "../../redux/modules/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../utils/Modal";

const Dday = () => {
  const dispatch = useDispatch();
  const [complete, setComplete] = useState({
    ok: false,
  });

  const [ddate, setDdate] = useState({
    title: "목표",
    selectedDate: "",
    dday: 0,
  });

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setDdate({
      ...ddate,
      [name]: value,
    });
  };

  const today = new Date().toISOString().split("T")[0];

  const onSubmitHandler = () => {
    const startDate = new Date().getDate();
    const endDate = new Date(ddate.selectedDate).getDate();
    const difference = endDate - startDate;
    setDdate({ ...ddate, dday: difference });
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
  };

  return (
    <>
      {/* --- 메인 첫페이지 D-day UI --- */}
      <StDdayBox onClick={openModal}>
        {ddate.title + "\u00A0-\u00A0" + ddate.dday}
      </StDdayBox>

      {/* --------- 모달창 시작 --------- */}
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
          <StModalTop>Let's Set D-day!</StModalTop>
          <StInputbox>
            <select name="title" onChange={onChangeHandler} placeholder="dd">
              <option value={ddate.title}>목표를 선택해주세요!</option>
              <option value="수능">수능</option>
              <option value="모의고사">모의고사</option>
              <option value="중간고사">중간고사</option>
              <option value="기말고사">기말고사</option>
            </select>
            {/* <input
              type="text"
              maxLength="8"
              placeholder="8자 이내로 입력해주세요."
              onChange={onChangeHandler}
              name="title"
            /> */}
          </StInputbox>
          <StDate>목표 날짜</StDate>
          <StDateInput
            type="date"
            min={today}
            max="2030-12-31"
            name="selectedDate"
            onChange={onChangeHandler}
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
      {/* --------- 모달창 끝 ---------- */}
    </>
  );
};

const StDdayBox = styled.div`
  width: 9rem;
  height: 7vh;
  font-size: 2.3vh;
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
  select {
    appearance: none;
    width: 300px;
    height: 50px;
    border: 1px solid #e8e8e8;
    border-radius: 16px;
    padding: 0 1rem 0 1rem;
    box-sizing: border-box;
    font-size: 15px;

    option {
      border: none;
    }
  }
  // input {
  //   width: 300px;
  //   height: 50px;
  //   border: 1px solid #e8e8e8;
  //   border-radius: 16px;
  //   padding-left: 10px;
  //   box-sizing: border-box;
  //   font-size: 15px;
  // }
`;

const StDate = styled.div`
  margin-left: 2rem;
  padding-top: 15px;
`;

const StDateInput = styled.input`
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  margin-left: 25px;
  margin-top: 8px;
  width: 300px;
  height: 50px;
  padding: 0 1rem 0 1rem;
  box-sizing: border-box;
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
