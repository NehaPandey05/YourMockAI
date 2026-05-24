import express from "express";
import Resume from "../models/Resume.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();

    res.json({ message: "Resume saved", resume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;