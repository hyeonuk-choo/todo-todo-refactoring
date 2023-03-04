import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const nickname = localStorage.getItem("nickname");

const initialState = {
  rankScoreData: [{}, {}, {}],
  barData: [{}, {}],
  lineData: [{}, {}],
  heatmapData: [],
  isLoading: false,
  error: null,
};

export const __getRankScoreData = createAsyncThunk(
  "__getRankScoreData",
  async (payload, thunkAPI) => {
    try {
      // let accessToken = localStorage.getItem("accessToken");
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // };

      const lastWeekData = await axios.get(`${BASE_URL}/rank/week?page=0`);
      const weeklyData = await axios.get(`${BASE_URL}/rank/week?page=0`);
      const monthlyData = await axios.get(`${BASE_URL}/rank/week?page=0`);

      return thunkAPI.fulfillWithValue([
        lastWeekData.data,
        weeklyData.data,
        monthlyData.data,
      ]);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getLineChartData = createAsyncThunk(
  "getLineChartData",
  async (payload, thunkAPI) => {
    try {
      // let accessToken = localStorage.getItem("accessToken");
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // };

      const data = await axios.get(`${BASE_URL}/todo/achievement/thisweek`);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __getHeatMapData = createAsyncThunk(
  "getHeatMapData",
  async (payload, thunkAPI) => {
    try {
      // let accessToken = localStorage.getItem("accessToken");
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // };

      const data = await axios.get(`${BASE_URL}/todo/achievement/dayly`);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getRankScoreData.pending]: (state) => {
      state.isLoading = true;
    },
    [__getRankScoreData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.rankScoreData = action.payload;
    },
    [__getRankScoreData.rejected]: (state, action) => {
      state.isLoading = false;

      state.error = action.payload.message;
    },

    [__getLineChartData.pending]: (state) => {
      state.isLoading = true;
    },
    [__getLineChartData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.lineData = action.payload;
    },
    [__getLineChartData.rejected]: (state, action) => {
      state.isLoading = false;

      state.error = action.payload.message;
    },

    [__getHeatMapData.pending]: (state) => {
      state.isLoading = true;
    },
    [__getHeatMapData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.heatmapData = action.payload;
    },
    [__getHeatMapData.rejected]: (state, action) => {
      state.isLoading = false;

      state.error = action.payload.message;
    },
  },
});

export default statisticsSlice.reducer;
