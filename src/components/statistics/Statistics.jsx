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
import { __getUserInfo } from "../../redux/modules/mainSlice";

const Statistics = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { userInfo } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [modalView, setModalView] = useState(false);
  const [modal, setModal] = useState(null);
  const [month, setMonth] = useState(null);
  // const nickname = localStorage.getItem("nickname");

  const modalToggleHandler = (parameter) => {
    setModalView(!modalView);
    setModal(parameter);
  };

  useEffect(() => {
    dispatch(__getUserInfo());
  }, []);

  const lastWeekRate = userInfo.achievementRate?.lastWeekRate;
  const thisWeekRate = userInfo.achievementRate?.thisWeekRate;

  return (
    <StRootDiv>
      <div id="header">
        <span>{userInfo.nickname}님의 통계</span>
      </div>
      <div id="body">
        {/* -- 바디의 상단 파트 -- */}
        <div id="upperPart">
          <div className="subTitle">
            <p>나의 점수</p>
            <img
              src={info}
              onClick={() => modalToggleHandler("score")}
              alt="infoImg"
            />
          </div>
          <div className="scoreContainer">
            <div id="weekScore">
              <div>주간점수</div>
              <div>
                {userInfo.weekScore?.weekScore}점&nbsp;/&nbsp;
                {userInfo.weekScore?.weekRank}위
              </div>
            </div>
            <div id="monthScore">
              <div>월간점수</div>
              <div>
                {userInfo.monthScore?.monthScore}점&nbsp;/&nbsp;
                {userInfo.monthScore?.monthRank}위
              </div>
            </div>
          </div>
          <div className="graphContainer">
            <div id="graphContainerText">
              <div className="change-weekRank"> 지난주대비 달성률 변화</div>
              <div>
                <span className="lastweek">지난주 : {lastWeekRate}</span>
                &nbsp;vs&nbsp;
                <span className="thisweek">이번주 : {thisWeekRate}</span>
              </div>
              <div id="thisWeekStatus">
                <div>
                  {thisWeekRate === 0
                    ? "이번주도 시작해볼까요?"
                    : lastWeekRate > 0 && lastWeekRate * 0.5 > thisWeekRate
                    ? "조금 더 열심히 해봅시다!"
                    : lastWeekRate * 0.5 < thisWeekRate &&
                      lastWeekRate * 0.9 > thisWeekRate
                    ? "저번주의 절반 이상 왔어요!"
                    : lastWeekRate * 0.9 < thisWeekRate &&
                      lastWeekRate > thisWeekRate
                    ? "곧 저번주 점수를 넘기겠어요!"
                    : lastWeekRate === thisWeekRate
                    ? "저번 주 점수랑 동점이에요!"
                    : lastWeekRate < thisWeekRate
                    ? "저번 주 점수를 넘었어요!"
                    : null}
                </div>
              </div>
            </div>

            <div id="fistBarChart">
              <div className="eachBarContainer">
                <div className="eachBar">
                  <StLastWeekChart height={lastWeekRate}>
                    <StChartScore className="lastScore">
                      {lastWeekRate}
                    </StChartScore>
                  </StLastWeekChart>
                </div>
              </div>

              <div className="eachBarContainer">
                <div className="eachBar">
                  <StThisWeekChart height={thisWeekRate}>
                    <StChartScore className="thisScore">
                      {thisWeekRate}
                    </StChartScore>
                  </StThisWeekChart>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -- 바디의 하단파트 -- */}
        <div id="lowerPart">
          <div className="subTitle">
            <div>주간 랭킹 점수</div>
            <img
              src={info}
              onClick={() => modalToggleHandler("rank")}
              alt="infoImg"
            />
          </div>
          <div id="chartContainer">
            <LineChart />
          </div>
        </div>
      </div>

      {/* ------------- 모달창 ------------ */}

      {/* ---------- 네비게이션바 --------- */}
      <Navbar statistics={true} />
    </StRootDiv>
  );
};
export default Statistics;

const StRootDiv = styled.div`
  box-sizing: border-box;

  #header {
    box-sizing: border-box;
    height: 10vh;
    background-color: #ffff;
    border-bottom: 1px solid #f1f3f5;
    font-weight: 600;
    font-size: 3vh;
    color: black;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  #body {
    height: 80vh;
    font-size: 2.2vh;

    #upperPart {
      box-sizing: border-box;
      height: 50%;

      // 소제목
      .subTitle {
        box-sizing: border-box;
        padding: 3% 0 0 4%;
        gap: 1%;

        font-weight: 600;
        height: 15%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

        p {
          margin: 0;
        }
        img {
          height: 60%;
        }
      }

      // 주간점수, 월간점수 컨테이너
      .scoreContainer {
        box-sizing: border-box;
        height: 35%;
        width: 100%;

        display: flex;
        align-items: center;

        justify-content: space-evenly;

        #weekScore {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 45%;
          height: 80%;

          background: rgb(255, 255, 255);
          box-shadow: rgba(17, 17, 17, 0.05) 0px 4px 15px;
          border-radius: 12px;
        }

        #monthScore {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 45%;
          height: 80%;

          background: rgb(255, 255, 255);
          box-shadow: rgba(17, 17, 17, 0.05) 0px 4px 15px;
          border-radius: 12px;
        }
      }

      // 첫번째, 막대그래프
      .graphContainer {
        box-sizing: border-box;
        height: calc(100% - 15% - 35%);
        width: 93%;
        margin: auto;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background: #ffffff;
        box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
        border-radius: 12px;

        #graphContainerText {
          width: 50%;
          height: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          div {
            height: calc(100% / 3);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          #thisWeekStatus {
            box-sizing: border-box;
            width: 100%;
            div {
              box-sizing: border-box;
              border-radius: 12px;
              padding: 1%;
              width: 90%;
              height: 100%;
              margin: 0;
              font-size: 2vh;
              color: #ff7b00;
              font-weight: 600;

              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              background: #ffe9d5;
            }
          }
        }

        #fistBarChart {
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-end;
          gap: 2rem;

          .eachBarContainer {
            width: 20%;
            height: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;

            .eachBar {
              width: 100%;
              height: 75%;
              background-color: transparent;

              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-end;
            }
          }
        }
      }
    }

    #lowerPart {
      box-sizing: border-box;
      height: 50%;

      .subTitle {
        box-sizing: border-box;
        padding: 3% 0 0 4%;
        gap: 1%;
        font-size: 2.2vh;
        font-weight: 600;
        height: 15%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

        p {
          margin: 0;
        }
        img {
          height: 60%;
        }
      }

      #chartContainer {
        box-sizing: border-box;
        height: calc(100% - 15%);
        width: 92%;
        margin: auto;
        padding: 2vh 0;
      }
    }
  }
`;

const StLastWeekChart = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => `${props.height}%` || "1%"};
  background: #d9d9d9;
  border-radius: 6px 6px 0px 0px;
`;
const StThisWeekChart = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => `${props.height}%` || "1%"};
  background: #ff7b00;
  border-radius: 6px 6px 0px 0px;
`;

const StChartScore = styled.div`
  position: absolute;
  top: -4vh;
  box-sizing: border-box;
  height: auto;
  width: 100%;
  margin: 0;
  text-align: center;
  font-weight: 600;

  &.lastScore {
    color: #d7d5d5;
  }

  &.thisScore {
    color: #ff7b00;
  }
`;
