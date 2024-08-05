import { asyncHandler } from "../utils/asyncHandler.js";
import { About } from "../models/about.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Update About section
const updateAbout = asyncHandler(async (req, res) => {
  const { story } = req.body;
  const { user } = req;

  // Validate user
  if (!user) {
    throw new ApiError(401, "User not authenticated.");
  }

  // Validate input
  if (!story || typeof story !== "string") {
    throw new ApiError(400, "A valid story is required.");
  }

  if (story.length > 1000) {
    throw new ApiError(
      400,
      "Story is too long. Please keep it under 1000 characters."
    );
  }

  // Find or create About document
  let about = await About.findOne({ userId: user._id });

  if (!about) {
    about = new About({ story, userId: user._id });
  } else {
    about.story = story;
  }

  // Save the document
  await about.save();

  res
    .status(200)
    .json(new ApiResponse(200, about, "About section updated successfully."));
});

// Fetch About section (Authenticated)
const fetchAbout = asyncHandler(async (req, res) => {
  const { user } = req;

  // Validate user
  if (!user) {
    throw new ApiError(401, "User not authenticated.");
  }

  // Fetch About document
  const about = await About.findOne({ userId: user._id });

  if (!about) {
    throw new ApiError(404, "About section not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, about, "About section fetched successfully."));
});

// Fetch About section (Public)
const fetchAboutWithoutAuth = asyncHandler(async (req, res) => {
  // Fetch About document for the first available user (public access)
  const about = await About.findOne().sort({ createdAt: -1 }); // Fetch the latest 'About' section if multiple exist

  if (!about) {
    throw new ApiError(404, "About section not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, about, "About section fetched successfully."));
});

export { updateAbout, fetchAbout, fetchAboutWithoutAuth };
