import "./config/env.js"

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import interviewRoutes from "./routes/interviewRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"  
import resumeRoutes from "./routes/resumeRoutes.js"

const app = express()

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use(cors())
app.use(express.json())
app.use("/api/interview", interviewRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/dashboard", dashboardRoutes) 
app.use("/api/resumes", resumeRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err))

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`))