// 라이브러리
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
// 이미지
import largeTrophy from "../../assets/img/mainpage/bigTrophy.svg";
import plannerCntSvg from "../../assets/img/mainpage/plannerCntSvg.svg";
import todoCntSvg from "../../assets/img/mainpage/todoCntSvg.svg";
import info from "../../assets/img/mainpage/info.svg";
import smallTrophy from "../../assets/img/mainpage/trophy.svg";
// 컴포넌트
import InfiniteScroll from "./InfiniteScroll";
import InfiniteScrollMonth from "./InfiniteScrollMonth";
import ModalBasic from "../utils/ModalBasic";
import Navbar from "../utils/Navbar";
import Dday from "./Dday";
import { getUserInfo } from "../../redux/modules/mainSlice";

const Main = () => {
  const { userInfo } = useSelector((state) => state.main); // mainSlice
  const [toggleValue, setToggleValue] = useState(true);
  const [modalWindow, setModalWindow] = useState(false);
  const dispatch = useDispatch();

  // 비동기통신 로직을 왜 Thunk함수를 Slice에 정의해서 써야하는가? 에 대한 의문으로 비동기 통신 로직을 UI컴포넌트에 바로 작성해보았고 비동기통신 로직을 UI컴포넌트에 구현 해도 동작에 이상없으나, 다른 컴포넌트에서 해당state를 구독할 때, 새로고침시 이슈발생

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const onClickWeekly = () => {
    setToggleValue(true);
  };

  const onClickMonth = () => {
    setToggleValue(false);
  };

  return (
    <StRootDiv>
      <StSubDiv1>
        <div className="mainTopSentenceBox">
          <span>투두투두</span>
          <div className="mainTopSentence">
            {userInfo?.nickname === undefined
              ? "닉네임을 설정해주세요^^"
              : `${userInfo.nickname}님, 오늘도 힘내세요!`}
          </div>
        </div>

        <Dday />
      </StSubDiv1>
      <StSubDiv2>
        <div className="achievementBox">
          <div className="nicknamePart">
            {userInfo?.nickname === undefined
              ? "닉네임이 미설정 상태입니다."
              : `${userInfo.nickname}님의 기록`}
          </div>
          <div className="todoCnt">
            <img src={plannerCntSvg} alt="todoCntSvgImg" />
            <span>{userInfo ? userInfo.totalCnt : 0}</span>
            <img src={todoCntSvg} alt="todoCntSvgImg" />
            <span>{userInfo ? userInfo.completeCnt : 0}</span>
          </div>
        </div>
        <div className="achievementSecondBox">
          <div className="thisMonthGauge">
            <div className="gaugeText">
              이번달 플래너 달성률
              <div>{Math.round(userInfo.achievementRate?.thisMonthRate)} %</div>
            </div>

            <StProgressBarBox>
              <StProgressBar
                width={
                  userInfo.achievementRate
                    ? Math.round(userInfo.achievementRate.thisMonthRate)
                    : 0
                }
              ></StProgressBar>
            </StProgressBarBox>
          </div>

          <div className="totalGauge">
            <div className="gaugeText">
              플래너 총 달성률
              <div>{Math.round(userInfo.achievementRate?.totalRate)} %</div>
            </div>

            <StProgressBarBox>
              <StProgressBar
                width={
                  userInfo.achievementRate
                    ? Math.round(userInfo.achievementRate.totalRate)
                    : 0
                }
              ></StProgressBar>
            </StProgressBarBox>
          </div>
        </div>
      </StSubDiv2>

      {/* ------------- 랭킹 --------------*/}
      <StSubDiv3>
        <StRankingPhrases>
          <img src={smallTrophy} alt="smallTrophyImg" />
          <span>랭킹</span>
          <img
            src={info}
            id="exclamationMark"
            onClick={() => {
              setModalWindow(true);
            }}
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
      {modalWindow ? (
        <ModalBasic
          modalWidth={50 + "%"}
          modalHeight={40 + "%"}
          modalTop={(100 - 40) / 2 + "%"}
          modalLeft={25 + "%"}
          setModalWindow={setModalWindow}
          modalTitle="랭킹 산정 방법"
          modalImage={largeTrophy}
          modalContent="주간/월간 랭킹은 일주일/한달간 측정한 투두 달성률 누적합계가 높은 순으로 순위가 결정됩니다."
        />
      ) : null}
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
  // calc사용시 연산기호 양쪽 띄어쓰기(-마이너스 부호 유의)
  // Navbar 10vh도 계산
  height: calc(100vh - 12vh - 27vh - 13vh - 10vh);
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
  transition: 1.5s;
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
