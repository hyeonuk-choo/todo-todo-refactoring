import React, { useEffect, useRef } from "react";
import NaverUnion from "../../assets/img/loginPage/NaverUnion.svg";
import styled from "styled-components";

const Naver = () => {
  const naverRef = useRef();
  // 추가-정성일:네이버측에서 제공하는 버튼을 index.css에서 display:none으로 숨기고
  // 커스텀 버튼을 대신해서 보여주는 대신 커스텀 버튼 클릭시 네이버 버튼의 a태그가 클릭되도록 하기위함
  const { naver } = window;
  const NAVER_REST_API_KEY = process.env.REACT_APP_NAVER_API_KEY;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_REST_API_KEY,
      callbackUrl: NAVER_REDIRECT_URI,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandler: true,
    });
    naverLogin.init();
  };

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
    localStorage.setItem("access_token", token);
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  }, []);

  const handleClick = () => {
    naverRef.current.children[0].click();
  };
  return (
    <>
      <div ref={naverRef} id='naverIdLogin'></div>
      <StNaverLoginBtn onClick={handleClick}>
        <StNaverBtnImg src={NaverUnion} />
        <StNaverBtnFont>네이버 로그인</StNaverBtnFont>
      </StNaverLoginBtn>
    </>
  );
};

export default Naver;

const StNaverLoginBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 280px;
  height: 50px;

  background: #ffffff;

  border: 1px solid #e8e8e8;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  margin-bottom: 5%;

  cursor: pointer;
`;
const StNaverBtnImg = styled.img`
  position: relative;
  right: 10px;
`;
const StNaverBtnFont = styled.span`
  position: relative;
  left: 5px;
`;
