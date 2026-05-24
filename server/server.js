import "./config/env.js"

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err))

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`))