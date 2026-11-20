import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import confi from "../config/config.js";
import asyncHandler from "../utils/asyncHandler.js";
import blacklistTokenModel from "../models/blacklist.model.js";
import crypto from "crypto";

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      message: "Please enter a valid username, email and password",
    });
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist?.username === username) {
    return res.status(409).json({
      message: "Username already exists!",
    });
  }
  if (isUserAlreadyExist?.email === email) {
    return res.status(409).json({
      message: "Email already exists!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    confi.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: confi.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
export const registerUser = asyncHandler(registerUserController);

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      message: "Please provide a valid email and password",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await userModel
    .findOne({
      email: normalizedEmail,
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    confi.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: confi.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "User logged In successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
export const loginUser = asyncHandler(loginUserController);

/**
 * @name loginUserController
 * @description logs out the user and blacklists the token
 * @access Public
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, confi.JWT_SECRET);

      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      await blacklistTokenModel.create({
        token: hashedToken,
        expiresAt: new Date(decoded.exp * 1000),
      });
    } catch (err) {
      if (
        err.name !== "TokenExpiredError" &&
        err.name !== "JsonWebTokenError" &&
        err.name !== "NotBeforeError" &&
        !(err instanceof SyntaxError)
      ) {
        throw err;
      }
    }
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: confi.NODE_ENV === "production",
  });

  return res.status(200).json({
    message: "User logged out successfully",
  });
}
export const logoutUser = asyncHandler(logoutUserController);

/**
 * @name getUserProfileController
 * @description fetches current logged In user profile
 * @access Private
 */
async function getUserProfileController(req, res) {
  const user = await userModel
    .findById(req.user.id)
    .select("_id username email")
    .lean();

  if (!user) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  return res.status(200).json({
    message: "User profile fetched successfully",
    user,
  });
}
export const getUserProfile = asyncHandler(getUserProfileController);
