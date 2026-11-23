import { GoogleGenAI } from "@google/genai";
import confi from "../config/config.js";
import { z } from "zod";

const ai = new GoogleGenAI({
  apiKey: confi.GOOGLE_GENAI_API_KEY,
});

const InterviewReportSchema = z.object({
  candidate_name: z.string().describe("The name of the candidate"),

  target_role: z
    .string()
    .describe("The job role for which the candidate is applying"),

  match_score: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "A score between 0 and 100 indicating how well the candidate matches the job description",
    ),

  technical_questions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical question that can be asked in the interview",
          ),

        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question",
          ),

        answer: z
          .string()
          .describe(
            "How to answer this question, including key points and the recommended approach",
          ),
      }),
    )
    .describe(
      "Technical interview questions with their intentions and suggested answers",
    )
    .max(4),

  behavioral_questions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The behavioral question that can be asked in the interview",
          ),

        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question",
          ),

        answer: z
          .string()
          .describe(
            "How to answer this question, including relevant examples and recommended approaches",
          ),
      }),
    )
    .describe(
      "Behavioral interview questions with their intentions and suggested answers",
    ),

  skill_gaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "The skill that the candidate is lacking or needs to improve",
          ),

        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap based on its importance to the target role",
          ),
      }),
    )
    .describe("Identified skill gaps with their severity")
    .max(4),

  preparation_plan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),

        focus: z.string().describe("The main focus of this preparation day"),

        tasks: z
          .array(z.string())
          .describe("Actionable tasks to complete during this preparation day"),
      }),
    )
    .describe("A structured day-wise interview preparation plan")
    .max(5),
});

const interviewReportJsonSchema = z.toJSONSchema(InterviewReportSchema);

export default async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const prompt = `
      You are an expert technical interviewer and career evaluator.

      Generate a comprehensive interview preparation report.

      Follow the provided JSON schema exactly.
      Do not rename, omit, or add properties.
      Maintain the correct data types.
      Never convert nested objects into strings.
      Do not invent candidate experience or qualifications.

      Analyze the candidate's skills against the job requirements.

      Generate:
      - 5-10 technical questions with intentions and answers.
      - 5-8 behavioral questions with intentions and answers.
      - Relevant skill gaps with severity.
      - A practical 6-10 day preparation plan.

      RESUME:
      ${resume}

      SELF-DESCRIPTION:
      ${selfDescription}

      JOB DESCRIPTION:
      ${jobDescription}
    `;

    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: prompt,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: interviewReportJsonSchema,
      },
    });

    if (!interaction.output_text) {
      throw new Error("Empty response from Gemini");
    }

    const parsedResponse = JSON.parse(interaction.output_text);

    const { data, success } = InterviewReportSchema.safeParse(parsedResponse);

    if (!success) {
      console.error("Validation errors:", result.error.issues);
      console.dir(parsedResponse, { depth: null });

      throw new Error("Invalid interview report structure");
    }

    return {
      candidateName: data.candidate_name,
      targetRole: data.target_role,
      matchScore: data.match_score,

      technicalQuestions: data.technical_questions,
      behavioralQuestions: data.behavioral_questions,
      skillGaps: data.skill_gaps,
      preparationPlan: data.preparation_plan,
    };
  } catch (error) {
    console.error("Interview report generation failed:", error);
    throw error;
  }
}
