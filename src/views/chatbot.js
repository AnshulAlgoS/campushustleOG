"use client";
import { useState, useRef, useEffect } from "react";
import "./chatbot.css"; // keep your custom CSS
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import botImg from "../assets/images/bot.jpeg";


export default function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveChatMessage = async (userId, message, sender) => {
    const messagesRef = collection(db, 'chats', userId, 'messages');
    await addDoc(messagesRef, {
      text: message,
      sender,
      timestamp: serverTimestamp()
    });
  };

  // Send message to backend
  const handleSend = async () => {
    if (!input.trim()) return;

    if (!user) {
      alert("Please log in to chat.");
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    await saveChatMessage(user.uid, input, 'user');
    setInput("");

    try {
      const res = await fetch("https://campushustle.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, userId: user.uid }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply || "Error fetching reply" },
      ]);
      await saveChatMessage(user.uid, data.reply, 'bot');
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error connecting to server." },
      ]);
      await saveChatMessage(user.uid, "Error connecting to server.", 'bot');
    }
  };

  const fetchUserProfile = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="chatbot-button"
      >
        <img src="bot.jpeg" alt="Chatbot" />
      </button>

      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-panel-header">
            Mentor Buddy
            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="chatbot-panel-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Ask Mentor Buddy..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
