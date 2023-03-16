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
                {null}점 / <span>{null}위</span>
              </div>
            </div>
            <div id="monthScore">
              <div>월간점수</div>
              <div>
                {null}점 / <span>{null}위</span>
              </div>
            </div>
          </div>
          <div className="firstGraph">
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
          </div>

          <div id="thisWeekStatus">
            <div>{null}</div>
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
          {/* <LineChart /> */}
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

    #upperPart {
      box-sizing: border-box;
      height: 50%;

      // 소제목
      .subTitle {
        box-sizing: border-box;
        padding: 3% 0 0 4%;
        gap: 1%;
        font-size: 2.3vh;
        font-weight: 600;

        height: 13%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

        p {
          margin: 0;
        }
        img {
          height: 80%;
        }
      }

      // 주간점수, 월간점수 컨테이너
      .scoreContainer {
        box-sizing: border-box;
        height: 40%;
        width: 100%;

        display: flex;
        align-items: center;

        justify-content: space-evenly;

        #weekScore {
          width: 45%;
          height: 80%;

          background: rgb(255, 255, 255);
          box-shadow: rgba(17, 17, 17, 0.05) 0px 4px 15px;
          border-radius: 12px;
        }

        #monthScore {
          width: 45%;
          height: 80%;

          background: rgb(255, 255, 255);
          box-shadow: rgba(17, 17, 17, 0.05) 0px 4px 15px;
          border-radius: 12px;
        }
      }

      // 첫번째, 막대그래프
      .firstGraph {
        box-sizing: border-box;
        height: 40%;
        width: 93%;
        margin: auto;

        display: flex;
        flex-direction: row;
        align-items: center;

        background: #ffffff;
        box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
        border-radius: 12px;

        div {
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
      }

      #thisWeekStatus {
        box-sizing: border-box;
        height: calc(100% - 13% - 40% - 40%);
        display: flex;
        width: 93%;
        margin: auto;
        justify-content: flex-end;
        box-sizing: border-box;

        div {
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
      }
    }

    #lowerPart {
      box-sizing: border-box;
      height: 50%;
    }
  }
`;

const StBarchartBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  .barBox {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  div {
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
