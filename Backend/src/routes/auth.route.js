import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUser);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", loginUser);

/**
 * @route GET /api/auth/logout
 * @description token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout", logoutUser);

/**
 * @route GET /api/auth/profile
 * @description fetch the current logged in user details
 * @access Private
 */
authRouter.get("/profile", authMiddleware, getUserProfile);

export default authRouter;
