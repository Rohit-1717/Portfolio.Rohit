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
  addOrUpdateSkill,
  fetchSkills,
} from "../controllers/skills.controller.js";

import { updateAbout, fetchAbout } from "../controllers/about.controller.js";

import {
  uploadProfileImage,
  fetchProfileImage,
} from "../controllers/profileImage.controller.js";

import {
  addOrUpdateProject,
  fetchProjects,
} from "../controllers/project.controller.js";

const router = Router();

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Dashboard Routes (Protected routes)
router.use("/dashboard", verifyJWT);

// About section routes
router.put("/dashboard/about", updateAbout);
router.get("/dashboard/about", fetchAbout);

// Profile image routes
router.put(
  "/dashboard/profile-image/upload",
  upload.single("profileImage"),
  uploadProfileImage
);
router.get("/dashboard/profile-image", fetchProfileImage);

// Skills routes
router.put("/dashboard/skills", addOrUpdateSkill);
router.get("/dashboard/skills", fetchSkills);

// Projects routes
router.put(
  "/dashboard/projects",
  upload.single("image"), // The field name for the file should match the one used in the form-data request
  addOrUpdateProject
);
router.get("/dashboard/projects", fetchProjects);

export default router;
