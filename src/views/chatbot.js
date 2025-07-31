"use client";
import { useState, useEffect, useRef } from "react";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const res = await fetch("https://campushustle.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
  };

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-white border"
      >
        <img src="bot.jpeg" alt="Chatbot" className="w-8 h-8" />
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-lg p-4 flex flex-col">
          <div className="font-semibold mb-2 flex justify-between">
            Mentor Buddy
            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-2 py-1 rounded ${
                    msg.role === "user" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-2 flex">
            <input
              type="text"
              className="border flex-1 rounded-l px-2 py-1"
              placeholder="Ask Mentor Buddy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-3 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
