// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
console.log("FIREWORKS_API_KEY:", process.env.FIREWORKS_API_KEY);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // Call Fireworks AI
    const fwRes = await fetch(
      "https://api.fireworks.ai/inference/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/llama-v3p1-8b-instruct",
          messages: [
            {
              role: "system",
              content:
                "You are Mentor Buddy, a friendly and motivating student mentor. Answer concisely and clearly.",
            },
            { role: "user", content: message },
          ],
          max_tokens: 200,
        }),
      }
    );

    const data = await fwRes.json();
    const reply =
  (data?.choices?.[0]?.message?.content || "Hmm...") 
    .slice(0, 100); // limit length
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error talking to AI." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
