import { asyncHandler } from "../utils/asyncHandler.js";
import { About } from "../models/about.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Update About section
const updateAbout = asyncHandler(async (req, res) => {
  const { story } = req.body;
  const { user } = req;

  if (!story || typeof story !== "string") {
    throw new ApiError(400, "A valid story is required.");
  }

  if (story.length > 1000) {
    throw new ApiError(
      400,
      "Story is too long. Please keep it under 1000 characters."
    );
  }

  let about = await About.findOne({ userId: user._id });

  if (!about) {
    about = new About({ story, userId: user._id });
  } else {
    about.story = story;
  }

  await about.save();

  res
    .status(200)
    .json(new ApiResponse(200, about, "About section updated successfully."));
});

// Fetch About section
const fetchAbout = asyncHandler(async (req, res) => {
  const { user } = req; // Assuming `user` is attached by `verifyJWT`

  const about = await About.findOne({ userId: user._id });

  if (!about) {
    throw new ApiError(404, "About section not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, about, "About section fetched successfully."));
});

export { updateAbout, fetchAbout };
