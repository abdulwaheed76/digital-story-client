import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:3000";

export const postStory = createAsyncThunk(
  "story/postStory",
  async (
    { title, description, visibility, imageUrl, userId, postedBy },
    { rejectWithValue }
  ) => {
    console.log(title, description, imageUrl, userId, postedBy);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}/api/story/createStory`,
        { title, description, visibility, imageUrl, userId, postedBy },
        config
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getStory = createAsyncThunk("story/getStory", async () => {
  return axios.get(`${backendURL}/api/story/getStory`).then(
    (response) =>
      // console.log(response);
      response.data
  );
});

export const getSingleStory = createAsyncThunk("story/getStory", async (id) => {
  return axios.get(`${backendURL}/api/story/getStory/${id}`).then(
    (response) =>
      // console.log(response);
      response.data
  );
});
