import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const backendURL = "http://localhost:3000";

const initialState = {
  loading: false,
  error: null,
  success: false,
  comments: [],
  commentAdded : false
};
export const makeComment = createAsyncThunk(
  "comment/make",
  async ({ comment, userId, storyId }, { rejectWithValue }) => {
    console.log("comment", comment, "userid",userId,"storyid", storyId)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}/api/comment/makecomment`,
        { comment, userId, storyId },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getComment = createAsyncThunk("comment/get", async (id) => {
  return axios
    .get(`${backendURL}/api/comment/getcomment/${id}`)
    .then((response) => response.data);
});
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [makeComment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [makeComment.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.commentAdded = true;
    },
    [makeComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //get
    [getComment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.comments = payload;
    },
    [getComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
// export const { logout } = storySlice.actions;

export default commentSlice.reducer;
