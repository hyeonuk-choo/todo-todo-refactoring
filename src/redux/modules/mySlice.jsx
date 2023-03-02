import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import defaultProfile from "../../assets/img/defaultProfile.jpg";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  followcnt: null,
  follower: null,
  otherfollowing: null,
  following: null,
  userInfo: null,
  otherUserInfo: null,
  images: [],
  profileImage: [], //주의
  isLoading: false,
  error: null,
  motto: null,
  profilePhotoBtn: "flex",
};

export const __getMyInfo = createAsyncThunk(
  "getMyInfo",
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

export const __getOtherInfo = createAsyncThunk(
  "getMyInfo",
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
      let accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(`${BASE_URL}/followers/${payload}`, config);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __getFollowCnt = createAsyncThunk(
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

      const data = await axios.get(`${BASE_URL}/follow/${payload}`, config);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    displayNone: (state, action) => {
      state.profilePhotoBtn = action.payload;
    },
  },
  extraReducers: {
    //__getMyInfo
    [__getMyInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    },
    [__getMyInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //getOtherInfo
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
    //__postProfileImg
    [__postProfileImg.pending]: (state) => {
      state.isLoading = true;
    },
    [__postProfileImg.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.profileImage.push(...action.payload); //주의
    },
    [__postProfileImg.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__getImages
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
      // state.images.push(action.payload);
    },
    [__postImages.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__deleteImages
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
    //__getFollowInfo
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
    //__getFollowingList
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
    //__getFollowerList
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
    //__getOtherFollowingList
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
    // __getFollowCnt
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
