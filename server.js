import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

// 🔐 Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const dbAdmin = getFirestore();

console.log("FIREWORKS_API_KEY:", process.env.FIREWORKS_API_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

// 🌐 CORS setup
const allowedOrigins = [
  "https://campushustle-ai.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());

// 🤖 Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message, userId } = req.body;
  let userProfile = null;

  try {
    // 🔍 Fetch user profile if userId is provided
    if (userId) {
      const userRef = dbAdmin.collection("users").doc(userId);
      const userSnap = await userRef.get();
      userProfile = userSnap.exists ? userSnap.data() : null;
    }

    // 📘 Build system prompt with user context
    const systemPrompt = userProfile
      ? `You are Mentor Buddy, a friendly and motivating student mentor. The user's name is ${userProfile.firstName}. Their skills are: ${userProfile.skills?.join(", ") || "not listed"}. Answer concisely and clearly.`
      : "You are Mentor Buddy, a friendly and motivating student mentor. Answer concisely and clearly.";

    // 🔥 Call Fireworks AI
    const fwRes = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "accounts/fireworks/models/llama-v3p1-8b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 200,
      }),
    });

    const data = await fwRes.json();
    const reply = (data?.choices?.[0]?.message?.content || "Hmm...").slice(0, 100);

    res.json({ reply });
  } catch (err) {
    console.error("🔥 AI Error:", err);
    res.status(500).json({ reply: "Error talking to AI." });
  }
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
