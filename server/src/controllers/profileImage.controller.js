import { asyncHandler } from "../utils/asyncHandler.js";
import { ProfileImage } from "../models/profileImage.modal.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs/promises";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Upload profile image
const uploadProfileImage = asyncHandler(async (req, res) => {
  const { user } = req;

  // Ensure a file was uploaded
  if (!req.file) {
    throw new ApiError(400, "No file uploaded.");
  }

  // Upload the file to Cloudinary
  const uploadResult = await uploadOnCloudinary(req.file.path);
  if (!uploadResult) {
    throw new ApiError(500, "Failed to upload image to Cloudinary.");
  }

  // Clean up the temporary file
  try {
    await fs.unlink(req.file.path);
  } catch (err) {
    console.error(`Failed to delete temp file: ${err.message}`);
  }

  // Check if the user already has a profile image
  let profileImage = await ProfileImage.findOne({ userId: user._id });

  if (!profileImage) {
    // If no profile image exists, create a new one
    profileImage = new ProfileImage({
      userId: user._id,
      imageUrl: uploadResult.secure_url,
    });
  } else {
    // If a profile image already exists, update the URL
    profileImage.imageUrl = uploadResult.secure_url;
  }

  // Save the profile image in the database
  await profileImage.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, profileImage, "Profile image uploaded successfully.")
    );
});

// Fetch Profile Image
const fetchProfileImage = asyncHandler(async (req, res) => {
  const { user } = req; // Assuming `user` is attached by `verifyJWT`

  const profileImage = await ProfileImage.findOne({ userId: user._id });

  if (!profileImage) {
    throw new ApiError(404, "Profile image not found.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, profileImage, "Profile image fetched successfully.")
    );
});

export { uploadProfileImage, fetchProfileImage };
