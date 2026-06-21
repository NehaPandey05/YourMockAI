

import express from "express"
import Interview from "../models/Interview.js"

const router = express.Router()

router.get("/:userId", async (req, res) => {
  try {
    const interviews = await Interview.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 })

    res.json(interviews)
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

export default router