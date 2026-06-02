import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiTrash2, FiCopy, FiCheck } from "react-icons/fi";
import botAvatar from "url:../assets/image.jpeg";

const BACKEND = "https://vigneshwarancj-portfolio-backend.onrender.com";
const MAX_HISTORY = 20;
const CHUNK = 7;
const TICK_MS = 14;

const STARTER_QUESTIONS = [
  "What are his main skills?",
  "Tell me about Syncly.",
  "How does GlycanBench work?",
  "What's his research focus?",
  "Tech stack he uses?",
];

const mkId = () => Date.now() + Math.random();

const INITIAL_MESSAGE = {
  id: 1,
  from: "bot",
  text: "Hey! I'm Vigneshwaran's AI assistant. What would you like to know about him?",
  ts: Date.now(),
  done: true,
};

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={handle}
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      aria-label="Copy message"
    >
      {copied
        ? <FiCheck className="w-3 h-3 text-emerald-500" />
        : <FiCopy className="w-3 h-3" />}
    </button>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`flex gap-2 items-end ${isUser ? "justify-end" : "justify-start"} group`}
    >
      {!isUser && (
        <img
          src={botAvatar}
          className="w-7 h-7 rounded-full object-cover object-top border border-gray-200 dark:border-gray-600 shrink-0 mb-0.5"
          alt="Vigneshwaran"
          loading="lazy"
        />
      )}

      <div className={`flex flex-col gap-0.5 max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-blue-600 text-white rounded-br-sm shadow-md shadow-blue-500/20"
              : "bg-white dark:bg-gray-700/90 text-gray-900 dark:text-gray-100 rounded-bl-sm border border-gray-100 dark:border-gray-600/60 shadow-sm"
          }`}
        >
          {msg.text || (
            <span className="flex items-center gap-1 h-4">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
          )}
        </div>

        <div className={`flex items-center gap-1 px-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 select-none">
            {fmtTime(msg.ts)}
          </span>
          {!isUser && msg.done && msg.text && <CopyButton text={msg.text} />}
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioAssistant() {
  const [open, setOpen]             = useState(false);
  const [messages, setMessages]     = useState([INITIAL_MESSAGE]);
  const [input, setInput]           = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [loading, setLoading]       = useState(false);

  const scrollRef   = useRef(null);
  const inputRef    = useRef(null);
  const typingRef   = useRef(null);
  const abortRef    = useRef(null);
  // Mirror messages in a ref so sendMessage reads current state without stale closure
  const msgsRef     = useRef(messages);
  useEffect(() => { msgsRef.current = messages; }, [messages]);

  // Warm up Render free-tier on mount
  useEffect(() => { fetch(BACKEND).catch(() => {}); }, []);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => () => {
    abortRef.current?.abort();
    if (typingRef.current) clearInterval(typingRef.current);
  }, []);

  const typeMessage = useCallback((full, id) => new Promise((resolve) => {
    if (!full) { resolve(); return; }
    let i = 0;
    typingRef.current = setInterval(() => {
      i = Math.min(i + CHUNK, full.length);
      setMessages((prev) =>
        prev.map((m) => m.id === id ? { ...m, text: full.slice(0, i) } : m)
      );
      if (i >= full.length) {
        clearInterval(typingRef.current);
        typingRef.current = null;
        setMessages((prev) =>
          prev.map((m) => m.id === id ? { ...m, done: true } : m)
        );
        resolve();
      }
    }, TICK_MS);
  }), []);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    // ── Snapshot history BEFORE adding new messages (fixes race condition) ──
    const history = msgsRef.current
      .filter((m) => m.done && m.text)
      .slice(-MAX_HISTORY)
      .map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));

    const uId = mkId();
    const bId = mkId();
    const now  = Date.now();

    setMessages((prev) => [
      ...prev,
      { id: uId, from: "user", text: trimmed, ts: now,     done: true  },
      { id: bId, from: "bot",  text: "",       ts: now + 1, done: false },
    ]);
    setInput("");
    setActiveChip(null);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/assistant`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message: trimmed, history }),
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
      if (e.name !== "AbortError")
        await typeMessage("Network error — please try again.", bId);
    } finally {
      setLoading(false);
    }
  }, [loading, typeMessage]);

  const clearChat = () => {
    abortRef.current?.abort();
    if (typingRef.current) clearInterval(typingRef.current);
    setMessages([{ ...INITIAL_MESSAGE, id: mkId(), ts: Date.now() }]);
    setLoading(false);
    setInput("");
    setActiveChip(null);
  };

  const charCount = input.length;
  const charWarn  = charCount > 420;

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            type="button"
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl shadow-blue-500/40 hover:scale-110 transition-transform duration-200 z-50 flex items-center justify-center"
            aria-label="Open AI Assistant"
          >
            <FiMessageSquare className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed bottom-6 right-6 w-[22rem] sm:w-96 max-w-[92vw] flex flex-col max-h-[78vh] z-50 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-gray-200 dark:border-gray-700/60"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-blue-700 to-violet-700 text-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <img
                    src={botAvatar}
                    className="w-8 h-8 rounded-full object-cover object-top border-2 border-white/30"
                    alt="Vigneshwaran"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">Vigneshwaran's AI</p>
                  <p className="text-[10px] text-blue-200 leading-tight">Online · Ask anything</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={clearChat}
                  className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 px-4 py-4 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/90 scroll-smooth"
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} msg={m} />
              ))}
            </div>

            {/* Suggestion chips */}
            <div className="flex gap-1.5 px-3 py-2 overflow-x-auto border-t border-gray-100 dark:border-gray-700/40 bg-white dark:bg-gray-800/80 shrink-0 scrollbar-hide">
              {STARTER_QUESTIONS.map((q, i) => (
                <button
                  key={q}
                  type="button"
                  disabled={loading}
                  onClick={() => { setActiveChip(i); sendMessage(q); }}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium border transition-all duration-150 shrink-0 disabled:opacity-40 ${
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
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 dark:border-gray-700/40 bg-white dark:bg-gray-800/80 rounded-b-2xl shrink-0"
            >
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setActiveChip(null); }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                  placeholder="Ask about skills, projects…"
                  aria-label="Ask the AI assistant"
                  disabled={loading}
                  maxLength={500}
                />
                {charWarn && (
                  <span className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium ${charCount >= 500 ? "text-red-500" : "text-amber-500"}`}>
                    {500 - charCount}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-sm flex items-center justify-center shrink-0"
                aria-label="Send"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
