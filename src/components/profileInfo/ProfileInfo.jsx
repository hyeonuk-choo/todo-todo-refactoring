import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import searchSvg from "../../assets/img/searchSvg.svg";
import regionSvg from "../../assets/img/regionSvg.svg";
import cancelSvg from "../../assets/img/cancelSvg.svg";
import {
  __loginReissue,
  __nicknameCheck,
  __userInfoRegister,
} from "../../redux/modules/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileInfo = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nicknameCheck } = useSelector((state) => state.login);

  const [nickname, setNickname] = useState("");
  const [isNicknameCheck, setIsNicknameCheck] = useState(false);

  const [grade, setGrade] = useState(null);

  // 고등학교 검색
  const [highschoolInput, setHighschoolInput] = useState("");
  const [highschoolResult, setHighschoolResult] = useState([]);
  const [highschoolResultClick, setHighschoolResultClick] = useState(false);

  const nicknameRef = useRef(null);
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const startButton = useRef(null);
  const highSchoolSearchInput = useRef(null);

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

  const debouncedSearch = debounce(async (val) => {
    const { data } = await axios.get(`${BASE_URL}/school?search=${val}`);
    setHighschoolResult(data);
  }, 500);

  const onChangeSearchHandler = (e) => {
    const { value } = e.target;
    let val = value.trim();
    setHighschoolInput(val);
    debouncedSearch(val);
    setHighschoolResultClick(false);
    if (value.length > 0) {
      highSchoolSearchInput.current.classList.add("active");
    } else {
      highSchoolSearchInput.current.classList.remove("active");
    }
  };

  const onClickSelectHandler = (e) => {
    setHighschoolInput(e.target.textContent);
    setHighschoolResult([]);
    setHighschoolResultClick(true);
  };

  const onClickSearchCancelHandler = () => {
    setHighschoolInput("");
    highSchoolSearchInput.current.classList.remove("active");

    setHighschoolResult([]);
    setHighschoolResultClick(false);
  };

  const onSubmitRegisterHandler = async (e) => {
    e.preventDefault();
    localStorage.setItem("nickname", nickname);
    const newUserInfoRegister = {
      nickname: nickname,
      highschool: highschoolInput,
      grade: grade,
    };
    await dispatch(__userInfoRegister(newUserInfoRegister));
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");
    const token = {
      accessToken,
      refreshToken,
    };
    // await dispatch(__loginReissue(token))
    navigate("/");
  };

  useEffect(() => {
    if (highschoolInput.length === 0) {
      setHighschoolResult([]);
    }
  }, [highschoolInput]);

  // 닉네임 중복확인, 학년, 학교 입력시 버튼 컬러 변화
  if (
    isNicknameCheck &&
    nicknameCheck?.includes("가능") &&
    grade !== null &&
    highschoolResultClick
  ) {
    startButton.current?.classList.add("active");
    startButton.current?.classList.remove("inactive");
  } else {
    startButton.current?.classList.add("inactive");
    startButton.current?.classList.remove("active");
  }

  return (
    <StDiv>
      <StInfoTitle>
        <div>
          <p>회원 정보를 입력해주세요</p>
        </div>
      </StInfoTitle>
      <div className="infoBody">
        <StInfoNicknameBox>
          <p>닉네임</p>

          <form ref={nicknameRef} onSubmit={onSubmitNicknameCheckHandler}>
            {isNicknameCheck && nicknameCheck?.includes("가능") ? (
              <input
                type="text"
                placeholder="2-12자의 영문,한글,숫자 사용 가능"
                value={nickname}
                onChange={onChangeNicknameHandler}
                className="checkedInput"
              />
            ) : (
              <>
                <input
                  type="text"
                  placeholder="2-12자의 영문,한글,숫자 사용 가능"
                  value={nickname}
                  onChange={onChangeNicknameHandler}
                />
                <button>중복 확인</button>
              </>
            )}
          </form>
          <span>{isNicknameCheck ? nicknameCheck : ""}</span>
        </StInfoNicknameBox>
        <StHighschoolBox>
          <p>고등학교</p>
          <div className="gradeBox">
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
          <div className="inputBox" style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="고등학교를 검색해주세요"
              value={highschoolInput}
              onChange={onChangeSearchHandler}
              ref={highSchoolSearchInput}
            />
            {highschoolInput.length > 0 ? (
              <button
                onClick={onClickSearchCancelHandler}
                className="cancelSvg"
              >
                <img src={cancelSvg} alt="search" />
              </button>
            ) : (
              <button>
                <img src={searchSvg} alt="search" />
              </button>
            )}
          </div>
        </StHighschoolBox>
        <StHighschoolSearchBox>
          {highschoolInput.length > 0
            ? highschoolResult.length > 0 &&
              highschoolResult.map((data, index) => (
                <div className="content" key={index}>
                  <div className="school" onClick={onClickSelectHandler}>
                    {data.schoolName}
                  </div>
                  <div className="region">
                    <img src={regionSvg} alt="addressIcon" />
                    {data.address}
                  </div>
                </div>
              ))
            : null}
          <div style={{ height: "50px" }}></div>
        </StHighschoolSearchBox>

        {/* 버튼 기능 활성/비활성 */}
        <StBtnBox onSubmit={onSubmitRegisterHandler}>
          <button
            ref={startButton}
            disabled={
              isNicknameCheck &&
              nicknameCheck?.includes("가능") &&
              grade !== null &&
              highschoolResultClick
                ? false
                : "disabled"
            }
          >
            투두투두 시작하기!
          </button>
        </StBtnBox>
      </div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .infoBody {
    padding: 0rem 1rem 0rem 1rem;
    height: 100%;
    background: rgb(255, 255, 255);
  }
`;

const StInfoTitle = styled.div`
  background-color: white;
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  height: 72px;
  border-bottom: 1px solid #f1f3f5;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StInfoNicknameBox = styled.div`
  padding: 14px 0 14px 0;
  /* height: 100px; */
  box-sizing: border-box;

  & p {
    font-size: 17px;
    margin-bottom: 5px;
    font-weight: bold;
  }

  & form {
    display: flex;
    align-items: center;
  }

  & form input {
    border: 1px solid #e8e8e8;
    height: 54px;
    padding: 0 0.8rem;
    width: 75%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    outline: none;
    font-size: 17px;
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
    height: 56px;
    width: 25%;
    font-size: 14px;
    font-weight: bold;
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
    font-weight: bold;
    color: #ff7b00;
    height: 2rem;
    margin: 0.5rem 0 0 0.3rem;
  }
`;

const StHighschoolBox = styled.div`
  padding-top: 0;
  height: 150px;
  box-sizing: border-box;

  & p {
    font-size: 17px;
    margin-bottom: 0.5rem;
    font-weight: bold;
    margin-top: 0;
  }

  & .gradeBox {
    display: flex;

    div {
      border: 1px solid #dedddd;
      padding: 0.5rem 0.7rem;
      border-radius: 20px;
      margin-right: 0.5rem;
      color: #767676;
      font-size: 14px;
    }

    div.active {
      border: 1px solid #ff8f27;
      background-color: #ff8f27;
      color: white;
    }
  }

  & .inputBox {
    margin-top: 1rem;

    input {
      height: 54px;
      font-size: 17px;

      border: 1px solid #e8e8e8;
      border-right: none;
      padding: 0 0.8rem;
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
      background-color: #fff;
      padding-right: 1rem;
    }

    .active {
      border: 1px solid #ff8f27;
      border-right: none;
    }

    .cancelSvg {
      border: 1px solid #ff8f27;
      border-left: none;
    }
  }
`;

const StHighschoolSearchBox = styled.div`
  /* position: relative; */
  width: 100%;
  background-color: #fafafa;
  overflow: auto;

  @media screen and (max-device-height: 659px) {
    height: 35%;
  }
  @media screen and (min-device-height: 660px) and (max-device-height: 699px) {
    height: 40%;
  }
  @media screen and (min-device-height: 700px) and (max-device-height: 799px) {
    height: 45%;
  }
  @media screen and (min-device-height: 800px) and (max-device-height: 860px) {
    height: 50%;
  }

  @media screen and (min-device-height: 861px) and (max-device-height: 899px) {
    height: 43%;
  }

  @media screen and (min-device-height: 900px) {
    height: 56%;
  }

  border-radius: 10px;

  & .content {
    align-items: center;
    padding: 0.5rem 1rem;

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
  /* margin: 0 0 0.5rem 0; */
  padding: 0 0 0 0;

  button {
    position: fixed;
    bottom: 1rem;
    font-weight: bold;
  }

  .inactive {
    background-color: #e8e8e8;
    color: #9f9e9e;

    border: none;
    width: 280px;
    height: 50px;
    font-size: 1rem;
    border-radius: 12px;
    margin: 0;
  }

  .active {
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

export default ProfileInfo;
