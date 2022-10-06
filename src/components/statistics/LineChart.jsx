import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ECharts from "echarts-for-react";
import { __getLineChartData } from "../../redux/modules/statisticsSlice";

const LineChart = () => {
  const { lineData } = useSelector((state) => state?.statistics);
  const dispatch = useDispatch();
  const [lineDataRate, setLineDataRate] = useState([]);

  const options = {
    legend: {
      data: [
        //"상위랭커",
        // "이번주",
      ],
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
      // {
      //   name: "상위랭커",
      //   data: [100, 200, 300, 300, 370, 550, 620],
      //   type: "line",
      //   color: "#D34C4C",
      // },
      {
        // name: "이번주",
        data: lineDataRate,
        type: "line",
        color: "#618AF2",
      },
    ],

    grid: {
      // left: "15%",
      // top: "12%",
      bottom: "15%",
    },
  };

  useEffect(() => {
    const arr = [];

    if (lineData.length > 0) {
      let len = lineData.length;
      for (let i = 0; i < len; i++) {
        const data = (lineData[i].achievementRate / 7).toFixed(2);
        arr.push(data);
      }
    }

    setLineDataRate(arr);
  }, [lineData]);

  useEffect(() => {
    dispatch(__getLineChartData());
  }, [dispatch]);

  return (
    <ECharts
      option={options}
      // theme="myTheme"
      opts={{
        renderer: "",
        height: "169px",
        margin: "auto",
        color: "#91cc75",
      }}
      style={{
        height: "169px",
        width: "calc(100% - 44px)",
        margin: "0px 22px",
        backgroundColor: "white",
        boxShadow: "0px 4px 15px rgba(17, 17, 17, 0.05)",
        borderRadius: "12px",
      }}
    />
  );
};

export default LineChart;
