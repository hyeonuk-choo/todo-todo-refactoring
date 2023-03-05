// import React, { useState, useEffect } from "react";
// import { __getHeatMapData } from "../../redux/modules/statisticsSlice";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// import HeatMap from "react-heatmap-grid";

// const HeatMapSample = () => {
//   const [heatMapDataRate, setHeatMapDataRate] = useState([
//     [],
//     [],
//     [],
//     [],
//     [],
//     [],
//     [],
//   ]);
//   const { heatmapData } = useSelector((state) => state.statistics);

//   const xLabels = [
//     "",
//     "8주전",
//     "",
//     "6주전",
//     "",
//     "4주전",
//     "",
//     "2주전",
//     "",
//     "이번주",
//   ].reverse();
//   // const xLabels = new Array(10).fill(0).map((_, i) => `${i + 1}주`);
//   // const xLabelsVisibility = new Array(10).fill().map((_, i) => i + 1);

//   const yLabels = ["", "", "", "", "", "", ""]; // 월, 화, 수, 목, 금, 토, 일
//   // const yLabelsVisibility = new Array(7).fill().map((_, i) => i + 1);

//   useEffect(() => {
//     const arr = [];
//     const heatmapArr = [[], [], [], [], [], [], []];
//     if (heatmapData.length > 0) {
//       let heatmapDataLen = heatmapData.length;
//       for (let i = 0; i < heatmapDataLen; i++) {
//         const data = heatmapData[i].achievementRate;
//         arr.push(data);
//       }
//     }
//     arr.reverse();
//     let len = arr.length;

//     for (let i = 0; i < len; i += 7) {
//       heatmapArr[6].push(arr[i]);
//       heatmapArr[5].push(arr[i + 1]);
//       heatmapArr[4].push(arr[i + 2]);
//       heatmapArr[3].push(arr[i + 3]);
//       heatmapArr[2].push(arr[i + 4]);
//       heatmapArr[1].push(arr[i + 5]);
//       heatmapArr[0].push(arr[i + 6]);
//     }

//     setHeatMapDataRate(heatmapArr);
//   }, [heatmapData]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(__getHeatMapData());
//   }, [dispatch]);

//   return (
//     <StContainer>
//       <StDaysBox>
//         <p>월</p>
//         <p>화</p>
//         <p>수</p>
//         <p>목</p>
//         <p>금</p>
//         <p>토</p>
//         <p>일</p>
//       </StDaysBox>
//       <HeatMap
//         xLabels={xLabels}
//         yLabels={yLabels}
//         // xLabelsLocation={"top"}
//         // yLabelsLocation={"top"}
//         // xLabelsVisibility={xLabelsVisibility}
//         // yLabelsVisibility={yLabelsVisibility}
//         // xLabelWidth={30}
//         yLabelWidth={0}
//         data={heatMapDataRate.length > 0 ? heatMapDataRate : null}
//         squares
//         // width={30}
//         height={30}
//         cellStyle={(background, value) => ({
//           width: "30px",
//           margigLeft: "1.5px",
//           background:
//             value === 0
//               ? "#F3F3F3"
//               : value <= 20
//               ? "rgba(255,143,39,.2)"
//               : value <= 40
//               ? "rgba(255,143,39,.4)"
//               : value <= 60
//               ? "rgba(255,143,39,.6)"
//               : value <= 80
//               ? "rgba(255,143,39,.8)"
//               : value <= 100
//               ? "rgba(255,143,39,1)"
//               : "null",
//         })}
//         // cellRender={(value) => value && <div>{value}%</div>}
//       />
//     </StContainer>
//   );
// };

// const StContainer = styled.div`
//   font-size: 11px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 12px;
//   margin: 0 auto;
//   width: 90%;
//   height: 270px;
//   box-sizing: border-box;
//   background-color: white;
//   box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
// `;

// const StDaysBox = styled.div`
//   padding-top: 13px;

//   & p {
//     margin: 0;
//     padding: 8.5px 5px;
//   }
// `;

// export default HeatMapSample;
