import React, { useEffect, useRef, useState, useCallback } from "react";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import { SiOpenai } from "react-icons/si";
import botAvatar from "../../images/image.jpeg";

const BACKEND = "https://vigneshwarancj-portfolio-backend.onrender.com";

const STARTER_QUESTIONS = [
  "What are his main skills?",
  "Tell me about Syncly.",
  "How does GlycanBench work?",
  "What tech stack does he use?",
  "His research interests?",
];

const INITIAL_MESSAGE = {
  id: 1,
  from: "bot",
  text: "Hi! I'm Vigneshwaran's AI assistant. Ask me anything or try a suggestion below.",
};

function MessageBubble({ from, text }) {
  const isUser = from === "user";
  return (
    <div className={`flex gap-2 items-end ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <img
          src={botAvatar}
          className="w-7 h-7 rounded-full object-cover border border-gray-200 dark:border-gray-600 shrink-0"
          alt="Vigneshwaran"
          loading="lazy"
        />
      )}
      <div
        className={`px-3 py-2 rounded-2xl max-w-[78%] text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-sm border border-gray-100 dark:border-gray-600 shadow-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default function PortfolioAssistant() {
  const [open, setOpen]             = useState(false);
  const [messages, setMessages]     = useState([INITIAL_MESSAGE]);
  const [input, setInput]           = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [loading, setLoading]       = useState(false);

  const scrollRef         = useRef(null);
  const inputRef          = useRef(null);
  const typingIntervalRef = useRef(null);
  const abortRef          = useRef(null);

  // Warm up Render free-tier backend on mount to reduce cold-start latency
  useEffect(() => {
    fetch(BACKEND).catch(() => {});
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  // Chunk-typed typing: 5 chars per 20 ms (~250 chars/s) vs old 1 char per 14 ms (~71 chars/s)
  const typeMessage = useCallback((full, id) => {
    return new Promise((resolve) => {
      if (!full) { resolve(); return; }

      const CHUNK = 5;
      let i = 0;

      typingIntervalRef.current = setInterval(() => {
        i = Math.min(i + CHUNK, full.length);
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, text: full.slice(0, i) } : m))
        );
        if (i >= full.length) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
          resolve();
        }
      }, 20);
    });
  }, []);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      // Cancel any previous in-flight request before starting a new one
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const uId = Date.now();
      const bId = uId + 1;

      setMessages((prev) => [
        ...prev,
        { id: uId, from: "user", text: trimmed },
        { id: bId, from: "bot",  text: ""      },
      ]);
      setInput("");
      setActiveChip(null);
      setLoading(true);

      try {
        const res = await fetch(`${BACKEND}/api/assistant`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ message: trimmed }),
          signal:  abortRef.current.signal,
        });

        let reply = "Sorry, something went wrong.";
        if (res.ok) {
          const data = await res.json();
          reply = data.reply || reply;
        } else {
          const err = await res.json().catch(() => ({}));
          reply = err.detail || reply;
        }

        await typeMessage(reply, bId);
      } catch (e) {
        if (e.name !== "AbortError") {
          await typeMessage("Network error. Please try again.", bId);
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, typeMessage]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl shadow-blue-500/30 hover:scale-110 transition-all duration-200 z-50"
          aria-label="Open AI Assistant"
        >
          <FiMessageSquare className="w-5 h-5" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[92vw] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl shadow-black/20 flex flex-col max-h-[72vh] z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-blue-700 to-violet-700 text-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <SiOpenai className="w-4 h-4" />
              <span className="font-semibold text-sm">Vigneshwaran AI</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
              aria-label="Close"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 px-4 py-3 space-y-3 overflow-y-auto bg-gray-50 dark:bg-gray-900/80"
          >
            {messages.map((m) => (
              <MessageBubble key={m.id} from={m.from} text={m.text} />
            ))}

            {loading && (
              <div className="flex items-center gap-1.5 pl-9">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Suggested chips — click sends directly instead of just filling the input */}
          <div className="flex gap-1.5 px-3 py-2 overflow-x-auto border-t border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/80 shrink-0 scrollbar-hide">
            {STARTER_QUESTIONS.map((q, i) => (
              <button
                key={q}
                type="button"
                disabled={loading}
                onClick={() => { setActiveChip(i); sendMessage(q); }}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium border transition-all shrink-0 disabled:opacity-40 ${
                  activeChip === i
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input bar */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/80 rounded-b-2xl shrink-0"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); setActiveChip(null); }}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Ask about skills, projects, research..."
              aria-label="Ask the AI assistant"
              disabled={loading}
              maxLength={500}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm flex items-center justify-center"
              aria-label="Send"
            >
              <FiSend className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
