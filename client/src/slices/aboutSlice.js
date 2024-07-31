import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAbout = createAsyncThunk("about/fetchAbout", async () => {
  const response = await axios.get("/api/about");
  return response.data;
});

export const updateAbout = createAsyncThunk(
  "about/updateAbout",
  async (about) => {
    const response = await axios.put("/api/about", about);
    return response.data;
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateAbout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default aboutSlice.reducer;
