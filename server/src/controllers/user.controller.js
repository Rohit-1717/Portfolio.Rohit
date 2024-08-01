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

  // Initialize an errors object to collect field-specific errors
  const errors = {};

  // Check for all fields
  if (!username) {
    errors.username = "Username is required.";
  }
  if (!fullName) {
    errors.fullName = "Full Name is required.";
  }
  if (!email) {
    errors.email = "Email is required.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }

  // Check password length
  if (password && password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  // If there are any errors, return them
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Check if email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      errors: {
        email:
          "User with this email already exists. Please use a different email.",
      },
    });
  }

  // Check if username is already taken
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({
      errors: {
        username: "Username already taken. Please choose a different username.",
      },
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await User.create({
    username,
    fullName,
    email,
    password: hashedPassword,
  });

  // Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    newUser._id
  );

  // Send response
  res.status(201).json({
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    accessToken,
    refreshToken,
    message: "User registered successfully.",
  });
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Initialize an errors object to collect field-specific errors
  const errors = {};

  // Check for all fields
  if (!username) {
    errors.username = "Username is required.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }

  // If there are any errors, return them
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({
      errors: { username: "Invalid username or password." },
    });
  }

  // Check password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({
      errors: { password: "Invalid username or password." },
    });
  }

  // Generate tokens
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

  // Send response
  res.status(200).json({
    user: { id: user._id, username: user.username },
    message: "Login successful.",
  });
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  try {
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
    res.status(200).json({
      message: "Logged out successfully.",
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({
      error: "An unexpected error occurred. Please try again.",
    });
  }
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

  try {
    // Send the password reset email
    await sendMail({
      email,
      subject: "Password Reset Request",
      message,
      isHtml: true, // Send as HTML email
    });

    res.status(200).json({
      message: "Password reset email sent.",
    });
  } catch (error) {
    // Handle errors in sending email
    console.error("Error sending email:", error);
    throw new ApiError(
      500,
      "Failed to send password reset email. Please try again later."
    );
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

  try {
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({
      message: "Password reset successful.",
    });
  } catch (error) {
    // Handle errors in updating user password
    console.error("Error resetting password:", error);
    throw new ApiError(
      500,
      "Failed to reset password. Please try again later."
    );
  }
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
