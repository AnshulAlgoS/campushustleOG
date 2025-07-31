"use client";
import { useState } from "react";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-white border"
      >
        {/* Replace this with your image later */}
        <img
          src="bot.jpeg" 
          alt="Chatbot"
          className="w-8 h-8"
        />
      </button>

      {/* Placeholder panel for now */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-lg p-4">
          <h2 className="font-semibold mb-2">CampusHustle Chatbot</h2>
          <p className="text-gray-500">Chat UI will come here...</p>
        </div>
      )}
    </>
  );
}
