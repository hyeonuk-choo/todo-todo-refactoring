import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import PlannerPage from "../pages/PlannerPage";
import StatisticsPage from "../pages/StatisticsPage";
import MyPage from "../pages/MyPage";
import KakaoLogin from "../components/loginPage/KakaoLogin";
import GoogleLogin from "../components/loginPage/GoogleLogin";
import NaverLogin from "../components/loginPage/NaverLogin";
import ProfileInfo from "../components/profileInfoPage/ProfileInfo";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/my' element={<MyPage />} />
        <Route path='/planner' element={<PlannerPage />} />
        <Route path='/statistics' element={<StatisticsPage />} />
        <Route path='/profileinfo' element={<ProfileInfo />} />
        <Route path='/user/kakao/callback' element={<KakaoLogin />} />
        <Route path='/user/google/callback' element={<GoogleLogin />} />
        <Route path='/user/naver/callback' element={<NaverLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
