import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ECharts from "echarts-for-react";
import { __getLineChartData } from "../../redux/modules/statisticsSlice";

const LineChart = () => {
  const { lineData } = useSelector((state) => state?.statistics);
  const dispatch = useDispatch();
  const [lineDataRate, setLineDataRate] = useState([]);

  console.log(lineData);
  const options = {
    legend: {
      data: ["상위랭커", "이번주"],
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
        name: "상위랭커",
        data: [100, 200, 300, 300, 370, 550, 620],
        type: "line",
        color: "#D34C4C",
      },
      {
        name: "이번주",
        data: [200, 300, 500, 400, 170, 650, 820],
        type: "line",
        color: "#618AF2",
      },
    ],

    grid: {
      left: "10%",
      top: "15%",
      bottom: "13%",
    },
  };

  // useEffect(() => {
  //   const arr = [];

  //   if (lineData.length > 0) {
  //     for (let i = 0; i < lineData.length; i++) {
  //       const data = (lineData[i].achievementRate / 7).toFixed(2);
  //       arr.push(data);
  //     }
  //   }

  //   setLineDataRate(arr);
  // }, [lineData]);

  useEffect(() => {
    const newData = lineData?.map((each) => {
      return (each.achievementRate / 7).toFixed(2);
    });
    setLineDataRate(...lineDataRate, newData);
  }, []);

  useEffect(() => {
    dispatch(__getLineChartData());
  }, [dispatch]);

  return (
    <ECharts
      option={options}
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
