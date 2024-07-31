import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/slices/authSlice";
import profileReducer from "./src/slices/profileSlice";
import skillsReducer from "./src/slices/skillsSlice";
import projectsReducer from "./src/slices/projectsSlice";
import aboutReducer from "./src/slices/aboutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    skills: skillsReducer,
    projects: projectsReducer,
    about: aboutReducer,
  },
});

export default store;
