import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import info from "../../assets/img/mainpage/info.svg";
import trophy from "../../assets/img/mainpage/trophy.svg";
import bigTrophy from "../../assets/img/mainpage/bigTrophy.svg";
import plannerCntSvg from "../../assets/img/mainpage/plannerCntSvg.svg";
import todoCntSvg from "../../assets/img/mainpage/todoCntSvg.svg";
import Modal from "../utils/Modal";
import InfiniteScroll from "./InfiniteScroll";
import InfiniteScrollMonth from "./InfiniteScrollMonth";
import {
  __getThisMonthRate,
  __getTotalRate,
  __getTotalTodo,
} from "../../redux/modules/mainSlice";
import { __getMyInfo } from "../../redux/modules/mySlice";
import Dday from "./Dday";
import Navbar from "../utils/Navbar";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getMyInfo());
    // dispatch(__getTotalRate());
  }, []);

  const { userinfo } = useSelector((state) => state.my);

  const [toggleValue, setToggleValue] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // let nickname = localStorage.getItem("nickname");

  const onClickWeekly = () => {
    setToggleValue(true);
  };

  const onClickMonth = () => {
    setToggleValue(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <StRootDiv>
      <StSubDiv1>
        <div className="mainTopSentenceBox">
          <span>투두투두</span>
          <div className="mainTopSentence">
            {userinfo?.nickname === undefined
              ? "닉네임을 설정해주세요^^"
              : `${userinfo.nickname}님, 오늘도 힘내세요!`}
          </div>
        </div>

        <Dday />
      </StSubDiv1>
      <StSubDiv2>
        <div className="achievementBox">
          <div className="nicknamePart">
            {userinfo?.nickname === undefined
              ? "닉네임이 미설정 상태입니다."
              : `${userinfo.nickname}님의 기록`}
          </div>
          <div className="todoCnt">
            <img src={plannerCntSvg} alt="todoCntSvgImg" />
            <span>
              {userinfo?.totalCnt === undefined ? 0 : userinfo?.totalCnt}
            </span>
            <img src={todoCntSvg} alt="todoCntSvgImg" />
            <span>
              {userinfo?.completeCnt === undefined ? 0 : userinfo?.completeCnt}
            </span>
          </div>
        </div>
        <div className="achievementSecondBox">
          <div className="thisMonthGauge">
            <div className="gaugeText">
              이번달 플래너 달성률
              <div>{Math.round(userinfo.achievementRate?.thisMonthRate)} %</div>
            </div>

            <StProgressBarBox>
              <StProgressBar
                width={
                  userinfo.achievementRate?.thisMonthRate === undefined
                    ? 0
                    : Math.round(userinfo.achievementRate?.thisMonthRate)
                }
              ></StProgressBar>
            </StProgressBarBox>
          </div>

          <div className="totalGauge">
            <div className="gaugeText">
              플래너 총 달성률
              <div>{Math.round(userinfo.achievementRate?.totalRate)} %</div>
            </div>

            <StProgressBarBox>
              <StProgressBar
                width={
                  userinfo.achievementRate?.totalRate === undefined
                    ? 0
                    : Math.round(userinfo.achievementRate?.totalRate)
                }
              ></StProgressBar>
            </StProgressBarBox>
          </div>
        </div>
      </StSubDiv2>

      {/* ------------- 랭킹 --------------*/}
      <StSubDiv3>
        <StRankingPhrases>
          <img src={trophy} alt="trophyImg" />
          <span>랭킹</span>
          <img
            src={info}
            id="exclamationMark"
            onClick={openModal}
            alt="infoImg"
          />
        </StRankingPhrases>

        <StRankingBtnBox>
          {toggleValue ? (
            <>
              <StWeeklyRankingBtn onClick={onClickWeekly}>
                <span>주간 랭킹</span>
              </StWeeklyRankingBtn>
              <StMonthRankingBtn2nd onClick={onClickMonth}>
                <span>월간 랭킹</span>
              </StMonthRankingBtn2nd>
            </>
          ) : (
            <>
              <StWeeklyRankingBtn2nd onClick={onClickWeekly}>
                <span>주간 랭킹</span>
              </StWeeklyRankingBtn2nd>
              <StMonthRankingBtn onClick={onClickMonth}>
                <span>월간 랭킹</span>
              </StMonthRankingBtn>
            </>
          )}
        </StRankingBtnBox>
      </StSubDiv3>
      <StSubDiv4 className="scrollBox">
        {toggleValue ? <InfiniteScroll /> : <InfiniteScrollMonth />}
      </StSubDiv4>
      <Navbar home={true} />

      {/* -------------- 모달창 ---------------*/}
      <Modal
        visible={modalVisible}
        closable={true}
        maskClosable={true}
        onClose={closeModal}
        width="290px"
        height="320px"
        radius="48px"
        top="40%"
        backgroundcolor="rgba(17, 17, 17, 0.6)"
      >
        <StModalTop>
          <span>투두투두 랭킹 산정 방법</span>
        </StModalTop>

        <StModalBottom>
          <StModalExplainDiv>
            <span>주간/월간 랭킹</span>
            <img src={bigTrophy} alt="bigTrophyImg" />
            <div>
              주간 랭킹은 일주일/한달 간 측정한 투두 달성률 평균이 높은 순으로
              순위가 결정됩니다.
            </div>
          </StModalExplainDiv>
        </StModalBottom>

        <StCloseBtnContainer>
          <StModalCloseBtn onClick={closeModal}>확인</StModalCloseBtn>
        </StCloseBtnContainer>
      </Modal>
    </StRootDiv>
  );
};

