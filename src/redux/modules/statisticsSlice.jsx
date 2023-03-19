import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const nickname = localStorage.getItem("nickname");

export const __getRankScoreData = createAsyncThunk(
  "__getRankScoreData",
  async (payload, thunkAPI) => {
    try {
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
      const data = await axios.get(`${BASE_URL}/achievement/thisweek`);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  rankScoreData: [{}, {}, {}],
  barData: [{}, {}],
  lineData: [{}, {}],
  heatmapData: [],
  isLoading: false,
  error: null,
};

export const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getRankScoreData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getRankScoreData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rankScoreData = action.payload;
      })
      .addCase(__getRankScoreData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(__getLineChartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getLineChartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lineData = action.payload;
      })
      .addCase(__getLineChartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default statisticsSlice.reducer;
