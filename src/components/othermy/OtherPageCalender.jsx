import { useState } from "react";
import styled from "styled-components";
import Modal from "../utils/Modal";
import dayjs from "dayjs";
import calendarSvg from "../../assets/img/calendarSvg.svg";
import OtherProfileCalender from "./OtherProfileCalender";

const OtherPageCalender = ({
  calenderdate,
  setCalenderdate,
  setFirstCheck,
  selectDate,
  setSelectDate,
}) => {
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <StDateDiv>
      <StSpan>
        {dayjs(calenderdate).month() + 1}월 {dayjs(calenderdate).date()}일{" "}
        {days[dayjs(calenderdate).day()]}
      </StSpan>
      <img src={calendarSvg} onClick={openModal} alt='calendarIcon' />
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          width='350px'
          top='30%'
        >
          <OtherProfileCalender
            setFirstCheck={setFirstCheck}
            setCalenderdate={setCalenderdate}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
          />
        </Modal>
      )}
    </StDateDiv>
  );
};

export default OtherPageCalender;

const StDateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;

  margin-left: 3%;
  padding: 10px;
  font-size: 18px;
`;

const StSpan = styled.span`
  font-weight: bold;
`;
