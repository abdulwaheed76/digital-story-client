import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "https://digital-stories-ten.vercel.app"

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, userName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}/api/auth/register`,
        { name, email, password },
        config
      );
    } catch (error) {
      console.log(error)
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.post(
          `${backendURL}/api/auth/login`,
          { email, password },
          config
        )
        // store user's token in local storage
        localStorage.setItem('userToken', data.userLoged.token)
        localStorage.setItem('userInfo', JSON.stringify(data.userLoged))
        return data.userLoged
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )