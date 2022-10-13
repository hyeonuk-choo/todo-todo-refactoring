import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import info from "../../assets/img/mainpage/info.svg";
import HeatmapSample from "./HeatmapSample";
import LineChart from "./LineChart";
import Modal from "../utils/Modal";
import trophy from "../../assets/img/mainpage/trophy.svg";
import {
  __getRankScoreData,
  __getLineChartData,
} from "../../redux/modules/statisticsSlice";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Statistics = () => {
  const nickname = localStorage.getItem("nickname");

  const dispatch = useDispatch();
  const [modalView, setModalView] = useState(false);
  const [modal, setModal] = useState(null);
  const [month, setMonth] = useState(null);

  const { rankScoreData } = useSelector((state) => state.statistics);
  const modalToggleHandler = (parameter) => {
    setModalView(!modalView);
    setModal(parameter);
  };

  let lastweekScore = rankScoreData[0].score;

  let lastweekScore2 = lastweekScore === 0 ? 0 : lastweekScore / 7;

  let weeklyScore = rankScoreData[1].score;
  let weeklyScore2 = weeklyScore === 0 ? 0 : weeklyScore / 7;

  let monthlyScore =
    month !== null
      ? (rankScoreData[2].score / month) * 10
      : rankScoreData[2].score;
  let monthlyScore2 = isNaN(monthlyScore) ? 0 : monthlyScore;

  let weeklyRank = isNaN(rankScoreData[1].ranking)
    ? 0
    : rankScoreData[1].ranking;
  let monthlyRank = isNaN(rankScoreData[2].ranking)
    ? 0
    : rankScoreData[2].ranking;

  const monthFunc = async () => {
    const { data } = await axios.get(`${BASE_URL}/month`);
    setMonth(() => data);
  };

  useEffect(() => {
    monthFunc();
  }, []);

  useEffect(() => {
    dispatch(__getRankScoreData(nickname));
  }, []);

  return (
    <StContainer>
      <StHeader>
        <span>통계</span>
      </StHeader>
      <StBackground>
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
              {weeklyScore2 === 0 ? "-" : weeklyScore2.toFixed(2)}점 /{" "}
              <span>{weeklyRank === 0 ? "-" : weeklyRank}위</span>
            </div>
          </StScoreBoxDiv>
          <StScoreBoxDiv>
            <div>월간점수</div>
            <div>
              {monthlyScore2 === 0 ? "-" : monthlyScore2.toFixed(2)}점 /{" "}
              <span>{monthlyRank === 0 ? "-" : monthlyRank}위</span>
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
                <p className="lastScore">{lastweekScore2.toFixed(0)}</p>
                <StLastWeekChart
                  height={parseInt(lastweekScore2.toFixed(2))}
                ></StLastWeekChart>
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
                <p className="thisScore">{weeklyScore2.toFixed(0)}</p>
                <StThisWeekChart
                  height={parseInt(weeklyScore2.toFixed(0))}
                ></StThisWeekChart>
              </div>
            </div>
          </StBarchartBox>
        </StScoreChangeBoxDiv>

        <StThisWeekStatus>
          <div>
            {weeklyScore2 === 0
              ? "이번 주도 시작해볼까요"
              : lastweekScore2 > 0 && lastweekScore2 * 0.5 > weeklyScore2
                ? "이번 주도 화이팅이에요"
                : lastweekScore2 * 0.5 < weeklyScore2 &&
                  lastweekScore2 * 0.9 > weeklyScore2
                  ? "저번 주의 절반 이상 왔어요!"
                  : lastweekScore2 * 0.9 < weeklyScore2 &&
                    lastweekScore2 > weeklyScore2
                    ? "곧 저번 주 점수를 넘기겠어요!"
                    : lastweekScore2 === weeklyScore2
                      ? "저번 주 점수랑 동점이에요!"
                      : lastweekScore2 < weeklyScore2
                        ? "저번 주 점수를 넘으셨어요!!"
                        : null}
          </div>
        </StThisWeekStatus>

        <StTopSubjectDiv>
          <div className="weekRank">
            <div cl>주간 랭킹 점수</div>
            <img
              src={info}
              onClick={() => modalToggleHandler("rank")}
              alt="infoImg"
            />
          </div>
        </StTopSubjectDiv>
        <LineChart />
        <StTopSubjectDiv>
          <div className="todoRate">
            <div>나의 투두 달성률</div>
            <img
              src={info}
              onClick={() => modalToggleHandler("heatMap")}
              alt="infoImg"
            />
          </div>
        </StTopSubjectDiv>
        <div style={{ paddingBottom: "20px" }}>
          <HeatmapSample />
        </div>
      </StBackground>

      {/* ------------------- 모달창 ------------------ */}
      {modalView && (
        <Modal
          visible={modalView}
          closable={true}
          maskClosable={true}
          onClose={modalToggleHandler}
          width="350px"
          height={
            modal === "score" ? "22em" : modal === "rank" ? "20em" : "21em"
          }
          radius="48px"
          top="40%"
          backgroundcolor="#11111180 "
        >
          <StModalTop>
            {modal === "score" ? (
              <span>나의 점수</span>
            ) : modal === "rank" ? (
              <span>주간 랭킹 점수</span>
            ) : (
              <span>나의 투두 달성률</span>
            )}
          </StModalTop>

          <StModalBottom>
            {modal === "score" ? (
              <>
                <StModalExplainTop>
                  <span
                    style={{
                      margin: "8% 0 5% 0",
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "3%",
                    }}
                  >
                    <img src={trophy} alt="trophyImg" /> 주간점수
                  </span>
                  <div>
                    이번주에 쌓은 점수입니다.
                    <br />
                    (이번주 플래너 수 * 플래너별 달성률)
                  </div>
                </StModalExplainTop>
                <StModalExplainBottom>
                  <span>
                    <img src={trophy} alt="trophyImg" /> 월간 점수
                  </span>
                  <div>
                    이번 달에 쌓은 점수입니다.
                    <br />
                    (이번 달 플래너 수 * 플래너별 달성률)
                  </div>
                </StModalExplainBottom>
              </>
            ) : modal === "rank" ? (
              <StModalExplainTop>
                <span
                  style={{
                    marginTop: "8%",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "3%",
                  }}
                >
                  {/* <img src={trophy} /> */}
                  주간 랭킹 점수란?
                </span>
                <div style={{ marginTop: "3%" }}>
                  아래 그래프는 매주 요일별 누적 점수 추이를 보여줍니다.
                  {/* <span style={{ color: "#D34C4C", fontWeight: "bold" }}>
                    {" "}
                    붉은색
                  </span>
                  은 상위랭커, */}
                  <div style={{ marginTop: "10px", width: "360px" }}>
                    <span style={{ color: "#618AF2", fontWeight: "bold" }}>
                      파란색
                    </span>
                    선은 유저님의 이번주 점수 추이입니다.
                  </div>
                </div>
              </StModalExplainTop>
            ) : (
              <StModalExplainTop>
                <StTemp>
                  <span>낮음</span>
                  <div style={{ backgroundColor: "#F3F3F3" }}></div>
                  <div style={{ backgroundColor: "rgba(255,143,39,.2)" }}></div>
                  <div style={{ backgroundColor: "rgba(255,143,39,.4)" }}></div>
                  <div style={{ backgroundColor: "rgba(255,143,39,.6)" }}></div>
                  <div style={{ backgroundColor: "rgba(255,143,39,.8)" }}></div>
                  <div style={{ backgroundColor: "rgba(255,143,39,1)" }}></div>
                  <span>높음</span>
                </StTemp>

                <div>
                  <div> 나의 투두 달성률은 주차별(가로축), </div>
                  요일별(세로축) 달성률에 따라 색깔의 옅고 진함을 표시합니다.
                  <div
                    style={{
                      marginTop: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    달성률이 높을 수록 색깔이 진해집니다.
                  </div>
                </div>
              </StModalExplainTop>
            )}
            <StModalCloseDiv onClick={modalToggleHandler}>닫기</StModalCloseDiv>
          </StModalBottom>
        </Modal>
      )}
    </StContainer>
  );
};
export default Statistics;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: "SUIT-Regular", sans-serif;
  overflow: hidden auto;
  box-sizing: border-box;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StHeader = styled.div`
  display: flex;
  align-items: flex-end;
  height: 72px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #f1f3f5;
  box-sizing: border-box;

  & span {
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
    color: #111;
    margin-left: 22px;
    margin-bottom: 15px;
  }
`;

const StTemp = styled.div`
  width: 100%;
  height: 80px;
  margin: 2% auto;
  /* background-color: gray; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  div {
    width: 25px;
    height: 25px;
    border-radius: 4px;
    /* background-color: #c2ffbe; */
  }
  span {
    font-weight: 700;
    font-size: 15px;
  }
`;
const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #f1f3f5;
`;

const StBackground = styled.div``;

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
  font-family: "SpoqaHanSansNeo-Regular", sans-serif;
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

// ----------- 모달 -------------

const StModalTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 85px;

  border-radius: 48px 48px 0 0;
  background-color: #ffe9d5;
  color: #ff7b00;
  font-weight: bold;
  font-size: 1.2em;
`;

const StModalBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 70%;
  width: 80%;
  margin: auto;
  gap: 1.3em;

  div {
  }
`;
const StModalExplainTop = styled.div``;

const StModalExplainBottom = styled.div`
  span {
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3%;
  }
  div {
    margin-top: 5%;
  }
`;

const StCloseBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StModalCloseDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 80%;
  height: 2em;
  margin: 0 auto;

  border: none;
  background-color: none;
  color: #ff8f27;
  font-weight: bold;
`;
