import { Link } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiChevronDown, FiCopy, FiSend, FiSquare, FiTrash2, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import botAvatar from "url:../assets/portrait-640.webp";
import useAssistantChat from "../features/assistant/useAssistantChat";
import { STARTER_QUESTIONS } from "../features/assistant/constants";

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => navigator.clipboard.writeText(text)
    .then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); })
    .catch(() => {});
  return (
    <button type="button" onClick={copy} className="assistant-copy" aria-label={copied ? "Copied" : "Copy"}>
      {copied ? <FiCheck /> : <FiCopy />}
    </button>
  );
}

function TypingDots() {
  return (
    <span className="assistant-typing" aria-label="Generating response">
      {[0, 1, 2].map((index) => <motion.i key={index} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.65, repeat: Infinity, delay: index * 0.14 }} />)}
    </span>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.from === "user";
  return (
    <motion.article
      data-no-translate={isUser ? "true" : undefined}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`assistant-message ${isUser ? "is-user" : "is-assistant"}`}
    >
      {!isUser && <img src={botAvatar} alt="" className="assistant-message-avatar" loading="lazy" />}
      <div className="assistant-message-content">
        <div className={`assistant-bubble ${msg.error ? "is-error" : ""}`}>
          {!msg.text && !isUser ? <TypingDots /> : msg.text}
        </div>
        <div className="assistant-message-meta">
          <time dateTime={new Date(msg.ts).toISOString()}>{fmtTime(msg.ts)}</time>
          {!isUser && msg.done && msg.text && !msg.error && <CopyButton text={msg.text} />}
        </div>
      </div>
    </motion.article>
  );
}

function StarterPanel({ loading, activeChip, onSelect, onNavigate }) {
  return (
    <section className="assistant-starters" aria-label="Suggested questions">
      <p>Try a question</p>
      <div className="assistant-starter-grid">
        {STARTER_QUESTIONS.map((question, index) => (
          <button
            key={question.text}
            type="button"
            disabled={loading}
            onClick={() => onSelect(question.text, index)}
            className={activeChip === index ? "is-active" : ""}
          >
            <span aria-hidden="true">{question.icon}</span>
            {question.text}
          </button>
        ))}
      </div>
      <div className="assistant-resources" aria-label="Popular portfolio links">
        <Link to="/projects/aiora" onClick={onNavigate}>AIORA</Link>
        <Link to="/projects/pocketpet" onClick={onNavigate}>PocketPet</Link>
        <Link to="/projects/glycanbench" onClick={onNavigate}>GlycanBench</Link>
      </div>
    </section>
  );
}

function ConnectionLabel({ connection, loading }) {
  if (loading) return "Writing response";
  if (connection === "error") return "Connection unavailable";
  return "Ready to answer";
}

export default function PortfolioAssistant() {
  const launcherRef = useRef(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const nearBottomRef = useRef(true);
  const [open, setOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const {
    connection, lastQuestion, messages, input, setInput, activeChip, setActiveChip,
    loading, sendMessage, clearChat, stopResponse,
  } = useAssistantChat();

  const closePanel = () => {
    setOpen(false);
    setTimeout(() => launcherRef.current?.focus(), 100);
  };

  const scrollToBottom = (smooth = false) => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTo({ top: element.scrollHeight, behavior: smooth ? "smooth" : "instant" });
  };

  useEffect(() => { if (nearBottomRef.current) scrollToBottom(false); }, [messages]);
  useEffect(() => {
    if (!open) return undefined;
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [open]);
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        setTimeout(() => launcherRef.current?.focus(), 100);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);
  useEffect(() => { if (!input && inputRef.current) inputRef.current.style.height = "auto"; }, [input]);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    const distance = element.scrollHeight - element.scrollTop - element.clientHeight;
    nearBottomRef.current = distance < 100;
    setShowScrollButton(distance > 100);
  };

  const submitMessage = (text) => {
    if (!text.trim() || loading) return;
    nearBottomRef.current = true;
    sendMessage(text);
  };

  const selectStarter = (text, index) => {
    setActiveChip(index);
    submitMessage(text);
  };

  const autoResize = (element) => {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 112)}px`;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage(input);
    }
  };

  const showStarters = messages.length === 1;

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={launcherRef}
            key="assistant-launcher"
            type="button"
            aria-label="Ask CJ's AI"
            aria-expanded="false"
            onClick={() => setOpen(true)}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            whileHover={{ y: -2 }}
            className="assistant-launcher"
          >
            <span className="assistant-launcher-icon"><HiSparkles /></span>
            <span><strong>Ask portfolio AI</strong><small><i /> Online</small></span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            key="assistant-panel"
            role="region"
            aria-label="Portfolio assistant"
            aria-labelledby="assistant-title"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className="assistant-panel"
          >
            <header className="assistant-header">
              <div className="assistant-identity">
                <span className="assistant-brand-icon"><HiSparkles /></span>
                <div>
                  <h2 id="assistant-title">Portfolio assistant</h2>
                  <p className={connection === "error" ? "is-error" : ""}><i /> <ConnectionLabel connection={connection} loading={loading} /></p>
                </div>
              </div>
              <div className="assistant-header-actions">
                <button type="button" onClick={clearChat} disabled={messages.length === 1 && !loading} title="Clear chat" aria-label="Clear chat"><FiTrash2 /></button>
                <button type="button" onClick={closePanel} aria-label="Close"><FiX /></button>
              </div>
            </header>

            <div ref={scrollRef} onScroll={handleScroll} role="log" aria-live="polite" aria-relevant="additions text" aria-busy={loading} className="assistant-conversation">
              <div className="assistant-context-note"><span>OKF</span><span>Laya</span><span>Groq</span><p>Answers grounded in portfolio content</p></div>
              {messages.map((message) => <MessageBubble key={message.id} msg={message} />)}
              {showStarters && <StarterPanel loading={loading} activeChip={activeChip} onSelect={selectStarter} onNavigate={closePanel} />}
              <AnimatePresence>
                {showScrollButton && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} type="button" onClick={() => scrollToBottom(true)} className="assistant-scroll-button">
                    <FiChevronDown /> Latest
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <footer className="assistant-composer">
              {connection === "error" && lastQuestion && (
                <div className="assistant-retry" role="status"><span>Response failed.</span><button type="button" disabled={loading} onClick={() => submitMessage(lastQuestion)}>Retry question</button></div>
              )}
              <div className="assistant-input-wrap">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(event) => { setInput(event.target.value); setActiveChip(null); autoResize(event.target); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about projects, skills, or experience…"
                  aria-label="Message"
                  disabled={loading}
                  maxLength={500}
                />
                {input.length > 420 && <span className={`assistant-character-count ${input.length >= 500 ? "is-full" : ""}`}>{500 - input.length}</span>}
                <button
                  type="button"
                  onClick={loading ? stopResponse : () => submitMessage(input)}
                  disabled={!loading && !input.trim()}
                  className={`assistant-send ${loading ? "is-stop" : ""}`}
                  aria-label={loading ? "Stop response" : "Send"}
                >
                  {loading ? <FiSquare /> : <FiSend />}
                </button>
              </div>
              <p>Enter to send · Shift + Enter for new line</p>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
