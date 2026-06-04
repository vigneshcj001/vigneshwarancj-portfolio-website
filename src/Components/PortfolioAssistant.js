import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSend, FiTrash2, FiCopy, FiCheck, FiChevronDown } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import botAvatar from "url:../assets/image.jpeg";

const BACKEND    = "https://vigneshwarancj-portfolio-backend.onrender.com";
const MAX_HISTORY = 20;
const CHUNK      = 7;
const TICK_MS    = 14;

const STARTER_QUESTIONS = [
  { text: "Main skills?",         icon: "⚡" },
  { text: "Tell me about Syncly", icon: "🚀" },
  { text: "GlycanBench?",         icon: "🧬" },
  { text: "Research focus",       icon: "🔬" },
  { text: "His tech stack",       icon: "💻" },
  { text: "Current job?",         icon: "🏢" },
];

const mkId = () => Date.now() + Math.random();

const mkInitial = () => ({
  id: 1, from: "bot",
  text: "Hey! I'm CJ's AI — ask me anything about Vigneshwaran's work, projects, or background.",
  ts: Date.now(), done: true,
});

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)
        .then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); })
        .catch(() => {})}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-white"
      aria-label="Copy"
    >
      {copied ? <FiCheck className="w-3 h-3 text-emerald-400" /> : <FiCopy className="w-3 h-3" />}
    </button>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full block"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex gap-2.5 items-end ${isUser ? "justify-end" : "justify-start"} group`}
    >
      {!isUser && (
        <img
          src={botAvatar}
          className="w-7 h-7 rounded-full object-cover object-top shrink-0 mb-1 ring-2 ring-blue-500/20"
          alt="CJ"
          loading="lazy"
        />
      )}

      <div className={`flex flex-col gap-1 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`
          px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? "bg-linear-to-br from-blue-600 to-purple-600 text-white rounded-br-sm shadow-lg shadow-blue-500/25"
            : "bg-white dark:bg-white/5 text-gray-800 dark:text-gray-100 rounded-bl-sm border border-gray-100 dark:border-white/10 shadow-sm backdrop-blur-sm"
          }
        `}>
          {!msg.text && !isUser ? <TypingDots /> : msg.text}
        </div>

        <div className={`flex items-center gap-1.5 px-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-[10px] text-gray-400 dark:text-gray-600 select-none tabular-nums">
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
  const [messages, setMessages]     = useState(() => [mkInitial()]);
  const [input, setInput]           = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [loading, setLoading]       = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const scrollRef     = useRef(null);
  const inputRef      = useRef(null);
  const typingRef     = useRef(null);
  const abortRef      = useRef(null);
  const msgsRef       = useRef(messages);
  const nearBottomRef = useRef(true);
  useEffect(() => { msgsRef.current = messages; }, [messages]);

  useEffect(() => { fetch(BACKEND).catch(() => {}); }, []);

  const scrollToBottom = (smooth = false) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: smooth ? "smooth" : "instant" });
  };

  // Auto-scroll only when user is already near the bottom (don't hijack manual scroll-up)
  useEffect(() => { if (nearBottomRef.current) scrollToBottom(false); }, [messages]);

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 80); }
  }, [open]);

  useEffect(() => () => {
    abortRef.current?.abort();
    if (typingRef.current) clearInterval(typingRef.current);
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
    nearBottomRef.current = dist < 100;
    setShowScrollBtn(dist > 90);
  };

  const autoResize = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 90) + "px";
  };

  const typeMessage = useCallback((full, id) => new Promise((resolve) => {
    if (!full) { resolve(); return; }
    let i = 0;
    typingRef.current = setInterval(() => {
      i = Math.min(i + CHUNK, full.length);
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, text: full.slice(0, i) } : m));
      if (i >= full.length) {
        clearInterval(typingRef.current);
        typingRef.current = null;
        setMessages((prev) => prev.map((m) => m.id === id ? { ...m, done: true } : m));
        resolve();
      }
    }, TICK_MS);
  }), []);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const history = msgsRef.current
      .filter((m) => m.done && m.text)
      .slice(-MAX_HISTORY)
      .map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));

    const uId = mkId(), bId = mkId(), now = Date.now();
    nearBottomRef.current = true; // always follow scroll when user sends
    setMessages((prev) => [
      ...prev,
      { id: uId, from: "user", text: trimmed, ts: now,     done: true  },
      { id: bId, from: "bot",  text: "",       ts: now + 1, done: false },
    ]);
    setInput("");
    if (inputRef.current) { inputRef.current.style.height = "auto"; }
    setActiveChip(null);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
        signal: abortRef.current.signal,
      });
      let reply = "Sorry, something went wrong.";
      if (res.ok) { const d = await res.json(); reply = d.reply || reply; }
      else { const e = await res.json().catch(() => ({})); reply = e.detail || reply; }
      await typeMessage(reply, bId);
    } catch (e) {
      if (e.name !== "AbortError") await typeMessage("Network error — please try again.", bId);
    } finally {
      setLoading(false);
    }
  }, [loading, typeMessage]);

  const clearChat = () => {
    abortRef.current?.abort();
    if (typingRef.current) clearInterval(typingRef.current);
    setMessages([mkInitial()]);
    setLoading(false); setInput(""); setActiveChip(null);
    if (inputRef.current) inputRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const msgCount = messages.length - 1;
  const charCount = input.length;

  return (
    <>
      {/* ─── FAB ─── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            type="button"
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 hover:scale-105 transition-all duration-200"
            aria-label="Open AI Assistant"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <img src={botAvatar} className="w-9 h-9 rounded-full object-cover object-top ring-2 ring-white/30" alt="CJ" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-blue-600 animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold leading-tight">Ask CJ's AI</p>
              <p className="text-[10px] text-blue-200 leading-tight">Online · Ask anything</p>
            </div>
            <HiSparkles className="w-4 h-4 text-blue-200 group-hover:text-white transition-colors shrink-0" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── PANEL ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
            className="fixed bottom-6 right-6 w-[22rem] sm:w-[26rem] max-w-[92vw] flex flex-col max-h-[80vh] z-50 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10"
            style={{ background: "var(--chat-bg, white)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <img src={botAvatar} className="w-9 h-9 rounded-full object-cover object-top ring-2 ring-white/25" alt="CJ" />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-blue-600 ${loading ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">Vigneshwaran's AI</p>
                  <p className="text-[10px] text-blue-200 leading-tight">
                    {loading ? "Thinking..." : `Online · ${msgCount} message${msgCount !== 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <button type="button" onClick={clearChat} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors" title="Clear chat" aria-label="Clear chat">
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => setOpen(false)} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors" aria-label="Close">
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 px-4 py-4 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-950 scroll-smooth relative"
            >
              {messages.map((m) => <MessageBubble key={m.id} msg={m} />)}

              {/* Scroll-to-bottom button */}
              <AnimatePresence>
                {showScrollBtn && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => scrollToBottom()}
                    className="sticky bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
                  >
                    <FiChevronDown className="w-3.5 h-3.5" />
                    Scroll to latest
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Suggestion chips — with fade edges */}
            <div className="relative shrink-0 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-gray-900">
              <div className="flex gap-1.5 px-3 py-2 overflow-x-auto scrollbar-hide">
                {STARTER_QUESTIONS.map((q, i) => (
                  <button
                    key={q.text}
                    type="button"
                    disabled={loading}
                    onClick={() => { setActiveChip(i); sendMessage(q.text); }}
                    className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-150 shrink-0 disabled:opacity-40 ${
                      activeChip === i
                        ? "bg-linear-to-r from-blue-600 to-purple-600 text-white border-transparent"
                        : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <span className="text-sm leading-none">{q.icon}</span>
                    {q.text}
                  </button>
                ))}
              </div>
              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />
            </div>

            {/* Input bar */}
            <div className="shrink-0 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-gray-900 px-3 py-3">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setActiveChip(null); autoResize(e.target); }}
                    onKeyDown={handleKeyDown}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 dark:focus:border-blue-500 transition-all resize-none overflow-hidden leading-relaxed"
                    placeholder="Ask about his work… (Enter to send)"
                    aria-label="Message"
                    disabled={loading}
                    maxLength={500}
                    style={{ minHeight: "42px" }}
                  />
                  {charCount > 420 && (
                    <span className={`absolute right-2.5 bottom-2 text-[10px] font-semibold ${charCount >= 500 ? "text-red-500" : "text-amber-500"}`}>
                      {500 - charCount}
                    </span>
                  )}
                </div>
                <motion.button
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  whileTap={{ scale: 0.9 }}
                  className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/25 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-blue-500/40 transition-all"
                  aria-label="Send"
                >
                  {loading
                    ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    : <FiSend className="w-4 h-4" />
                  }
                </motion.button>
              </div>
              <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-1.5 px-1">
                Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
