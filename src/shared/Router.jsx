import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PlannerPage from "../pages/PlannerPage";
import StatisticsPage from "../pages/StatisticsPage";
import Layout from "../components/utils/Layout";
import styled from "styled-components";
// import TodoAdd from "../components/planner/TodoAdd";

const Router = () => {
  return (
    <BrowserRouter>
      <StContainer>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/planner-main" element={<PlannerPage />} />
            {/* <Route path="/planner-add" element={<TodoAdd />} /> */}
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
