import { asyncHandler } from "../utils/asyncHandler.js";
import { Skill } from "../models/skills.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add or update skill
const addOrUpdateSkill = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // Extract userId from req.user

  if (!userId) {
    throw new ApiError(401, "User ID is required.");
  }

  const { frontend, backend, softSkills } = req.body;

  // Validate required fields
  if (
    !Array.isArray(frontend) ||
    !Array.isArray(backend) ||
    !Array.isArray(softSkills)
  ) {
    throw new ApiError(400, "Skills must be arrays.");
  }

  // Find or create skill entry for the user
  let skillEntry = await Skill.findOne({ user: userId });

  if (skillEntry) {
    // Update existing skill entry
    skillEntry.frontend = frontend;
    skillEntry.backend = backend;
    skillEntry.softSkills = softSkills;
  } else {
    // Create a new skill entry
    skillEntry = new Skill({
      user: userId,
      frontend,
      backend,
      softSkills,
    });
  }

  await skillEntry.save();

  res
    .status(200)
    .json(new ApiResponse(200, skillEntry, "Skills updated successfully."));
});

// Fetch all skills for a user
const fetchSkills = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // Extract userId from req.user

  if (!userId) {
    throw new ApiError(401, "User ID is required.");
  }

  const skillEntry = await Skill.findOne({ user: userId });

  if (!skillEntry) {
    throw new ApiError(404, "Skills not found for this user.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, skillEntry, "Skills fetched successfully."));
});

export { addOrUpdateSkill, fetchSkills };
