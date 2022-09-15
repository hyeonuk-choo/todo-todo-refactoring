import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import "../../style/Calendar.css";
import moment from "moment";
import styled from "styled-components";

const Calendar = () => {
  const marks = [
    { achievementRate: 15, addDate: "2022-09-01" },
    { achievementRate: 25, addDate: "2022-09-02" },
    { achievementRate: 55, addDate: "2022-09-03" },
    { achievementRate: 90, addDate: "2022-09-04" },
    { achievementRate: 23, addDate: "2022-09-05" },
    { achievementRate: 30, addDate: "2022-09-06" },
    { achievementRate: 55, addDate: "2022-09-07" },
    { achievementRate: 49, addDate: "2022-09-08" },
    { achievementRate: 70, addDate: "2022-09-09" },
    { achievementRate: 27, addDate: "2022-09-10" },
    { achievementRate: 100, addDate: "2022-09-11" },
  ];

  return (
    <StDiv>
      <ReactCalendar
        // onChange={onChange}
        // value={value}
        locale='en-GB'
        calendarType='US'
        tileClassName={({ date, view }) => {
          if (
            marks.find((x) => {
              if (
                x.addDate === moment(date).format("YYYY-MM-DD") &&
                x.achievementRate < 25
              ) {
                return x;
              }
            })
          ) {
            return "highlight1";
          }
          if (
            marks.find((x) => {
              if (
                x.addDate === moment(date).format("YYYY-MM-DD") &&
                x.achievementRate >= 25 &&
                x.achievementRate < 50
              ) {
                return x;
              }
            })
          ) {
            return "highlight2";
          }
          if (
            marks.find((x) => {
              if (
                x.addDate === moment(date).format("YYYY-MM-DD") &&
                x.achievementRate >= 50 &&
                x.achievementRate < 75
              )
                return x;
            })
          ) {
            return "highlight3";
          }
          if (
            marks.find((x) => {
              if (
                x.addDate === moment(date).format("YYYY-MM-DD") &&
                x.achievementRate >= 75
              )
                return x;
            })
          ) {
            return "highlight4";
          }
        }}
      />
    </StDiv>
  );
};

export default Calendar;

const StDiv = styled.div`
  .highlight1 {
    background: #b9ffb7;
  }

  .highlight2 {
    background: #5eff56;
  }

  .highlight3 {
    background: #0ced00;
  }

  .highlight4 {
    background: #159f00;
  }

  .react-calendar {
    width: 400px;
    max-width: 100%;
    background-color: rgb(255, 255, 255); /*전체 백그라운드 컬러*/
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #704444;
  }
  abbr[title] {
    text-decoration: none;
  }
  /* .react-calendar__month-view__days__day--weekend {
    color: #2e32ff; //주말 날짜 색깔
  } */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8faf8; /*호버시 백그라운드*/
    color: #c4c716; /*호버시 날짜글씨 컬러*/
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #be75fa; /*오늘 날짜*/
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb; /*오늘 날짜*/
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #1ddf16;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #1ddf16;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1ddf16;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #1ddf16;
    border-radius: 0;
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #1ddf16;
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #1ddf16;
    color: white;
  }
`;