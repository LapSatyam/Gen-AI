import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import invokeGeminiAI from "./src/services/ai.service.js";

async function startServer() {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

    await invokeGeminiAI();
  } catch (err) {
    console.error("Failed to Start server: ", err.message);
    process.exit(1);
  }
}

startServer();
