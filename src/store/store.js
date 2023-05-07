import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { authApi } from "./auth/authService";
import storySlice from "./story/storySlice";
import voteSlice from "./voteSlice";
import commentSlice from "./commentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    story: storySlice,
    vote: voteSlice,
    comment: commentSlice,
    // [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
