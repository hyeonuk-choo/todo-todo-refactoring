// 리덕스툴킷 스토어함수
import { configureStore } from "@reduxjs/toolkit";
// 리듀서
import PlannerSlice from "../modules/plannerSlice";
import mainSlice from "../modules/mainSlice";
import statisticsSlice from "../modules/statisticsSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    statistics: statisticsSlice,
    planner: PlannerSlice,
  },
});
