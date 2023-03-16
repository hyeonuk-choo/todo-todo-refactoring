import React from "react";
import Statistics from "../components/statistics/Statistics";
import styled from "styled-components";

const StatisticsPage = () => {
  return (
    <StContainer>
      <Statistics />
    </StContainer>
  );
};

const StContainer = styled.div`
  background-color: #fafafa;

  @media screen and (min-width: 768px) {
    width: 100%;
  }

  /* @media screen and (min-height: 667px) {
    height: 667px;
  }
  @media screen and (min-height: 736px) {
    height: 736px;
  }

  @media screen and (min-height: 740px) {
    height: 740px;
  }

  @media screen and (min-height: 800px) {
    height: 800px;
  }

  @media screen and (min-height: 812px) {
    height: 812px;
  }

  @media screen and (min-height: 844px) {
    height: 844px;
  }

  @media screen and (min-height: 851px) {
    height: 851px;
  }

  @media screen and (min-height: 896px) {
    height: 896px;
  }

  @media screen and (min-height: 915px) {
    height: 915px;
  }

  @media screen and (min-height: 1024px) {
    height: 1024px;
  }

  @media screen and (min-height: 1180px) {
    height: 1180px;
  }

  @media screen and (min-height: 1366px) {
    height: 1366px;
  } */
`;

export default StatisticsPage;
