import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fileName: String,
  fileType: String,
  extractedText: String,
  analysis: String,
  strengths: [String],
  improvements: [String],
  score: Number,
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);