import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig";

export const fetchProjectsWithoutAuth = createAsyncThunk(
  "projects/fetchProjectsWithoutAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("projects");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for fetching projects with authentication (optional)
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("dashboard/projects");
      return response.data.data; // Assuming response.data.data is an array of projects
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for updating or adding a project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "dashboard/projects",
        projectData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the content type is correct for file uploads
          },
        }
      );
      return response.data.data; // Assuming response.data.data contains the updated or new project
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    data: [], // Initialize as an empty array
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Projects without Auth
      .addCase(fetchProjectsWithoutAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectsWithoutAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Validate that action.payload is an array
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProjectsWithoutAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch Projects with Auth (if needed)
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Validate that action.payload is an array
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Update/Add Project
      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedProject = action.payload;
        const index = state.data.findIndex(
          (project) => project._id === updatedProject._id
        );

        if (index !== -1) {
          // Update existing project
          state.data[index] = updatedProject;
        } else {
          // Add new project if it doesn't exist
          state.data.unshift(updatedProject); // Place new project at the start
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default projectsSlice.reducer;
