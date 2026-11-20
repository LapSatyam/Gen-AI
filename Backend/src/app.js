import express from "express";
import cookieParser from "cookie-parser";

const app = express();
// Middleware to parse incoming JSON request bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());

// Import all the routes here
import authRouter from "./routes/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

// Using all the routes here
app.use("/api/auth", authRouter);

// centralized error handling
app.use(errorMiddleware);
app.use(authMiddleware);

export default app;
