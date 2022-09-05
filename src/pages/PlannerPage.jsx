import React from "react";
import Planner from "../components/plannerPage/Planner";
import Navbar from "../components/utils/Navbar";
import styled from "styled-components";

const PlannerPage = () => {
  return (
    <>
      <Planner />
      <Navbar />
    </>
  );
};

export default PlannerPage;

const StBackground = styled.div``;
