import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig";

// Define the thunk to fetch story without authentication
export const fetchMyStoryWithoutAuth = createAsyncThunk(
  "about/fetchMyStoryWithoutAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/story"); // Ensure the endpoint is correct
      return response.data.story || ""; // Adjust if the structure is different
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch story"
      );
    }
  }
);

// Define the thunk to update the story
export const updateStory = createAsyncThunk(
  "about/updateStory",
  async (storyData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/story", storyData); // Ensure the endpoint is correct
      return response.data.story || ""; // Adjust if the structure is different
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update story"
      );
    }
  }
);

// Create the slice
const aboutSlice = createSlice({
  name: "about",
  initialState: {
    story: "", // Initialize with an empty string
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyStoryWithoutAuth.pending, (state) => {
        state.status = "loading"; // Set loading state
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchMyStoryWithoutAuth.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set succeeded state
        state.story = action.payload; // Update story with the fetched data
      })
      .addCase(fetchMyStoryWithoutAuth.rejected, (state, action) => {
        state.status = "failed"; // Set failed state
        state.error = action.payload; // Set error message
      })
      .addCase(updateStory.pending, (state) => {
        state.status = "loading"; // Set loading state
        state.error = null; // Clear any previous errors
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set succeeded state
        state.story = action.payload; // Update story with the updated data
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.status = "failed"; // Set failed state
        state.error = action.payload; // Set error message
      });
  },
});

export default aboutSlice.reducer;
