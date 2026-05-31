import express from "express"
import Groq from "groq-sdk"
import dotenv from "dotenv"
import Interview from "../models/Interview.js"
dotenv.config()

const router = express.Router()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post("/ask", async (req, res) => {
  try {
    const { role, messages } = req.body

    if (!role || !messages) {
      return res.status(400).json({ message: "Role and messages required" })
    }

    const systemPrompt = `You are a strict but fair technical interviewer conducting a ${role} developer interview.

Your rules:
- Ask ONE question at a time
- Questions should be specific to ${role} development
- After the candidate answers, give brief feedback (2 sentences max) then ask the next question
- After 5 questions, say INTERVIEW_COMPLETE and give an overall score out of 100
- Keep responses concise and professional
- Never break character`

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const reply = response.choices[0].message.content

    const isComplete = reply.includes("INTERVIEW_COMPLETE")
    if (isComplete) {
  // extract score from reply — looks for a number before /100
  const scoreMatch = reply.match(/(\d+)\/100/)
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 0

  // save interview to MongoDB
  await Interview.create({
    userId:   req.body.userId,   
    role:     req.body.role,      
    score:    score,             
    feedback: reply              
  })
}

    res.json({ reply, isComplete })

  } catch (err) {
    console.log("❌ Interview error:", err)
    res.status(500).json({ error: err.message })
  }
})

export default router