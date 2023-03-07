import React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __getTodo } from "../../redux/modules/plannerSlice";
import { useParams } from "react-router-dom";

const OtherProfileCalender = ({
  setCalenderdate,
  setFirstCheck,
  selectDate,
  setSelectDate,
}) => {
  const dispatch = useDispatch();
  const params = useParams();

  const marks = [];

  const selectDateHandler = async (date) => {
    const newDate = dayjs(date).format("YYYY-MM-DD");
    let nickname = localStorage.getItem("nickname");
    localStorage.setItem("date", newDate);
    setCalenderdate(newDate);
    await dispatch(__getTodo({ date: newDate, nickname: params.id }));
    setFirstCheck(false);
  };

  return (
    <StDiv>
      <ReactCalendar
        onClickDay={selectDateHandler}
        locale="Korean"
        formatDay={(locale, date) => dayjs(date).format("DD")}
        calendarType="US"
      />
    </StDiv>
  );
};

export default OtherProfileCalender;

const StDiv = styled.div`
  width: 100%;
  /* height:400px; */
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);

  .react-calendar {
    width: 100%;
    /* height:400px; */
    background: white;
    /* border: 1px solid #a0a096; */

    font-size: 1rem;
    line-height: 17px;
    z-index: 10;
    border: none;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    color: black;
  }
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #ff8f2740;
  }
  //월~토 표기 부분
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
    font-weight: 500;
    color: #9f9e9e;

    & abbr[title] {
      text-decoration: none;
    }
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day {
    color: #111;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #111;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #d7d5d5;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    width: 50px;
    height: 50px;
    background: #e6e6e6;
    border-radius: 50%;
    color: white;
  }
  .react-calendar__tile--now {
    width: 50px;
    height: 50px;
    background: #ff8f27;
    border-radius: 50%;
    color: white;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
  }
  .react-calendar__tile--hasActive {
    background: #ff8f2780;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
  }
  .react-calendar__tile--active {
    background: #ff8f2780;
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #ff8f2780;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
    font-size: 24px;
    padding-left: 27px;
    color: #ff7b00;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
    font-size: 24px;
    padding-right: 27px;
    color: #ff7b00;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button {
    display: none;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__next2-button {
    display: none;
  }
  .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    font-weight: 700;
    font-size: 17px;
  }
`;
