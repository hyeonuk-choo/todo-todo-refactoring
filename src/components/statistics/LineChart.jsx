import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ECharts from "echarts-for-react";
import { __getLineChartData } from "../../redux/modules/statisticsSlice";

const LineChart = () => {
  const { lineData } = useSelector((state) => state?.statistics);
  const dispatch = useDispatch();

  const newArr = lineData.map((each) => each.achievementRate);

  const options = {
    legend: {
      data: ["상위권", "이번주"],
    },

    xAxis: {
      type: "category",
      data: ["월", "화", "수", "목", "금", "토", "일"],
    },

    yAxis: {
      type: "value",
      // interval: 100,
      splitNumber: 4,
    },

    series: [
      {
        name: "상위권",
        data: [55, 70, 95, 100, 85, 90, 100],
        type: "line",
        color: "#38aded",
      },
      {
        name: "이번주",
        data: newArr,
        type: "line",
        color: "rgb(255, 123, 0)",
      },
    ],

    grid: {
      left: "10%",
      top: "15%",
      bottom: "13%",
    },
  };

  useEffect(() => {
    dispatch(__getLineChartData());
  }, [dispatch]);

  return (
    <ECharts
      option={options}
      // console [Violation]메세지 관련
      onEvents={{
        wheel: {
          // wheel 이벤트 핸들러 함수
          handler: () => {},
          // passive: true 옵션 추가
          passive: true,
        },
        mousewheel: {
          // mousewheel 이벤트 핸들러 함수
          handler: () => {},
          // passive: true 옵션 추가
          passive: true,
        },
      }}
      opts={{ width: "580%" }}
      style={{
        boxSizing: "border-box",
        height: "100%",
        width: "100%",
        margin: "auto",
        paddingTop: "2.5%",
        backgroundColor: "white",
        boxShadow: "0px 4px 15px rgba(17, 17, 17, 0.05)",
        borderRadius: "12px",
      }}
    />
  );
};

export default LineChart;
