import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const nickname = localStorage.getItem("nickname");

const initialState = {
  userInfo: [],
  dday: [],
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
      console.log(data.data[0]);
      return thunkAPI.fulfillWithValue(data.data[0]);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDday = createAsyncThunk(
  "mainSlice/getDday",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/dday`);
      console.log(data.data[0]);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateDday = createAsyncThunk(
  "mainSlice/updateDday",
  async ({ id, title, selectedDate }, thunkAPI) => {
    try {
      const data = await axios.put(`${BASE_URL}/dday/${id}`, {
        title,
        selectedDate,
      });
      console.log(data);
      return data;
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
      })
      .addCase(getDday.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dday = action.payload[0];
      })
      .addCase(getDday.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateDday.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dday.title = action.meta.arg.title;
        state.dday.selectedDate = action.meta.arg.selectedDate;
      })
      .addCase(updateDday.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default mainSlice.reducer;
