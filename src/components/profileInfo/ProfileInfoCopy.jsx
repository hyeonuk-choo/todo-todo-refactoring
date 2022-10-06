import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import searchSvg from "../../assets/img/searchSvg.svg";
import regionSvg from "../../assets/img/regionSvg.svg";
import cancelSvg from "../../assets/img/cancelSvg.svg";
import {
  __nicknameCheck,
  __userInfoRegister,
} from "../../redux/modules/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { __getSearch } from "../../redux/modules/profileinfoSlice";
import { throttle, debounce, escapeRegExp, set } from "lodash";

const ProfileInfoCopy = () => {
  const { searchList } = useSelector((state) => state.profileinfo);

  const targetRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false); // 로드 true, false
  const [page, setPage] = useState(0); // 페이지
  const [check, setCheck] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nicknameCheck } = useSelector((state) => state.login);

  const [nickname, setNickname] = useState("");
  const [isNicknameCheck, setIsNicknameCheck] = useState(false);

  const [grade, setGrade] = useState(null);

  // 고등학교 검색
  const [highschools, setHighschools] = useState([]);
  const [highschoolInput, setHighschoolInput] = useState("");
  const [highschoolResult, setHighschoolResult] = useState([]);

  const nicknameRef = useRef(null);
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);

  const onChangeNicknameHandler = (e) => {
    const { value } = e.target;
    let val = value.trim();
    setNickname(val);
    setIsNicknameCheck(() => false);
    if (val.length > 0) {
      nicknameRef.current.classList.add("active");
    } else {
      nicknameRef.current.classList.remove("active");
    }
  };

  const onSubmitNicknameCheckHandler = (e) => {
    e.preventDefault();

    const newNickname = {
      nickname: nickname,
    };

    if (nickname.length > 1) {
      dispatch(__nicknameCheck(newNickname));
      setIsNicknameCheck(() => true);
    } else {
      return alert("닉네임은 2글자부터 가능합니다");
    }
  };

  const onClickOneRefHandler = (e) => {
    const userGrade = parseInt(e.target.textContent).toString();
    setGrade(() => userGrade);
    oneRef.current.classList.add("active");
    twoRef.current.classList.remove("active");
    threeRef.current.classList.remove("active");
  };

  const onClickTwoRefHandler = (e) => {
    const userGrade = parseInt(e.target.textContent).toString();
    setGrade(() => userGrade);
    oneRef.current.classList.remove("active");
    twoRef.current.classList.add("active");
    threeRef.current.classList.remove("active");
  };

  const onClickThreeRefHandler = (e) => {
    const userGrade = parseInt(e.target.textContent).toString();
    setGrade(() => userGrade);
    oneRef.current.classList.remove("active");
    twoRef.current.classList.remove("active");
    threeRef.current.classList.add("active");
  };

  // ----------------- 무한스크롤 -----------------------
  const checkIntersect = async ([entry], observer) => {
    setPage((prev) => prev + 1);
    observer.unobserve(entry.target);
  };

  // 무한 루프 발생으로 분리

  useEffect(() => {
    if (highschoolInput.length > 0) {
      dispatch(__getSearch({ search: highschoolInput, page: page }));
    }
  }, [highschoolInput]);

  useEffect(() => {
    let observer;

    if (targetRef) {
      observer = new IntersectionObserver(checkIntersect, {
        threshold: 0.3,
      });
      observer.observe(targetRef.current);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [searchList]);

  // ------------------------------------------------------

  const ch2pattern = (ch) => {
    // const offset = 44032;
    // if (/[가-힣]/.test(ch)) {
    //   const chCode = ch.charCodeAt(0) - offset;
    //   if (chCode % 28 > 0) {
    //     return ch;
    //   }
    //   const begin = Math.floor(chCode / 28) * 28 + offset;
    //   const end = begin + 27;
    //   return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    // }
    // if (/[ㄱ-ㅎ]/.test(ch)) {
    //   const con2syl = {
    //     ㄱ: "가".charCodeAt(0),
    //     ㄲ: "까".charCodeAt(0),
    //     ㄴ: "나".charCodeAt(0),
    //     ㄷ: "다".charCodeAt(0),
    //     ㄸ: "따".charCodeAt(0),
    //     ㄹ: "라".charCodeAt(0),
    //     ㅁ: "마".charCodeAt(0),
    //     ㅂ: "바".charCodeAt(0),
    //     ㅃ: "빠".charCodeAt(0),
    //     ㅅ: "사".charCodeAt(0),
    //   };
    //   const begin =
    //     con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl["ㅅ"];
    //   const end = begin + 587;
    // return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    // }
    // return escapeRegExp(ch);
  };

  const createFuzzyMatcher = (input) => {
    const pattern = input.split("").map(ch2pattern).join(".*?");
    return new RegExp(pattern);
  };

  const onChangeSearchHandler = async (e) => {
    const { value } = e.target;
    let val = value.trim();
    setHighschoolInput(val);
    setPage(0);

    // const regex = createFuzzyMatcher(val);

    // const resultData = highschools
    //   .filter((row) => {
    //     return regex.test(row["schoolName"]);
    //   })
    //   .map((row) => {
    //     return { school: row["schoolName"], adres: row["adres"] };
    //   });
    // setHighschoolResult(resultData);
  };

  const onClickSelectHandler = (e) => {
    setHighschoolInput(e.target.textContent);
    setHighschoolResult([]);
  };

  const onClickSearchCancelHandler = () => {
    setHighschoolInput("");
    setHighschoolResult([]);
  };

  const onSubmitRegisterHandler = (e) => {
    e.preventDefault();
    const newUserInfoRegister = {
      nickname: nickname,
      highschool: highschoolInput,
      grade: grade,
    };
    dispatch(__userInfoRegister(newUserInfoRegister));
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "1rem 1rem 0.5rem 1rem",
        height: "100%",
        background: "#fff",
        fontFamily: "SUIT-Regular, sans-serif",
      }}
    >
      <StInfoTitle>
        <p style={{ margin: 0 }}>회원 정보를 입력해주세요</p>
      </StInfoTitle>
      <StInfoNicknameBox>
        <p>닉네임</p>

        <form ref={nicknameRef} onSubmit={onSubmitNicknameCheckHandler}>
          {isNicknameCheck ? (
            <input
              type='text'
              placeholder='2-12자의 영문,한글,숫자 사용 가능'
              value={nickname}
              onChange={onChangeNicknameHandler}
              className='checkedInput'
            />
          ) : (
            <>
              <input
                type='text'
                placeholder='2-12자의 영문,한글,숫자 사용 가능'
                value={nickname}
                onChange={onChangeNicknameHandler}
              />
              <button>중복 확인</button>
            </>
          )}
        </form>
        <span>{isNicknameCheck ? nicknameCheck : null}</span>
      </StInfoNicknameBox>
      <StHighschoolBox>
        <p>고등학교</p>
        <div className='gradeBox'>
          <div ref={oneRef} onClick={onClickOneRefHandler}>
            1학년
          </div>
          <div ref={twoRef} onClick={onClickTwoRefHandler}>
            2학년
          </div>
          <div ref={threeRef} onClick={onClickThreeRefHandler}>
            3학년
          </div>
        </div>
        <div className='inputBox' style={{ display: "flex" }}>
          <input
            type='text'
            placeholder='고등학교를 검색해주세요'
            value={highschoolInput}
            onChange={onChangeSearchHandler}
          />
          {highschoolInput.length > 0 ? (
            <button onClick={onClickSearchCancelHandler}>
              <img src={cancelSvg} alt='search' />
            </button>
          ) : (
            <button>
              <img src={searchSvg} alt='search' />
            </button>
          )}
        </div>
      </StHighschoolBox>
      <StHighschoolSearchBox className='scroll'>
        {highschoolInput.length > 0
          ? searchList &&
            searchList.map((data, index) => (
              <div className='content' key={index}>
                <div className='school' onClick={onClickSelectHandler}>
                  {data.schoolName}
                </div>
                <div className='region'>
                  <img src={regionSvg} />
                  {data.adres}
                </div>
              </div>
            ))
          : null}
        <StRefDiv ref={targetRef} style={{ backgroundColor: "red" }}>
          temp
        </StRefDiv>
      </StHighschoolSearchBox>

      <StBtnBox onSubmit={onSubmitRegisterHandler}>
        <button>투두투두 시작하기!</button>
      </StBtnBox>
    </div>
  );
};

