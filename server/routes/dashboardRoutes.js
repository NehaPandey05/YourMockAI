import express from "express";
import User from "../models/User.js";
import Activity from "../models/Activity.js";
import Interview from "../models/Interview.js";
import Resume from "../models/Resume.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    const activities = await Activity.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const interviews = await Interview.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const resumes = await Resume.find({ userId });

    res.json({
      user,
      activities,
      sessions:interviews,
      resumes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;