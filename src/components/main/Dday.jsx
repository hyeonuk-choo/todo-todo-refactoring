// 라이브러리
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Dday = () => {
  // 11월 3째주 목요일 계산
  function getThirdThursdayDate(year) {
    const novFirstDay = new Date(year, 10, 1).getDay();
    const daysUntilThursday = (4 - novFirstDay + 7) % 7;
    const thirdThursday = new Date(year, 10, 1 + (daysUntilThursday + 14));
    return thirdThursday;
  }

  const currentYear = new Date().getFullYear();
  const thirdThursday = getThirdThursdayDate(currentYear);

  // 오늘
  const currentDate = new Date();

  // 차이
  const differenceInMs = Math.abs(
    currentDate.getTime() - thirdThursday.getTime()
  );
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  console.log(differenceInDays);
  return (
    <>
      <StDdayBox onClick={() => {}}>수능 - {differenceInDays}</StDdayBox>
    </>
  );
};

export default Dday;

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
