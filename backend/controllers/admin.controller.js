import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../utils/cookieOptions.js";

import asyncHandler from "../middleware/asyncHandler.js";

export const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const accessToken = generateAccessToken(admin._id);

  const refreshToken = generateRefreshToken(admin._id);

  res.cookie(
    "accessToken",
    accessToken,
    accessCookieOptions
  );

  res.cookie(
    "refreshToken",
    refreshToken,
    refreshCookieOptions
  );

  return res.status(200).json({
    success: true,
    message: "Login successful",
    admin: {
      id: admin._id,
      username: admin.username,
    },
  });
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select(
    "-password"
  );

  return res.status(200).json({
    success: true,
    admin,
  });
});

export const refreshAccessToken = asyncHandler(
  async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const accessToken = generateAccessToken(decoded.id);

    res.cookie(
      "accessToken",
      accessToken,
      accessCookieOptions
    );

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
    });
  }
);