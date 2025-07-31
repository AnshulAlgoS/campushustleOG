const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors"); 
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" })); // ✅ Allow all origins
app.use(express.json());


// ===== Firebase Admin Initialization =====
// ===== Firebase Admin Initialization =====
let serviceAccountConfig;

if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  try {
    serviceAccountConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    // Fix escaped newlines in Render env
    if (serviceAccountConfig.private_key.includes('\\n')) {
      serviceAccountConfig.private_key = serviceAccountConfig.private_key.replace(/\\n/g, '\n');
    }
    console.log("✅ Loaded Firebase credentials from environment");
  } catch (err) {
    console.error("❌ Error parsing FIREBASE_SERVICE_ACCOUNT_JSON:", err);
    process.exit(1);
  }
} else {
  try {
    console.log("🧪 Using local serviceAccountKey.json");
    serviceAccountConfig = require("./serviceAccountKey.json");
  } catch (err) {
    console.error("❌ Missing local serviceAccountKey.json");
    process.exit(1);
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountConfig),
  projectId: serviceAccountConfig.project_id,
  databaseURL:
    "https://campushustle91-default-rtdb.asia-southeast1.firebasedatabase.app",
});


const db = admin.firestore();

// ========== Mentor Buddy Route ==========
app.post("/api/chat", async (req, res) => {
  const { message, userId } = req.body;
  console.log("Incoming /api/chat:", { message, userId });
  app.use(cors({
  origin: ["https://campushustle-ai.vercel.app/"], 
}));


  try {
    // Optionally, fetch user dashboard from Firestore
    let userContext = "";
    if (userId) {
      try {
        const userDoc = await db.collection("users").doc(userId).get();
        if (userDoc.exists) {
          const data = userDoc.data();
          userContext = `\nUser Info: ${JSON.stringify(data)}`;
          console.log("Fetched user context from Firestore.");
        } else {
          console.log("No Firestore data found for user:", userId);
        }
      } catch (err) {
        console.error("🔥 Error fetching user data from Firestore:", err);
      }
    }

    // Call Fireworks AI
    console.log("Sending request to Fireworks AI...");
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

    // Check if Fireworks responded OK
    if (!fwRes.ok) {
      const errText = await fwRes.text();
      console.error("🔥 Fireworks API Error:", fwRes.status, errText);
      return res
        .status(500)
        .json({ reply: "Error talking to AI (Fireworks API error)." });
    }

    const data = await fwRes.json();
    console.log("Fireworks API response received:", JSON.stringify(data, null, 2));
    const reply = data?.choices?.[0]?.message?.content || "No response.";
    res.json({ reply });
  } catch (err) {
    console.error("🔥 Server error in /api/chat:", err);
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
  console.log(`🚀 Server is running on port ${PORT}`);
});
