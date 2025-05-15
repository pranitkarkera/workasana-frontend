import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});


export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
    logout: (state) => {
      state.users = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
