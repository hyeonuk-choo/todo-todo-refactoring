import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { __getMainRank } from "../../redux/modules/mainSlice";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const InfiniteScroll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rankList, setRankList] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const { mainRankList } = useSelector((state) => state.main);
  const { error } = useSelector((state) => state.main);

  let nickname = localStorage.getItem("nickname");
  const targetRef = useRef(null);
  const [page, setPage] = useState(0);

  const checkIntersect = ([entry], observer) => {
    if (entry.isIntersecting) {
      dispatch(__getMainRank(page));
      observer.unobserve(entry.target);
      setPage((prev) => prev + 1);
    }
  };

  const allUserFunc = async () => {
    const arr = [];
    try {
      const { data } = await axios.get(`${BASE_URL}/member`);
      arr.push(...data);
    } catch (error) {
      console.log(error);
    }
    setAllUser(arr);
  };

  useEffect(() => {
    allUserFunc();
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(checkIntersect, {
      threshold: 0.5,
    });
    observer.observe(targetRef.current);
    return () => {
      observer && observer.disconnect();
    };
  }, [mainRankList]);

  return (
    <Stdiv>
      {mainRankList.length > 0 &&
        mainRankList.map((each) => (
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
                {/* 영상 찍은 후 쓸데없는 코드 줄이기 */}
                {allUser.filter((data) => data.nickname === each.nickname)
                  .length === 0 ? (
                  <StRankingProfile src={profileImgSvg} alt='profileImg' />
                ) : (
                  <StRankingProfile
                    src={
                      allUser.filter(
                        (data) => data.nickname === each.nickname
                      )[0].profileImage === ""
                        ? profileImgSvg
                        : allUser.filter(
                          (data) => data.nickname === each.nickname
                        )[0].profileImage
                    }
                    alt='profileImg'
                  />
                )}
                <StRankingNickname>{each.nickname}</StRankingNickname>
              </div>
            </div>

            <StRankingScore>
              {(each.achievementRate / 7).toFixed(2)}
            </StRankingScore>
          </StRankingBox>
        ))}
      <StRefDiv ref={targetRef}></StRefDiv>
    </Stdiv>
  );
};

export default InfiniteScroll;

const Stdiv = styled.div`
  background-color: #fafafa;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 100%;
  /* background-color: gray; */
  /* height: 35vh;  */
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

  margin-bottom: 16px;
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

const StRankingNickname = styled.div`
  margin-left: 8px;
  font-weight: 500;
  font-size: 16px;
  font-family: "SUIT-Regular";
`;

const StRankingScore = styled.div`
  font-weight: 700;
  color: #9f9e9e;
  margin-right: 1em;
`;
