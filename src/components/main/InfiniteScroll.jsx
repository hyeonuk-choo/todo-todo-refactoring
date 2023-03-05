import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const InfiniteScroll = () => {
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState([]);

  let nickname = localStorage.getItem("nickname");
  const targetRef = useRef(null);
  const page = useRef(0);

  const allUserFunc = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/rank/week?page=${page.current}`
      );
      console.log(data);
      console.log(page.current);

      setAllUser((prev) => prev.concat(data));
    } catch (error) {}
  };

  // useEffect(() => allUserFunc(), []); // 주의: useEffect 라우팅후 unmount시 error발생, {}블록 생략한 한줄짜리는 return 반환값을 뜻함. useEffect에서 return 값은 unmount시 동작하는 clean-up함수다.

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        allUserFunc();
        page.current += 1;
      }
    });
  };

  useEffect(() => {
    let observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });
    observer.observe(targetRef.current);
    console.log(targetRef.current);
  }, []);

  // console.log(targetRef.current);

  return (
    <Stdiv>
      {allUser.length > 0 &&
        allUser.map((each) => (
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
            <div className="firstInner">
              <StRankingNumber>{each.rank}</StRankingNumber>
              <div>
                {allUser.filter((data) => data.nickname === each.nickname)
                  .length === 0 ? (
                  <StRankingProfile src={profileImgSvg} alt="profileImg" />
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
                    alt="profileImg"
                  />
                )}
                <StRankingNickname>{each.nickname}</StRankingNickname>
              </div>
            </div>

            <div className="secondInner">{each.achievementScore}</div>
          </StRankingBox>
        ))}
      {<StRefDiv ref={targetRef}></StRefDiv>}
    </Stdiv>
  );
};

export default InfiniteScroll;

const Stdiv = styled.div`
  padding: 1rem 1rem 0 1rem;
  height: 36vh;
`;
const StRefDiv = styled.div`
  height: 3vh;
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
  height: 8vh;

  background: #ffffff;

  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 19px;

  margin-bottom: 1.2vh;
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

  .secondInner {
    color: #9f9e9e;
    margin-right: 1em;
    font-weight: 700;
    font-size: 2vh;
  }
`;

const StRankingNumber = styled.div`
  font-size: 2.3vh;
  font-weight: 700;
  color: #ff7b00;
  margin-left: 1em;
`;

const StRankingProfile = styled.img`
  width: 6vh;
  height: 6vh;
  background-color: #eee;
  border-radius: 100px;
  object-fit: cover;
`;

const StRankingNickname = styled.div`
  margin-left: 8px;
  font-weight: 500;
  font-family: "SUIT-Regular";
  font-size: 2.1vh;
`;
