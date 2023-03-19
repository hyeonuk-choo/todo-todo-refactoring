import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const KAKAO_BASE_URL = process.env.REACT_APP_KAKAO_BASE_URL;
const GOOGLE_BASE_URL = process.env.REACT_APP_GOOGLE_BASE_URL;

const initialState = {
  user: null,
  nickname: null,
  token: false,
  nicknameCheck: null,
};

// 소셜 로그인
export const __kakaoLogin = createAsyncThunk(
  "kakao/login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${KAKAO_BASE_URL}?code=${payload}`);

      localStorage.setItem("nickname", data.nickname);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      window.alert("로그인에 실패하였습니다.");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __googleLogin = createAsyncThunk(
  "google/login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${GOOGLE_BASE_URL}?code=${payload}`);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("nickname", data.nickname);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      window.alert("로그인에 실패하였습니다.");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 회원 정보 받기
export const __nicknameCheck = createAsyncThunk(
  "nickname/check",
  async (payload, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${BASE_URL}/check-nickname`,
        payload,
        config
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __userInfoRegister = createAsyncThunk(
  "userInfo/register",
  async (payload, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.post(`${BASE_URL}/signup`, payload, config);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __loginReissue = createAsyncThunk(
  "loginReissue/login",
  async (payload, thunkAPI) => {
    try {
      const { headers } = await axios.post(`${BASE_URL}/reissue`, payload);
      localStorage.setItem("accessToken", headers.authorization);
      return thunkAPI.fulfillWithValue(headers);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  builder: (builder) => {
    builder
      .addCase(__kakaoLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__kakaoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = true;
      })
      .addCase(__kakaoLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__googleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.nickname = action.payload.nickname;
        state.token = true;
      })
      .addCase(__googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__nicknameCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__nicknameCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nicknameCheck = action.payload;
      })
      .addCase(__nicknameCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.nicknameCheck = action.payload;
      })
      .addCase(__userInfoRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__userInfoRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user
        // state.nickname
      })
      .addCase(__userInfoRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__loginReissue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__loginReissue.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(__loginReissue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = loginSlice.actions;
export default loginSlice.reducer;
