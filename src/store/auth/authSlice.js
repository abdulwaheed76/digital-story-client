import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authAction";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // ...logout reducer
      localStorage.removeItem("userToken"); // deletes token from storage
      localStorage.removeItem("userInfo"); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // login user
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success= true
      state.userInfo = payload;
      state.userToken = payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
