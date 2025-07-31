"use client";
import { useState, useRef, useEffect } from "react";
import "./chatbot.css";


export default function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to backend
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("https://campushustle.onrender.com/api/chat", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply || "Error fetching reply" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error connecting to server." },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-white border z-50"
      >
        <img
          src="bot.jpeg"
          alt="Chatbot"
          className="w-8 h-8"
        />
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-lg p-4 flex flex-col z-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Mentor Buddy</h2>
            <button onClick={() => setOpen(false)} className="text-gray-500">
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto mb-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 text-sm ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-2 py-1 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Ask Mentor Buddy..."
              className="flex-1 border rounded-l-lg px-2 py-1 text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-3 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
