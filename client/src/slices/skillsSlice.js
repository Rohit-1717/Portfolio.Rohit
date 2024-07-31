import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const response = await axios.get('/api/skills');
  return response.data;
});

export const updateSkills = createAsyncThunk('skills/updateSkills', async (skills) => {
  const response = await axios.put('/api/skills', skills);
  return response.data;
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSkills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default skillsSlice.reducer;