const StRefDiv = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StInfoTitle = styled.div`
  font-size: 1.4rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  height: 8%;
  border-bottom: 1px solid #ffe9d4;
`;

const StInfoNicknameBox = styled.div`
  padding: 0.5rem 0 1rem 0;
  height: 18%;
  box-sizing: border-box;

  & p {
    margin-bottom: 5px;
  }

  & form {
    display: flex;
    align-items: center;
  }

  & form input {
    border: 1px solid #e8e8e8;
    height: 54px;
    padding: 0 0.5rem;
    width: 75%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    outline: none;
  }

  & form input::placeholder {
    font-size: 0.9rem;
  }

  & form input.checkedInput {
    border: 1px solid #e8e8e8;
    height: 54px;
    padding: 0 0.5rem;
    width: 100%;
    border-radius: 10px;
    outline: none;
  }

  & form button {
    border: 1px solid #e8e8e8;

    border-left: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 54px;
    width: 25%;
    font-size: 0.9rem;
    background-color: #fff;
    color: #ff7b00;
  }

  & form.active input.checkedInput {
    border: 1px solid #ff7b00;
    transition: border 0.2s;
  }

  & form.active input {
    border: 1px solid #ff7b00;
    border-right: none;
    transition: border 0.2s;
  }

  & form.active button {
    border: 1px solid #ff7b00;
    border-left: none;
    transition: border 0.2s;
    position: relative;
  }

  & form.active button::before {
    content: "";
    width: 1px;
    height: 100%;
    color: red;
    background-color: #e8e8e8;
    position: absolute;
    left: 0;
    top: 0;
  }

  & span {
    display: inline-block;
    font-size: 0.8rem;
    height: 32px;
    margin: 0;
  }
`;

