import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
// Middleware to parse incoming JSON request bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());
// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Import all the routes here
import authRouter from "./routes/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import interviewRouter from "./routes/interview.route.js";

// Using all the routes here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

// centralized error handling
app.use(errorMiddleware);
app.use(authMiddleware);

export default app;
