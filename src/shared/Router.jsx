import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PlannerPage from "../pages/PlannerPage";
import StatisticsPage from "../pages/StatisticsPage";
import Layout from "../components/utils/Layout";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

const Router = () => {
  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    let nickname = localStorage.getItem("nickname");
  }, []);

  return (
    <BrowserRouter>
      <StContainer>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/planner" element={<PlannerPage />} />

            {/* <Route
              path="/setting"
              element={
                token === null ? (
                  <Navigate replace to="/login" />
                ) : (
                  <Setting setToken={setToken} />
                )
              }
            /> */}

            {/* <Route
              path="/planner"
              element={
                token === null ? (
                  <Navigate replace to="/login" />
                ) : (
                  <PlannerPage />
                )
              }
            /> */}

            {/* <Route
              path="/statistics"
              element={
                token === null ? (
                  <Navigate replace to="/login" />
                ) : (
                  <StatisticsPage />
                )
              }
            /> */}

            {/* <Route
              path="/profileinfo"
              element={
                nickname !== null ? (
                  <Navigate replace to="/" />
                ) : (
                  <ProfileInfoPage />
                )
              }
            /> */}
            {/* <Route
                  path="/login"
                  element={
                    token !== null ? <Navigate replace to="/" /> : <LoginPage />
                  }
                /> */}
            {/* <Route path='/' element={token === null ? <Navigate replace to='/login' /> : <MainPage />} /> */}
            {/* <Route
                  path="/my"
                  element={
                    token === null ? <Navigate replace to="/login" /> : <MyPage />
                  }
                /> */}
            {/* <Route
                  path="/my/planner"
                  element={
                    token === null ? (
                      <Navigate replace to="/login" />
                      ) : (
                        <ProfilePlanner />
                    )
                  }
                /> */}

            {/* <Route path="/profileinfo" element={<ProfileInfoPage />} /> */}

            {/* <Route
              path="/user/kakao/callback"
              element={<KakaoLogin setToken={setToken} />}
            />
            <Route
              path="/user/google/callback"
              element={<GoogleLogin setToken={setToken} />}
            />
            <Routes path="/user/naver/callback" element={<NaverLogin />} /> */}
          </Routes>
        </Layout>
      </StContainer>
    </BrowserRouter>
  );
};

const StContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

export default Router;
