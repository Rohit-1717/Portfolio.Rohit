import { asyncHandler } from "../utils/asyncHandler.js";
import { ProfileImage } from "../models/profileImage.modal.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs/promises";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Upload profile image
const uploadProfileImage = asyncHandler(async (req, res) => {
  const { user } = req;

  if (!req.file) {
    throw new ApiError(400, "No file uploaded.");
  }

  console.log(req.file);

  const uploadResult = await uploadOnCloudinary(req.file.path);
  if (!uploadResult) {
    throw new ApiError(500, "Failed to upload image to Cloudinary.");
  }

  try {
    await fs.unlink(req.file.path);
  } catch (err) {
    console.error(`Failed to delete temp file: ${err.message}`);
  }

  let profileImage = await ProfileImage.findOne({ userId: user._id });

  if (!profileImage) {
    profileImage = new ProfileImage({
      userId: user._id,
      imageUrl: uploadResult.secure_url,
    });
  } else {
    profileImage.imageUrl = uploadResult.secure_url;
  }

  await profileImage.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { imageUrl: profileImage.imageUrl },
        "Profile image uploaded successfully."
      )
    );
});

// Fetch Profile Image
const fetchProfileImage = asyncHandler(async (req, res) => {
  const { user } = req;

  const profileImage = await ProfileImage.findOne({ userId: user._id });

  if (!profileImage) {
    throw new ApiError(404, "Profile image not found.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { imageUrl: profileImage.imageUrl },
        "Profile image fetched successfully."
      )
    );
});

const fetchProfileImageWithoutAuth = asyncHandler(async (req, res) => {
  try {
    const profileImage = await ProfileImage.findOne();

    if (!profileImage) {
      throw new ApiError(404, "Profile image not found.");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { imageUrl: profileImage.imageUrl },
          "Profile image fetched successfully."
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { uploadProfileImage, fetchProfileImage, fetchProfileImageWithoutAuth };
