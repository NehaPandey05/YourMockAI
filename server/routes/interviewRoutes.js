import express from "express";
import Interview from "../models/Interview.js";

const router = express.Router();

// create interview
router.post("/", async (req, res) => {
  try {
    const interview = new Interview(req.body);
    await interview.save();

    res.json({ message: "Interview saved", interview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;