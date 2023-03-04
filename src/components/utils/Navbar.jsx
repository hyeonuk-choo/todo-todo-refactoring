import React, { useState, useEffect } from "react";
import styled from "styled-components";
import homeSvg from "../../assets/img/homeSvg.svg";
import statisticsSvg from "../../assets/img/statisticsSvg.svg";
import mypageSvg from "../../assets/img/mypageSvg.svg";
import plannerSvg from "../../assets/img/plannerSvg.svg";
import clickHomeSvg from "../../assets/img/clickHomeSvg.svg";
import clickStatisticsSvg from "../../assets/img/clickStatisticsSvg.svg";
import clickPlannerSvg from "../../assets/img/clickPlannerSvg.svg";
import clickMypageSvg from "../../assets/img/clickMypageSvg.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getDday } from "../../redux/modules/mainSlice";
import UploadPhoto from "../my/UploadPhoto";
import { displayNone } from "../../redux/modules/mySlice";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const dday = useSelector((state) => state.main);

  const [home, setHome] = useState(props.home);
  const [statistics, setStatistics] = useState(props.statistics);
  const [planner, setPlanner] = useState(props.planner);
  const [mypage, setMypage] = useState(props.myPage);
  const navigate = useNavigate();

  const onClickHomeMenu = async () => {
    navigate("/");
    setHome(true);
    setStatistics(false);
    setPlanner(false);
    setMypage(false);
    dispatch(displayNone("flex"));
  };
  const onClickStatisticsMenu = async () => {
    navigate("/statistics");
    setHome(false);
    setStatistics(true);
    setPlanner(false);
    setMypage(false);
    // dispatch(displayNone("flex"));
  };

  const onClickPlannerMenu = async () => {
    setHome(false);
    setStatistics(false);
    setPlanner(true);
    setMypage(false);
    navigate("/planner");
    dispatch(displayNone("flex"));
  };
  const onClickMypageMenu = async () => {
    setHome(false);
    setStatistics(false);
    setPlanner(false);
    setMypage(true);
    navigate("/my");
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
      {mypage ? (
        <>
          <StMypage src={clickMypageSvg} onClick={onClickMypageMenu} />
          <UploadPhoto />
        </>
      ) : (
        <StMypage src={mypageSvg} onClick={onClickMypageMenu} />
      )}
    </StNav>
  );
};

export default Navbar;

const StNav = styled.div`
  height: 10vh;
  width: 100%;
  z-index: 5;
  border-top: 1px solid #ddd;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media screen and (min-width: 768px) {
    width: 600px;
  }
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
