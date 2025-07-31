// index.js - Express backend for Mentor Buddy

const express = require("express");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());

// Initialize Firebase Admin SDK using your service account
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://campushustle91-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.firestore();

// ========== Mentor Buddy Route ==========
app.post("/api/chat", async (req, res) => {
  const { message, userId } = req.body;

  try {
    // Optionally, fetch user dashboard from Firestore
    let userContext = "";
    if (userId) {
      try {
        const userDoc = await db.collection("users").doc(userId).get();
        if (userDoc.exists) {
          const data = userDoc.data();
          userContext = `\nUser Info: ${JSON.stringify(data)}`;
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    }

    // Call Fireworks AI
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
          max_tokens: 1500,
        }),
      }
    );

    const data = await fwRes.json();
    const reply = data?.choices?.[0]?.message?.content || "No response.";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error talking to AI." });
  }
});

// Health check route (optional)
app.get("/", (req, res) => {
  res.send("Mentor Buddy API is running");
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
