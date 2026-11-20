import mongoose from "mongoose";
import config from "./config.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

export default async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB Connected successfully!");
  } catch (err) {
    console.error("Failed to connect MongoDB: ", err.message);
    process.exit(1);
  }
}