const StHighschoolBox = styled.div`
  padding-top: 0.7rem;
  height: 26%;
  box-sizing: border-box;

  & p {
    margin-bottom: 0.5rem;
  }

  & .gradeBox {
    display: flex;

    div {
      border: 1px solid #dedddd;
      padding: 0.5rem 0.7rem;
      border-radius: 20px;
      margin-right: 0.5rem;
      color: #767676;
      font-size: 0.9rem;
    }

    div.active {
      border: 1px solid #ff8f27;
      background-color: #ffe9d4;
      color: #ff8f27;
    }
  }

  & .inputBox {
    margin-top: 1rem;

    input {
      border: 1px solid #e8e8e8;
      border-right: none;
      padding: 0.8rem;
      width: 90%;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      outline: none;
    }

    & input::placeholder {
      font-size: 0.9rem;
    }

    & button {
      border: 1px solid #e8e8e8;
      border-left: none;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 0.8rem 0rem;
      width: 10%;
      font-size: 0.9rem;
      background-color: #fff;
      color: #ff7b00;
    }
  }
`;

const StHighschoolSearchBox = styled.div`
  width: 100%;
  background-color: #fafafa;
  overflow-y: scroll;
  border-radius: 10px;
  height: 50%;
  border: 2px solid green;

  & .content {
    align-items: center;
    padding: 0.5rem 1rem;
    margin-bottom: 20px;

    .school {
      font-size: 1rem;
      padding: 0.5rem 0;
    }

    .region {
      font-size: 0.7rem;
      color: #9f9e9e;
    }
  }
`;

const StBtnBox = styled.form`
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  margin: 0 0 0.5rem 0;
  height: 8%;

  & button {
    background-color: #ff8f27;
    border: none;
    width: 280px;
    height: 50px;
    font-size: 1rem;
    border-radius: 12px;
    color: white;
    margin: 0;
  }
`;

export default ProfileInfoCopy;
