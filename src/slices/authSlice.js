import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("users", JSON.stringify(user));

      return { token, user };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);


export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData);
      return response.data.user;
    } catch (err) {
      // Return the server error message (if available) to the component
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

  
const initialState = {
    user: JSON.parse(localStorage.getItem("users")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  };
  
  
  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("users");
      },
    },
    extraReducers: (builder) => {
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
      builder.addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
      builder.addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
    },
  });
  
  export const { logout } = authSlice.actions;
  
  export default authSlice.reducer;