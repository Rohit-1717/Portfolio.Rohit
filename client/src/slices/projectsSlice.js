import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig";

// Thunks for various actions
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

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("dashboard/projects");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "dashboard/projects",
        projectData,
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

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`dashboard/projects/${projectId}`);
      return projectId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const setBestProjects = createAsyncThunk(
  "projects/setBestProjects",
  async (bestProjects, { rejectWithValue }) => {
    try {
      // Customize this if needed for interacting with an API
      return bestProjects;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// New thunk for setting target titles
export const setTargetTitles = createAsyncThunk(
  "projects/setTargetTitles",
  async (titles, { rejectWithValue }) => {
    try {
      return titles;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    data: [], // Array of all projects
    bestProjects: [], // Array of best projects
    targetTitles: [], // Array of target titles
    status: "idle",
    error: null,
  },
  reducers: {
    addBestProject: (state, action) => {
      state.bestProjects.push(action.payload);
    },
    removeBestProject: (state, action) => {
      state.bestProjects = state.bestProjects.filter(
        (project) => project._id !== action.payload
      );
    },
    // New reducer to update target titles
    updateTargetTitles: (state, action) => {
      state.targetTitles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects without Auth
      .addCase(fetchProjectsWithoutAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectsWithoutAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProjectsWithoutAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch Projects with Auth
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
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
          state.data[index] = updatedProject;
        } else {
          state.data.unshift(updatedProject);
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (project) => project._id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Set Best Projects
      .addCase(setBestProjects.fulfilled, (state, action) => {
        state.bestProjects = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(setBestProjects.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // Set Target Titles
      .addCase(setTargetTitles.fulfilled, (state, action) => {
        state.targetTitles = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(setTargetTitles.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { addBestProject, removeBestProject, updateTargetTitles } =
  projectsSlice.actions;
export default projectsSlice.reducer;
