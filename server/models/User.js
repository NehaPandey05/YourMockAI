import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  stats: {
    interviews: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    resumes: { type: Number, default: 0 },
  },

  activity: [
    {
      text: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("User", userSchema);