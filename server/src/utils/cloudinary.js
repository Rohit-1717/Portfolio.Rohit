import dotenv from "dotenv";

dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Your uploadOnCloudinary function
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const absolutePath = path.resolve(localFilePath);

    const uploadResult = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "image",
    });

    // console.log("File is uploaded on Cloudinary:", uploadResult.secure_url);
    return uploadResult;
  } catch (error) {
    // console.error("Cloudinary upload error:", error.message);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
