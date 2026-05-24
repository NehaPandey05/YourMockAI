import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fileUrl: String,
  analysis: String,
  score: Number,
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);