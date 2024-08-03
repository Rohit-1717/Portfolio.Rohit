import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig";

// Fetch skills (authenticated)
export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
  const response = await axiosInstance.get("dashboard/skills"); // Authenticated endpoint
  return response.data.data; // Assuming your API response structure is { data: { data: ... } }
});

// Fetch skills without authentication
export const fetchSkillsWithoutAuth = createAsyncThunk(
  "skills/fetchSkillsWithoutAuth",
  async () => {
    const response = await axiosInstance.get("skills"); // Public endpoint
    return response.data.data; // Assuming your API response structure is { data: { data: ... } }
  }
);

// Update skills (authenticated)
export const updateSkills = createAsyncThunk(
  "skills/updateSkills",
  async (skillData) => {
    const response = await axiosInstance.put("dashboard/skills", skillData); // Authenticated endpoint
    return response.data.data; // Assuming your API response structure is { data: { data: ... } }
  }
);

// Define the skills slice
const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSkillsWithoutAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkillsWithoutAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSkillsWithoutAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default skillsSlice.reducer;
