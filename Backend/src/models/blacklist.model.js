import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

blacklistTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const blacklistTokenModel = mongoose.model(
  "BlacklistToken",
  blacklistTokenSchema,
);

export default blacklistTokenModel;
