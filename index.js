const { onRequest } = require("firebase-functions/v2/https");
const fetch = require("node-fetch");

exports.chat = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { message } = req.body;

  try {
    const fwRes = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "accounts/fireworks/models/llama-v3p1-8b-instruct",
        messages: [
          { role: "system", content: "You are Mentor Buddy." },
          { role: "user", content: message },
        ],
        max_tokens: 1500,
      }),
    });

    const data = await fwRes.json();
    const reply = data?.choices?.[0]?.message?.content || "No response.";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error talking to AI." });
  }
});
