import { GoogleGenAI } from "@google/genai";
import confi from "../config/config.js";

const ai = new GoogleGenAI({
  apiKey: confi.GOOGLE_GENAI_API_KEY,
});

async function invokeGeminiAI() {
  const { text } = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: "Hello gemini! Explain what is interview in short?",
  });

  console.log(text);
}

export default invokeGeminiAI;
