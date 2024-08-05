import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig";

const initialState = {
  story: null,
  status: "idle",
  error: null,
};

// Fetch My Story Without Auth
export const fetchMyStoryWithoutAuth = createAsyncThunk(
  "about/fetchMyStoryWithoutAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/story");
      // Adjust this line to match your API response structure
      return response.data.data.story; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch story"
      );
    }
  }
);

// Update My Story
export const updateMyStory = createAsyncThunk(
  "about/updateMyStory",
  async (storyData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/dashboard/story", storyData);
      return response.data.data.story; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update story"
      );
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyStoryWithoutAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyStoryWithoutAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.story = action.payload;
      })
      .addCase(fetchMyStoryWithoutAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateMyStory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMyStory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.story = action.payload; // Update the story with the new data
      })
      .addCase(updateMyStory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default aboutSlice.reducer;
