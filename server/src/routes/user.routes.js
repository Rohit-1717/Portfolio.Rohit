import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  forgotPassword,
} from "../controllers/user.controller.js";

import {
  addSkill,
  removeSkill,
  addCategory,
  fetchSkills,
  fetchCategories,
} from "../controllers/skills.controller.js";

import {
  updateAbout,
  fetchAbout,
  fetchAboutWithoutAuth,
} from "../controllers/about.controller.js";

import {
  uploadProfileImage,
  fetchProfileImage,
  fetchProfileImageWithoutAuth,
} from "../controllers/profileImage.controller.js";

import {
  addOrUpdateProject,
  fetchProjects,
  fetchProjectsWithoutAuth,
  deleteProject,
} from "../controllers/project.controller.js";

const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Public data fetch routes
router.get("/story", fetchAboutWithoutAuth);
router.get("/skills", fetchSkills);
router.get("/categories", fetchCategories);
router.get("/profile-image", fetchProfileImageWithoutAuth);
router.get("/projects", fetchProjectsWithoutAuth);

// Protected routes
router.use("/dashboard", verifyJWT);

// User routes
router.post("/logout", logoutUser);

// About section routes
router.put("/dashboard/story", updateAbout);
router.get("/dashboard/story", fetchAbout);
router.get("/story", fetchAboutWithoutAuth);
// Profile image routes
router.put(
  "/dashboard/profile-image",
  upload.single("profileImage"),
  uploadProfileImage
);
router.get("/dashboard/profile-image", fetchProfileImage);

// Skills routes
router.post("/dashboard/skills", addSkill);
router.delete("/dashboard/skills/:id", removeSkill);
router.post("/dashboard/categories", addCategory);
router.get("/dashboard/skills", fetchSkills);
router.get("/dashboard/categories", fetchCategories);

// Projects routes
router.put("/dashboard/projects", upload.single("image"), addOrUpdateProject);
router.get("/dashboard/projects", fetchProjects);
router.delete("/dashboard/projects/:projectId", deleteProject);

export default router;
