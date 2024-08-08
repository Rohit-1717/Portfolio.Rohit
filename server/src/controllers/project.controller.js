import { asyncHandler } from "../utils/asyncHandler.js";
import { Project } from "../models/project.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs/promises";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add or update project
const addOrUpdateProject = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // Extract userId from req.user
  const { title, description, link, technologies } = req.body;

  // Validate required fields
  if (!userId) {
    throw new ApiError(401, "User ID is required.");
  }

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required.");
  }

  let imageUrl = "";

  // Handle image upload if file is provided
  if (req.file) {
    const uploadResult = await uploadOnCloudinary(req.file.path);

    if (!uploadResult) {
      throw new ApiError(500, "Failed to upload image to Cloudinary.");
    }

    imageUrl = uploadResult.secure_url;

    // Clean up the temporary file
    try {
      await fs.unlink(req.file.path);
    } catch (err) {
      console.error(`Failed to delete temp file: ${err.message}`);
    }
  }

  // Create or update project
  const projectData = {
    userId,
    title,
    description,
    link,
    technologies,
    image: imageUrl,
  };

  let project = await Project.findOne({ userId, title });

  if (project) {
    // Update existing project
    project.description = description;
    project.link = link;
    project.technologies = technologies;
    project.image = imageUrl || project.image; // Retain existing image if no new image is provided
  } else {
    // Create a new project
    project = new Project(projectData);
  }

  await project.save();

  res
    .status(200) // Updated status code to 200 (success) instead of 201 (created)
    .json(
      new ApiResponse(200, project, "Project added or updated successfully.")
    );
});

// Fetch all projects for a user
const fetchProjects = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // Extract userId from req.user

  if (!userId) {
    throw new ApiError(401, "User ID is required.");
  }

  const projects = await Project.find({ userId }).sort({ createdAt: -1 }); // Sort by latest first

  if (projects.length === 0) {
    throw new ApiError(404, "No projects found for this user.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully."));
});

// Fetch all projects without authentication
const fetchProjectsWithoutAuth = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find();

    res
      .status(200)
      .json(new ApiResponse(200, projects, "Projects fetched successfully."));
  } catch (error) {
    res.status(500).json(new ApiError(500, error.message));
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // Extract userId from req.user
  const { projectId } = req.params;

  if (!userId) {
    throw new ApiError(401, "User ID is required.");
  }

  const project = await Project.findOne({ _id: projectId, userId });

  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  // Optionally, delete the image from Cloudinary if required
  if (project.image) {
    // Implement your image deletion logic here if needed
  }

  await Project.findByIdAndDelete(projectId);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Project deleted successfully."));
});

export {
  addOrUpdateProject,
  fetchProjects,
  fetchProjectsWithoutAuth,
  deleteProject,
};
