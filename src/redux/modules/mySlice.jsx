import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const __getMyInfo = createAsyncThunk(
  "getMyInfo", // extraReducer 미동작 이유: 다른 Thunk함수의 이름과 중복!
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/userinfo`);
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getOtherInfo = createAsyncThunk(
  "getOtherInfo", // 이름 중요! 다른 Thunk함수 이름과 중복되지 않도록 주의!
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(`${BASE_URL}/member/${payload}`, config);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __postProfileImg = createAsyncThunk(
  "postProfileImg",
  async (payload, thunkAPI) => {
    let accessToken = localStorage.getItem("accessToken");

    const config = {
      headers: {
        "Content-type": false,
        responseType: "blob",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const data = await axios.post(
        `${BASE_URL}/image/profile`,
        payload,
        config
      );
      return thunkAPI.fulfillWithValue(data.data); // data 는 수정완료 메세지
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __getImages = createAsyncThunk(
  "getImages",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(
        `${BASE_URL}/image/boast/${payload}`,
        config
      );

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __postImages = createAsyncThunk(
  "postImages",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.post(`${BASE_URL}/image/boast`, payload, config);
      // return thunkAPI.fulfillWithValue(data); // data는 완료 메세지, images에 반영됨
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __deleteImages = createAsyncThunk(
  "deleteImages",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.delete(
        `${BASE_URL}/image/boast/${payload}`,
        config
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __getFollowInfo = createAsyncThunk(
  "getFollowInfo",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.post(
        `${BASE_URL}/follow/${payload}`,
        null,
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __getFollowingList = createAsyncThunk(
  "__getFollowingList",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(`${BASE_URL}/followings/${payload}`, config);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __getOtherFollowingList = createAsyncThunk(
  "__getOtherFollowingList",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(`${BASE_URL}/followings/${payload}`, config);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __getFollowerList = createAsyncThunk(
  "getFollowerList",
  async (payload, thunkAPI) => {
    try {
      // let accessToken = localStorage.getItem("accessToken");
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // };

      const data = await axios.get(`${BASE_URL}/followers/${payload}`);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __getFollowCnt = createAsyncThunk(
  "getFollowCnt",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(`${BASE_URL}/follow/${payload}`, config);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

const initialState = {
  userinfo: [],
  images: [],
  profileImage: [],
  motto: [],
  followcnt: [],
};

export const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    // displayNone: (state, action) => {
    //   state.profilePhotoBtn = action.payload;
    // },
  },
  extraReducers: {
    [__getMyInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload[0]);
      state.userinfo = action.payload[0];
    },
    [__getMyInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getOtherInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getOtherInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    },
    [__getOtherInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__postProfileImg.pending]: (state) => {
      state.isLoading = true;
    },
    [__postProfileImg.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.profileImage.push(...action.payload);
    },
    [__postProfileImg.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getImages.pending]: (state) => {
      state.isLoading = true;
    },
    [__getImages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.images = action.payload;
    },
    [__getImages.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postImages.pending]: (state) => {
      state.isLoading = true;
    },
    [__postImages.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__postImages.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteImages.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteImages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.images = state.images.filter(
        (data) => data.id !== Number(action.payload)
      );
    },
    [__deleteImages.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getFollowInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getFollowInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__getFollowInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getFollowingList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getFollowingList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.following = action.payload;
    },
    [__getFollowingList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getFollowerList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getFollowerList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.follower = action.payload;
    },
    [__getFollowerList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getOtherFollowingList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getOtherFollowingList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.otherfollowing = action.payload;
    },
    [__getOtherFollowingList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getFollowCnt.pending]: (state) => {
      state.isLoading = true;
    },
    [__getFollowCnt.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.followcnt = action.payload;
    },
    [__getFollowCnt.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { displayNone } = mySlice.actions;
export default mySlice.reducer;
