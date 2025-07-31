const { onRequest } = require("firebase-functions/v2/https");
const fetch = require("node-fetch");

exports.chat = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { message } = req.body;

  // === Add topic filtering here ===
  const allowedTopics = [
    "campushustle",
    "mentor",
    "mentorship",
    "guidance",
    "students",
    "freelance",
    "hackathons",
    "community",
    "career",
    "learning",
    "dsa",
    "coding",
    "projects"
  ];

  const lower = (message || "").toLowerCase();
  const isRelevant = allowedTopics.some(topic => lower.includes(topic));

  if (!isRelevant) {
    return res.json({
      reply:
        "I am Mentor Buddy, here to assist only with CampusHustle topics like mentorship, hackathons, freelancing, coding, community, and career guidance."
    });
  }
  // === End of filter ===

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
          {
            role: "system",
            content:
              "You are Mentor Buddy, the official AI mentor of CampusHustle. " +
              "Your job is to help students with: mentorship, CampusHustle platform guidance, " +
              "career growth, coding, hackathons, DSA, projects, and personal development. " +
              "If the user asks about anything unrelated to CampusHustle or mentorship, " +
              "politely say: 'I can only help with CampusHustle-related queries and guidance.'"
          },
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
