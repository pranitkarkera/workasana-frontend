import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export const addNewTeam = createAsyncThunk(
  "project/addNewTeam",
  async (projData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/teams`, projData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);
export const fetchTeams = createAsyncThunk("project/fetchTeams", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/teams`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async ({ teamId, updatedTeam }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/teams/${teamId}`,
      updatedTeam,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.team;
  }
);

export const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.status = "success";
      state.teams = action.payload;
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addNewTeam.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewTeam.fulfilled, (state, action) => {
      state.status = "success";
      state.teams.push(action.payload);
    });
    builder.addCase(addNewTeam.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(updateTeam.fulfilled, (state, action) => {
      const index = state.teams.findIndex(
        (team) => team._id === action.payload._id
      );
      if (index !== -1) {
        state.teams[index] = action.payload;
      }
    });
  },
});

export default teamSlice.reducer;
