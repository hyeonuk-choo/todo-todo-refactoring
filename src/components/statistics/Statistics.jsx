// 라이브러리
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
// 이미지
import trophy from "../../assets/img/mainpage/trophy.svg";
import info from "../../assets/img/mainpage/info.svg";
// 컴포넌트
import LineChart from "./LineChart";
import Navbar from "../utils/Navbar";

const Statistics = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const nickname = localStorage.getItem("nickname");

  const dispatch = useDispatch();
  const [modalView, setModalView] = useState(false);
  const [modal, setModal] = useState(null);
  const [month, setMonth] = useState(null);

  const modalToggleHandler = (parameter) => {
    setModalView(!modalView);
    setModal(parameter);
  };

  useEffect(() => {}, []);

  return (
    <StContainer>
      <div id="header">
        <span>통계</span>
      </div>
      <div id="body">
        <StTopSubjectDiv>
          <div className="my-score">나의 점수</div>
          <img
            className="my-score-img"
            src={info}
            onClick={() => modalToggleHandler("score")}
            alt="infoImg"
          />
        </StTopSubjectDiv>
        <StScoreBoxContainer>
          <StScoreBoxDiv>
            <div>주간점수</div>
            <div>
              {null}점 / <span>{null}위</span>
            </div>
          </StScoreBoxDiv>
          <StScoreBoxDiv>
            <div>월간점수</div>
            <div>
              {null}점 / <span>{null}위</span>
            </div>
          </StScoreBoxDiv>
        </StScoreBoxContainer>
        <StScoreChangeBoxDiv>
          <div className="weekText">
            <div>
              <span className="lastweek">저번 주</span>
              <span className="thisweek"> 이번 주</span>
            </div>
            <p className="change-weekRank"> 주간 랭킹 점수 변화</p>
          </div>

          <StBarchartBox>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "25px",
                marginRight: "16px",
              }}
            >
              <div className="barBox">
                <p className="lastScore">{null}</p>
                <StLastWeekChart height={parseInt(0)}></StLastWeekChart>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "25px",
              }}
            >
              <div className="barBox">
                <p className="thisScore">{null}</p>
                <StThisWeekChart height={parseInt(0)}></StThisWeekChart>
              </div>
            </div>
          </StBarchartBox>
        </StScoreChangeBoxDiv>

        <StThisWeekStatus>
          <div>{null}</div>
        </StThisWeekStatus>

        <StTopSubjectDiv>
          <div className="weekRank">
            <div>주간 랭킹 점수</div>
            <img
              src={info}
              onClick={() => modalToggleHandler("rank")}
              alt="infoImg"
            />
          </div>
        </StTopSubjectDiv>
        {/* <LineChart /> */}
      </div>

      {/* ------------- 모달창 ------------ */}

      {/* ---------- 네비게이션바 --------- */}
      <Navbar statistics={true} />
    </StContainer>
  );
};
export default Statistics;

const StContainer = styled.div`
  height: 100%;
  width: 100%;

  overflow: auto;
  box-sizing: border-box;
  -ms-overflow-style: none;

  #header {
    height: 10vh;
    display: flex;
    align-items: center;
    background-color: #ffff;
    border-bottom: 1px solid #f1f3f5;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 3vh;
    color: black;
    padding-left: 1.5rem;
  }

  #body {
    height: 80vh;
  }
`;

const StTopSubjectDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  & .my-score {
    padding-left: 22px;
    padding-top: 18px;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    font-weight: bold;
    color: #111;
  }

  & .my-score-img {
    width: 17.5px;
    height: 17.5px;
    padding-left: 7.25px;
    padding-top: 22.25px;
    color: #d7d5d5;
  }

  & .weekRank {
    padding-top: 29px;
    padding-bottom: 16px;
    padding-left: 22px;
    display: flex;
    gap: 7.25px;
    font-size: 20px;
    line-height: 26px;
    font-weight: 600;
  }

  & .todoRate {
    padding-top: 40px;
    padding-bottom: 16px;
    padding-left: 22px;
    display: flex;
    gap: 7.25px;
    font-size: 20px;
    line-height: 26px;
    font-weight: 600;
  }
`;

const StScoreBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 22px 18px 22px;
  gap: 16px;
  width: calc(100%-44px);
  box-sizing: border-box;
`;

const StScoreBoxDiv = styled.div`
  flex: 1;
  height: 90px;
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 21px;
  box-sizing: border-box;
  margin: 0;

  & div {
    height: auto;
    color: #111;
    font-size: 15px;
    font-weight: 500;
    line-height: 17px;
    & span {
      color: #ff7b00;
    }
  }
`;

const StScoreChangeBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 0 22px;
  width: calc(100%-44px);
  box-sizing: border-box;
  height: 90px;
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 12px;
  padding-left: 22px;

  & div {
    width: 100%;

    span {
      color: #111111;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
    }

    p {
      display: inline-block;
      margin: 0;
      color: #111111;
      font-size: 15px;
      line-height: 24px;
      font-weight: 500;
    }
  }
`;

const StBarchartBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 24px;

  & .barBox {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  & div {
    p {
      width: 100%;
      text-align: center;
      font-size: 15px;
      font-weight: 600;
      line-height: 17px;
    }

    p.lastScore {
      color: #d7d5d5;
    }

    p.thisScore {
      color: #ff7b00;
    }
  }
`;

const StThisWeekStatus = styled.div`
  margin: 12px 22px 0 22px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;

  & div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px;
    // 글씨 사이즈때문에 width값 조금 키움
    width: 190px;
    height: 28px;
    background: #ffe9d5;
    border-radius: 49px;
    box-sizing: border-box;
    margin: 0;
    font-size: 14px;
    color: #ff7b00;
    font-weight: 600;
  }
`;

const StLastWeekChart = styled.div`
  width: 25px;
  height: ${(props) => `${props.height}%` || "3px"};
  background: #d9d9d9;
  border-radius: 6px 6px 0px 0px;
`;
const StThisWeekChart = styled.div`
  width: 25px;
  height: ${(props) => `${props.height}%` || "3px"};
  background: #ff7b00;
  border-radius: 6px 6px 0px 0px;
`;
