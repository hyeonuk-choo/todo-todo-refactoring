// 라이브러리
import React from "react";
import styled from "styled-components";

const Dday = () => {
  // 11월 3째주 목요일 계산
  function getThirdThursdayDate(year) {
    const novFirstDay = new Date(year, 10, 1).getDay();
    const daysUntilThursday = (4 - novFirstDay + 7) % 7;
    const thirdThursday = new Date(year, 10, 1 + (daysUntilThursday + 14));
    return thirdThursday;
  }

  const currentYear = new Date().getFullYear(); // 올해연도
  const thirdThursday = getThirdThursdayDate(currentYear); // 올해 11월 3째주 목요일 계산
  const currentDate = new Date(); // 오늘

  // 차이
  const differenceInMs = Math.abs(
    currentDate.getTime() - thirdThursday.getTime()
  );
  // 날짜차이로 환산
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  return (
    <>
      <StDdayBox>수능 - {differenceInDays}</StDdayBox>
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
  box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 16px;
`;