export default Main;

const StRootDiv = styled.div`
  overflow: hidden;
`;

const StSubDiv1 = styled.div`
  height: 12vh;
  box-sizing: border-box;
  padding: 2.5vh 0 1vh 0;
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  span {
    color: #ff7b00;
    font-weight: 700;
    /* font-size: 14px; */
    line-height: 16px;
  }

  .mainTopSentenceBox {
    padding-left: 0.4rem;
    font-size: 3vh;
  }

  .mainTopSentence {
    margin-top: 8px;
    font-weight: 600;
    font-size: 2.2vh;
  }
`;

const StSubDiv2 = styled.div`
  box-sizing: border-box;
  height: 27vh;
  width: 90%;
  margin: 0 auto 0 auto;
  box-shadow: 0px 4px 15px 0px rgba(17, 17, 17, 0.05);
  border-radius: 16px;
  background-color: white;

  .achievementBox {
    box-sizing: border-box;
    height: 6vh;
    width: 100%;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px 12px 0 0;
    background-color: #ffe9d5;

    div {
      font-size: 2vh;
      color: #ff7b00;
    }

    .nicknamePart {
      margin-left: 1rem;
    }

    .todoCnt {
      display: flex;
      gap: 0.3rem;
      margin-right: 1rem;
    }
  }

  .achievementSecondBox {
    box-sizing: border-box;
    font-size: 2.1vh;
    height: 20vh;
    width: 100%;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15%;

    .thisMonthGauge {
      width: 90%;
    }

    .totalGauge {
      width: 90%;
    }

    .gaugeText {
      margin-bottom: 1vh;
      display: flex;
      justify-content: space-between;
    }
  }
`;

const StSubDiv3 = styled.div`
  box-sizing: border-box;
  height: 13vh;
`;

const StSubDiv4 = styled.div`
  height: 38vh;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 1vh;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(255, 233, 213);
    border-radius: 100px;
  }
`;

const StProgressBarBox = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: #ececec;
`;

const StProgressBar = styled.div`
  ${({ width }) => {
    if (width === 0) {
      return css`
        width: ${width}%;
        background-color: none;
      `;
    } else if (width < 33) {
      return css`
        width: ${width}%;
        background-color: #d34c4c;
      `;
    } else if (width < 66) {
      return css`
        width: ${width}%;
        background-color: #ffdb80;
      `;
    } else if (width <= 100) {
      return css`
        width: ${width}%;
        background-color: #74e272;
      `;
    }
  }};
  height: 2vh;
  border-radius: 10px;
  transition: all 1.5s;
`;

const StRankingPhrases = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fafafa;
  padding: 0 0 1vh 2.4rem;

  img {
    padding-top: 1rem;
    background-color: #fafafa;
    margin-left: 0;
    height: 2.7vh;
  }

  #exclamationMark:hover {
    cursor: pointer;
  }

  span {
    box-sizing: border-box;
    padding-top: 1rem;
    margin-left: 7px;
    margin-right: 7px;
    font-weight: 600;
    background-color: #fafafa;
    font-size: 2.5vh;
  }
`;

const StRankingBtnBox = styled.div`
  font-weight: 600;
  background-color: #fafafa;
  padding: 0 0 0 2rem;
  height: 5vh;

  button {
    font-family: "Gowun Dodum", sans-serif;
    font-size: 1.7vh;
    cursor: pointer;
  }
`;

const StWeeklyRankingBtn = styled.button`
  width: 80px;
  height: 100%;
  background: #ff8f27;
  border: 1px solid #ff8f27;
  border-radius: 44px;
  span {
    color: white;
  }
`;

const StWeeklyRankingBtn2nd = styled.button`
  width: 80px;
  height: 100%;
  background: #ffffff;
  border: 1px solid #d7d5d5;
  border-radius: 44px;
  span {
    color: #9f9e9e;
  }
`;

const StMonthRankingBtn = styled.button`
  width: 80px;
  height: 100%;
  margin-left: 6px;
  background: #ff8f27;
  border: 1px solid #ff8f27;
  border-radius: 44px;
  span {
    color: white;
  }
`;

const StMonthRankingBtn2nd = styled.button`
  width: 80px;
  height: 100%;
  margin-left: 6px;
  background: #ffffff;
  border: 1px solid #d7d5d5;
  border-radius: 44px;
  span {
    color: #9f9e9e;
  }
`;

const StModalTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85px;
  border-radius: 48px 48px 0 0;
  background-color: #ffe9d5;
  color: #ff7b00;
  font-weight: 600;
  font-size: 17px;
`;

const StModalBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 12em;
  margin: 5% 0 0 5%;
  span {
    font-size: 16px;
  }
`;
const StModalExplainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  span {
    font-weight: bold;
  }

  div {
    width: 83%;
    text-align: center;
  }
`;

const StCloseBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 8rem;
`;

const StModalCloseBtn = styled.button`
  display: flex;
  justify-content: center;
  width: 93px;
  border: none;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  padding: 1em;
`;
