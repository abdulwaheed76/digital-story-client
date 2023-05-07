import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const backendURL = "http://localhost:3000";

const initialState = {
  loading: false,
  error: null,
  successGet: false,
  votes: [],
  voted: false,
};
export const makeVote = createAsyncThunk(
  "vote/make",
  async ({ storyId, userId, upVote, downVote }) => {
    return axios
      .post(`${backendURL}/api/vote/makevote`, {
        storyId,
        userId,
        upVote,
        downVote,
      })
      .then((response) => response.data);
  }
);

export const getVote = createAsyncThunk(
  "vote/get",
  async ({ storyId, userId }) => {
    return axios
      .get(`${backendURL}/api/vote/getvote/${storyId}/${userId}`)
      .then((response) => response.data);
  }
);

export const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {},
  extraReducers: {
    [makeVote.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [makeVote.fulfilled]: (state) => {
      state.loading = false;
      state.successGet = false;
      state.voted = true;
    },
    [makeVote.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //get
    [getVote.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getVote.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.successGet = true;
      state.voted = false;
      state.votes = payload;
    },
    [getVote.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
// export const { logout } = storySlice.actions;

export default voteSlice.reducer;
