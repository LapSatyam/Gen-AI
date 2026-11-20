import jwt from "jsonwebtoken";
import crypto from "crypto";
import asyncHandler from "../utils/asyncHandler.js";
import confi from "../config/config.js";
import blacklistTokenModel from "../models/blacklist.model.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  // 1. Check whether token exists
  if (!token) {
    return res.status(401).json({
      messsage: "Authentication required. Please login.",
    });
  }

  // 2. Verify JWT
  let decoded;

  try {
    decoded = jwt.verify(token, confi.JWT_SECRET);
  } catch (err) {
    if (
      err.name !== "TokenExpiredError" &&
      err.name !== "JsonWebTokenError" &&
      err.name !== "NotBeforeError"
    ) {
      return res.status(401).json({
        messsage: "Invalid or expired token. Please login again.",
      });
    }

    throw err;
  }

  // 3. Hash the token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // 4. Check blacklist
  const isBlacklisted = await blacklistTokenModel.findOne({
    token: hashedToken,
  });

  if (isBlacklisted) {
    return res.status(401).json({
      messsage: "Token has been revoked, Please login again",
    });
  }

  // 5. Attach decoded payload to request
  req.user = decoded;

  // 6. Continue to next middleware/controller
  next();
});
