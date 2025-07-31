// index.js - Express backend for Mentor Buddy

const express = require("express");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(express.json());

// ===== Firebase Admin Initialization =====
let serviceAccountConfig;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    // Production (Render): parse from environment variable
    serviceAccountConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    console.log("🔥 Using FIREBASE_SERVICE_ACCOUNT_JSON from env");
  } else {
    // Local: use the JSON file
    serviceAccountConfig = require("./serviceAccountKey.json");
    console.log("🔥 Using local serviceAccountKey.json");
  }
} catch (err) {
  console.error(" Error loading Firebase service account:", err);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountConfig),
  databaseURL:
    "https://campushustle91-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.firestore();

// ========== Mentor Buddy Route ==========
app.post("/api/chat", async (req, res) => {
  const { message, userId } = req.body;

  try {
    let userContext = "";
    if (userId) {
      try {
        const userDoc = await db.collection("users").doc(userId).get();
        if (userDoc.exists) {
          const data = userDoc.data();
          userContext = `\nUser Info: ${JSON.stringify(data)}`;
        }
      } catch (err) {
        console.error(" Error fetching user data from Firestore:", err);
      }
    }

    // Ensure API key is present
    if (!process.env.FIREWORKS_API_KEY) {
      console.error(" Missing FIREWORKS_API_KEY");
      return res.status(500).json({ reply: "Server configuration error." });
    }

    console.log("🔗 Calling Fireworks AI API...");

    const fwRes = await fetch(
      "https://api.fireworks.ai/inference/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/llama-v3p1-8b-instruct",
          messages: [
            {
              role: "system",
              content:
                "You are Mentor Buddy, the official AI mentor of CampusHustle. " +
                "You ONLY help with: mentorship, CampusHustle platform guidance, " +
                "career growth, coding, hackathons, DSA, projects, and personal development. " +
                "If the user asks about anything unrelated, politely say: " +
                "'I can only help with CampusHustle-related queries and guidance.'",
            },
            { role: "user", content: message + userContext },
          ],
          max_tokens: 3500,
        }),
      }
    );

    const data = await fwRes.json();

    // Log response for debugging if something goes wrong
    if (!fwRes.ok) {
      console.error(" Fireworks API Error:", fwRes.status, data);
      return res.status(500).json({ reply: "AI backend error." });
    }

    const reply = data?.choices?.[0]?.message?.content || "No response.";
    res.json({ reply });
  } catch (err) {
    console.error("Unexpected error in /api/chat:", err);
    res.status(500).json({ reply: "Error talking to AI." });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.send("Mentor Buddy API is running");
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
