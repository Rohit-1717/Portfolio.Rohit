import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import { generateAccessAndRefreshToken } from "../utils/tokenUtils.js";
import sendMail from "../utils/sendMail.js";
import bcrypt from "bcrypt";

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if (!username || !fullName || !email || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    fullName,
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    newUser._id
  );

  res.status(201).json(
    new ApiResponse(
      201,
      {
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
        accessToken,
        refreshToken,
      },
      "User registered successfully."
    )
  );
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Username and password are required.");
  }

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "Invalid username or password.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: { id: user._id, username: user.username } },
        "Login successful."
      )
    );
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  // Clear the access token cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // Clear the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // Send a success response
  res.status(200).json(new ApiResponse(200, {}, "Logged out successfully"));
});

// Password Reset Request
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required.");
  }

  // Check if the user with the provided email exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set reset token and its expiration time on the user document
  user.resetToken = resetTokenHash;
  user.resetTokenExpiration = Date.now() + 60 * 60 * 1000; // 1 hour expiration
  await user.save({ validateBeforeSave: false });

  // Construct the password reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // Construct the email message
  const message = `
    <h1>Password Reset Request</h1>
    <p>Please use the following link to reset your password:</p>
    <a href="${resetUrl}" target="_blank">${resetUrl}</a>
  `;

  // Send the password reset email
  try {
    await sendMail({
      email,
      subject: "Password Reset Request",
      message,
      isHtml: true, // Send as HTML email
    });

    res
      .status(200)
      .json(new ApiResponse(200, null, "Password reset email sent."));
  } catch (error) {
    // Handle errors in sending email
    console.error("Error sending email:", error);
    throw new ApiError(500, "Failed to send password reset email.");
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token || !password) {
    throw new ApiError(400, "Token and password are required.");
  }

  const resetTokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetToken: resetTokenHash,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired token.");
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset successful."));
});

// Refresh Token
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(400, "Refresh token is required.");
  }

  const user = await verifyRefreshToken(refreshToken);

  const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  res.json(
    new ApiResponse(
      200,
      {
        accessToken,
        refreshToken: newRefreshToken,
      },
      "Tokens refreshed successfully."
    )
  );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  refreshToken,
};
