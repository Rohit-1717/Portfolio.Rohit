import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadProfileImage = createAsyncThunk('profile/uploadProfileImage', async (formData) => {
  const response = await axios.post('/api/profile-image', formData);
  return response.data;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    image: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.image = action.payload;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
