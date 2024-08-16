import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/tokenUtils.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request. Token is missing.");
    }

    if (typeof token !== "string" || token.trim() === "") {
      throw new ApiError(401, "Invalid token format.");
    }

    const decodedToken = verifyAccessToken(token);

    if (!decodedToken || !decodedToken.id) {
      throw new ApiError(401, "Invalid token payload.");
    }

    const user = await User.findById(decodedToken.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "User not found or invalid access token.");
    }

    req.user = user; // Corrected here
    next();
  } catch (error) {
    // console.error("Error verifying access token:", error);
    if (error instanceof ApiError) {
      throw error;
    } else if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token has expired.");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid access token.");
    } else {
      throw new ApiError(401, "Authentication failed.");
    }
  }
});
