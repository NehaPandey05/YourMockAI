import dotenv from "dotenv"
dotenv.config()

import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken"


const router = express.Router();


// 🔥 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    console.log("📥 SIGNUP BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    console.log("🔍 FOUND USER:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    console.log("✅ USER SAVED:", user);

    res.json({
      message: "Signup successful",
      user,
    });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("📥 LOGIN BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    console.log("🔍 USER FOUND:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }
console.log("SECRET:", process.env.JWT_SECRET)

   const token = jwt.sign(
  { id: user._id, name: user.name, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
)


res.json({
  message: "Login successful",
  token,
})

  } catch (err) {
    console.log("❌ LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;