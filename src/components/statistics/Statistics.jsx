// 라이브러리
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
// 이미지
import trophy from "../../assets/img/mainpage/trophy.svg";
import info from "../../assets/img/mainpage/info.svg";
import school from "../../assets/img/mainpage/school.svg";
import infoSvg from "../../assets/img/mainpage/info.svg";
// 컴포넌트
import LineChart from "./LineChart";
import Navbar from "../utils/Navbar";
import { getUserInfo } from "../../redux/modules/mainSlice";
import ModalBasic from "../utils/ModalBasic";

const Statistics = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { userInfo } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [scoreExplain, setScoreExplain] = useState(false);
  const [graphExplain, setGraphExplain] = useState(false);
  // const nickname = localStorage.getItem("nickname");

  const modalHandler = (param) => {
    if (param === "score") setScoreExplain(true);
    if (param === "graph") setGraphExplain(true);
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const lastWeekRate = userInfo.achievementRate
    ? userInfo.achievementRate?.lastWeekRate
    : 0;
  const thisWeekRate = userInfo.achievementRate
    ? userInfo.achievementRate?.thisWeekRate
    : 0;

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
              onClick={() => modalHandler("score")}
              alt="infoImg"
            />
          </div>
          <div className="scoreContainer">
            <div id="weekScore">
              <div>주간점수</div>
              <div className="scoreText">
                {userInfo.weekScore?.weekScore}점&nbsp;/&nbsp;
                {userInfo.weekScore?.weekRank}위
              </div>
            </div>
            <div id="monthScore">
              <div>월간점수</div>
              <div className="scoreText">
                {userInfo.monthScore?.monthScore}점&nbsp;/&nbsp;
                {userInfo.monthScore?.monthRank}위
              </div>
            </div>
          </div>
          <div className="graphContainer">
            <div id="graphContainerText">
              <div className="change-weekRank"> 지난주대비 달성률 변화</div>
              <div>
                <span className="lastweek">지난주 {lastWeekRate}</span>
                &nbsp;&nbsp;
                <span className="thisweek">이번주 {thisWeekRate}</span>
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
                    ? "곧 저번주 달성률을 넘기겠어요!"
                    : lastWeekRate === thisWeekRate
                    ? "저번주와 달성률이 같네요!"
                    : lastWeekRate < thisWeekRate
                    ? "저번주 달성률을 넘었어요!"
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
            <div>주간 그래프</div>
            <img
              src={info}
              onClick={() => modalHandler("graph")}
              alt="infoImg"
            />
          </div>
          <div id="chartContainer">
            <LineChart />
          </div>
        </div>
      </div>

      {/* ------------- 모달창 ------------ */}
      {scoreExplain ? (
        <ModalBasic
          setScoreExplain={setScoreExplain}
          modalWidth={50 + "%"}
          modalHeight={40 + "%"}
          modalTop={(100 - 40) / 2 + "%"}
          modalLeft={(100 - 50) / 2 + "%"}
          modalTitle="나의 점수란?"
          modalImage={school}
          modalContent="나의 점수는 주간점수/월간점수로 나뉘며, 지난주대비 금주의 달성률을 나타냅니다."
        />
      ) : null}
      {graphExplain ? (
        <ModalBasic
          setGraphExplain={setGraphExplain}
          modalWidth={50 + "%"}
          modalHeight={40 + "%"}
          modalTop={(100 - 40) / 2 + "%"}
          modalLeft={(100 - 50) / 2 + "%"}
          modalTitle="주간 그래프란?"
          modalImage={school}
          modalContent="주간 그래프는 금주 월요일~일요일까지의 달성률 추이를 나타냅니다."
        />
      ) : null}
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
    img {
      cursor: pointer;
    }

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

        & .scoreText {
          font-weight: 600;
        }

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

          & .lastweek {
            color: rgb(110 196 255);
          }

          & .thisweek {
            color: rgb(255, 123, 0);
          }

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
              font-weight: bold;

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
  background: rgb(110 196 255);
  border-radius: 6px 6px 0px 0px;
  transition: height 1.5s;
`;
const StThisWeekChart = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => `${props.height}%` || "1%"};
  background: #ff7b00;
  border-radius: 6px 6px 0px 0px;
  transition: height 1.5s;
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
    color: rgb(110 196 255);
  }

  &.thisScore {
    color: #ff7b00;
  }
`;
