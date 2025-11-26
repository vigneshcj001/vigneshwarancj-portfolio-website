import React, { useEffect, useRef, useState } from "react";
import { SiOpenai } from "react-icons/si";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import botAvatar from "../../images/vignesh.png";
import userAvatar from "../../images/vignesh.png";

const BACKEND = "http://127.0.0.1:8000";

const starterQuestions = [
  "What are Vigneshwaran's main skills?",
  "Tell me about the Syncly project.",
  "How does GlycanBench work?",
  "What tech stack does he use?",
  "Summarize his research interests.",
];

export default function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Hi! I'm Vigneshwaran's AI assistant. Ask me anything or try a suggestion below 🚀",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Autofocus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  // Typewriter effect for bot replies
  function typeMessage(full, id) {
    return new Promise((resolve) => {
      let i = 0;
      const tick = setInterval(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, text: m.text + full[i] } : m))
        );
        i++;
        if (i >= full.length) {
          clearInterval(tick);
          resolve();
        }
      }, 15);
    });
  }

  async function sendMessage(text) {
    if (!text.trim()) return;
    const trimmed = text.trim();

    const uId = Date.now();
    const bId = uId + 1;

    // Add user message + bot placeholder
    setMessages((m) => [
      ...m,
      { id: uId, from: "user", text: trimmed, time: new Date() },
      { id: bId, from: "bot", text: "", time: new Date() },
    ]);

    setInput("");
    setActiveChip(null);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      let reply = "Sorry, something went wrong.";
      if (res.ok) {
        const data = await res.json();
        reply = data.reply || reply;
      } else {
        const errBody = await res.json().catch(() => ({}));
        reply = errBody.detail || reply;
      }

      await typeMessage(reply, bId);
    } catch (e) {
      await typeMessage("Network error. Please try again.", bId);
    }
    setLoading(false);
  }

  return (
    <>
      {/* Floating Trigger Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition transform z-50"
        >
          <FiMessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[92vw] bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl flex flex-col z-50 animate-[fadeIn_0.2s_ease]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-t-2xl shadow">
            <div className="flex items-center gap-2">
              <SiOpenai className="w-5 h-5" />
              <p className="font-semibold">Vigneshwaran AI Assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 px-4 py-3 space-y-3 overflow-y-auto bg-gray-50"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 items-end ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar */}
                <img
                  src={m.from === "user" ? userAvatar : botAvatar}
                  className="w-8 h-8 rounded-full shadow border"
                  alt={m.from === "user" ? "You" : "Vigneshwaran"}
                />

                {/* Bubble */}
                <div
                  className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm leading-relaxed shadow-sm ${
                    m.from === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-900 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-gray-400 pl-2 animate-pulse">
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                </span>
                Vigneshwaran is typing...
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          <div className="flex gap-2 px-3 py-2 overflow-x-auto border-t bg-white">
            {starterQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(q);
                  setActiveChip(i);
                  // If you want auto-send on click, uncomment:
                  // sendMessage(q);
                }}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium border transition ${
                  activeChip === i
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 px-3 py-3 border-t bg-gray-50 rounded-b-2xl"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setActiveChip(null);
              }}
              className="flex-1 px-3 py-2 rounded-lg border text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask about skills, research, or projects..."
            />
            <button
              disabled={loading}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 shadow"
            >
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
