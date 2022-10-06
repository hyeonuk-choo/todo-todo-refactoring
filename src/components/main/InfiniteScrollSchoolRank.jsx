import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  __getMainRankMonthly,
  __getMainRankSchool,
} from "../../redux/modules/mainSlice";
import defaultProfile from "../../assets/img/defaultProfile.jpg";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import { useNavigate } from "react-router-dom";

let nickname = localStorage.getItem("nickname");

const InfiniteScrollSchoolRank = () => {
  const { mainRankListSchool } = useSelector((state) => state.main);
  const { error } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false); // 로드 true, false
  const [page, setPage] = useState(1); // 페이지

  const checkIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        dispatch(__getMainRankSchool(page));

        observer.unobserve(entry.target);
        setPage((prev) => prev + 1);
      }
    },
    [dispatch, isLoaded, page]
  );

  useEffect(() => {
    let observer;
    if (targetRef) {
      observer = new IntersectionObserver(checkIntersect, {
        threshold: 0.5,
      });
      observer.observe(targetRef.current);
    }
  }, [mainRankListSchool]);

  return (
    <Stdiv>
      {mainRankListSchool.map((each) => (
        <StRankingBox
          key={each.id}
          onClick={() => {
            if (nickname === each.nickname) {
              navigate(`/my`);
            } else {
              navigate(`/othermy/${each.nickname}`);
            }
          }}
        >
          <div>
            <StRankingNumber>{each.rank}</StRankingNumber>
            <div>
              <StRankingProfile src={profileImgSvg} />
              <StRankingNickname>{each.nickname}</StRankingNickname>
            </div>
          </div>

          <StRankingScore>{each.achievementRate.toFixed(2)}</StRankingScore>
        </StRankingBox>
      ))}
      <StRefDiv ref={targetRef}></StRefDiv>
    </Stdiv>
  );
};

export default InfiniteScrollSchoolRank;

const Stdiv = styled.div`
  background-color: #fafafa;
  padding-left: 1rem;
  padding-right: 1rem;
  /* background-color: gray; */
  /* height: 35vh; */
  /* overflow: scroll; */
`;
const StRefDiv = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StRankingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
  margin: auto;
  height: 70px;

  background: #ffffff;

  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 19px;

  margin-top: 12px;
  padding-left: 15px;
  padding-right: 15px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1.5em;

    & div {
      gap: 0.6em;
    }
  }
`;

const StRankingNumber = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #ff7b00;
  margin-left: 1em;
`;

const StRankingProfile = styled.img`
  width: 45px;
  height: 45px;
  background-color: #eee;
  border-radius: 100px;
  object-fit: cover;
`;

const StRankingNickname = styled.div``;

const StRankingScore = styled.div`
  font-weight: 700;
  color: #9f9e9e;
  margin-right: 1em;
`;
