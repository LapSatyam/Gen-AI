import mongoose from "mongoose";

/**
 *  - job description
 *  - resume text
 *  - Self description
 *
 * - Texhnical questions
 * - Behavioral questions
 * - Skill gaps : []
 * - preparation plan
 */

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    focus: {
      type: String,
      required: true,
    },
    tasks: {
      type: [String],
      required: true,
    },
  },
  { _id: false },
);


const interviewReportSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
    },
    targetRole: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    resume: String,
    selfDescription: String,

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    technicalQuestions: [questionSchema],
    behavioralQuestions: [questionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = mongoose.model(
  "Interview_Report",
  interviewReportSchema,
);

export default interviewReportModel;
