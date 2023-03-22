import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const nickname = localStorage.getItem("nickname");

const initialState = {
  userInfo: [],
  thisMonthRate: [],
  totalRate: [],
  totalTodo: [],
  mainRankList: [],
  mainRankListMonthly: [],
  mainRankListSchool: [],
  isLoading: false,
  error: null,
};

export const getUserInfo = createAsyncThunk(
  "mainSlice/getUserInfo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/userinfo`);

      return thunkAPI.fulfillWithValue(data.data[0]);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default mainSlice.reducer;
