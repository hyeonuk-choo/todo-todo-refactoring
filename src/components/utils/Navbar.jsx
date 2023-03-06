import React, { useState, useEffect } from "react";
import styled from "styled-components";
import homeSvg from "../../assets/img/homeSvg.svg";
import statisticsSvg from "../../assets/img/statisticsSvg.svg";

import plannerSvg from "../../assets/img/plannerSvg.svg";
import clickHomeSvg from "../../assets/img/clickHomeSvg.svg";
import clickStatisticsSvg from "../../assets/img/clickStatisticsSvg.svg";
import clickPlannerSvg from "../../assets/img/clickPlannerSvg.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getDday } from "../../redux/modules/mainSlice";
import { displayNone } from "../../redux/modules/mySlice";

const Navbar = (props) => {
  const dispatch = useDispatch();

  const [home, setHome] = useState(props.home);
  const [statistics, setStatistics] = useState(props.statistics);
  const [planner, setPlanner] = useState(props.planner);
  const navigate = useNavigate();

  const onClickHomeMenu = async () => {
    navigate("/");
    setHome(true);
    setStatistics(false);
    setPlanner(false);
    // dispatch(displayNone("flex"));
  };
  const onClickStatisticsMenu = async () => {
    navigate("/statistics");
    setHome(false);
    setStatistics(true);
    setPlanner(false);
  };

  const onClickPlannerMenu = async () => {
    navigate("/planner");
    setHome(false);
    setStatistics(false);
    setPlanner(true);
    // dispatch(displayNone("flex"));
  };

  return (
    <StNav>
      {home ? (
        <StHome src={clickHomeSvg} onClick={onClickHomeMenu} />
      ) : (
        <StHome src={homeSvg} onClick={onClickHomeMenu} />
      )}
      {statistics ? (
        <StStatistics
          src={clickStatisticsSvg}
          onClick={onClickStatisticsMenu}
        />
      ) : (
        <StStatistics src={statisticsSvg} onClick={onClickStatisticsMenu} />
      )}
      {planner ? (
        <StPlanner src={clickPlannerSvg} onClick={onClickPlannerMenu} />
      ) : (
        <StPlanner src={plannerSvg} onClick={onClickPlannerMenu} />
      )}
    </StNav>
  );
};

export default Navbar;

const StNav = styled.div`
  box-sizing: border-box;
  height: 10vh;
  width: 100%;
  z-index: 5;
  border-top: 1px solid #ddd;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StHome = styled.img`
  width: 45px;
  height: 100%;
  cursor: pointer;
`;
const StStatistics = styled.img`
  width: 45px;
  height: 100%;
  cursor: pointer;
`;
const StPlanner = styled.img`
  width: 45px;
  height: 100%;
  cursor: pointer;
`;
const StMypage = styled.img`
  width: 45px;
  height: 100%;
  cursor: pointer;
`;
