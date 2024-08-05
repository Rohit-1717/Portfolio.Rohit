import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig"; // Import the configured Axios instance

// Thunk for uploading profile image
export const uploadProfileImage = createAsyncThunk(
  "profile/uploadProfileImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "dashboard/profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for fetching profile image with authentication
export const fetchProfileImage = createAsyncThunk(
  "profile/fetchProfileImage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("dashboard/profile-image");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for fetching profile image without authentication
export const fetchProfileImageWithoutAuth = createAsyncThunk(
  "profile/fetchProfileImageWithoutAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("profile-image");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    image: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.image = action.payload.imageUrl; // Storing the image URL
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProfileImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.image = action.payload.imageUrl; // Storing the fetched image URL
      })
      .addCase(fetchProfileImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProfileImageWithoutAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileImageWithoutAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.image = action.payload.imageUrl; // Storing the fetched image URL without auth
      })
      .addCase(fetchProfileImageWithoutAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default profileSlice.reducer;
