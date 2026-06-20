import express from "express";
import multer from "multer";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import Resume from "../models/Resume.js";
import { extractText } from "../utils/extractText.js";

dotenv.config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only PDF and DOCX files are supported"));
  },
});

// POST /api/resumes  — upload + parse + AI analyze + save
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const extractedText = await extractText(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname
    );

    if (!extractedText || extractedText.length < 30) {
      return res.status(400).json({
        message: "Couldn't read enough text from that file. Try a different export of your resume.",
      });
    }

    const systemPrompt = `You are an expert technical resume reviewer and career coach.
Analyze the resume text the user provides and respond with STRICT JSON only, no markdown, no commentary, in exactly this shape:

{
  "score": <integer 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<short point>", "<short point>", "<short point>"],
  "improvements": ["<short, actionable point>", "<short, actionable point>", "<short, actionable point>"]
}

Scoring guidance:
- Weigh clarity, quantified impact/metrics, relevant skills, structure, and ATS-friendliness.
- Be honest and specific, not generic. Reference actual content from the resume where relevant.
- 3-5 items each for strengths and improvements.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: extractedText.slice(0, 12000) },
      ],
      temperature: 0.4,
      max_tokens: 800,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content;
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.status(502).json({ message: "AI returned an unexpected format. Please try again." });
    }

    const resume = await Resume.create({
      userId,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      extractedText,
      analysis: parsed.summary || "",
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
      score: typeof parsed.score === "number" ? parsed.score : 0,
    });

    res.json({ message: "Resume analyzed", resume });
  } catch (err) {
    console.log("❌ Resume analysis error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/resumes/:userId — list a user's resumes, newest first
router.get("/:userId", async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId })
      .select("-extractedText")
      .sort({ createdAt: -1 });
    res.json({ resumes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/resumes/:resumeId
router.delete("/:resumeId", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.resumeId);
    res.json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;