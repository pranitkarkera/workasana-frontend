import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export const fetchMember = createAsyncThunk("users/fetchMember", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const memberSlice = createSlice({
  name: "user",
  initialState: {
    members: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMember.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMember.fulfilled, (state, action) => {
      state.status = "success";
      state.members = action.payload;
    });
    builder.addCase(fetchMember.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default memberSlice.reducer;
