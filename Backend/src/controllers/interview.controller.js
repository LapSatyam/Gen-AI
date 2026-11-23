import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

export default async function generateInterviewReportController(req, res) {
  const resumeContent = await new PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();

  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    ...interviewReportByAi,
    jobDescription,
    resume: resumeContent.text,
    selfDescription,
    user: req.user.id,
  });

  return res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
}
