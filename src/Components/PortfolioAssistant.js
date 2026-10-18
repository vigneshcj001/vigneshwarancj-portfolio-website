import { Link, useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import {
  FiCheck, FiChevronDown, FiClock, FiCopy, FiDownload, FiEdit3, FiEye,
  FiMic, FiPlus, FiRefreshCw, FiSearch, FiSend, FiShare2, FiSquare,
  FiThumbsDown, FiThumbsUp, FiTrash2, FiType, FiUserPlus, FiX,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import botAvatar from "url:../assets/portrait-640.webp";
import useAssistantChat from "../features/assistant/useAssistantChat";
import { STARTER_QUESTIONS } from "../features/assistant/constants";
import { useLanguage } from "../Contexts/LanguageContext";
import { projects } from "../data/projects";
import { portfolioApi } from "../services/portfolioApi";
import { executeAgentAction, highlightAgentTarget, validateAgentAction } from "../features/assistant/actions";

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

function projectForSlug(slug) {
  const names = { aiora: "AIORA", pocketpet: "PocketPet", glycanbench: "GlycanBench", syncly: "Syncly" };
  return projects.find((project) => project.title.startsWith(names[slug] || "__missing__"));
}

function ProjectAnswerCard({ slug, onNavigate }) {
  const project = projectForSlug(slug);
  if (!project) return null;
  return (
    <aside className="assistant-project-card">
      <div><span>Related project</span><strong>{project.title.replace(": a unified resource for working with glycans", "")}</strong><p>{project.subtitle}</p></div>
      <div className="assistant-project-tags">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div><Link to={`/projects/${slug}`} onClick={onNavigate}>Case study</Link>{project.link && <a href={project.link} target="_blank" rel="noreferrer">Live project ↗</a>}</div>
    </aside>
  );
}

function AgentActionButtons({ actions = [], onAction }) {
  const visible = actions.filter((action) => !action.auto_execute || action.type === "walkthrough" || action.type === "contact");
  if (!visible.length) return null;
  return <div className="assistant-agent-actions" aria-label="Portfolio actions">
    {visible.map((action) => <button key={`${action.type}-${action.target}`} type="button" onClick={() => onAction(action)}>
      <HiSparkles /> {action.label}
    </button>)}
  </div>;
}

function MessageExtras({ msg, feedback, onFeedback, onFollowup, onRegenerate, onShare, onNavigate, onAgentAction }) {
  if (!msg.done || msg.error || msg.stopped || (!msg.question && !msg.sources?.length)) return null;
  return (
    <div className="assistant-answer-extras">
      {msg.project && <ProjectAnswerCard slug={msg.project} onNavigate={onNavigate} />}
      <AgentActionButtons actions={msg.actions} onAction={onAgentAction} />
      {!!msg.sources?.length && (
        <div className="assistant-citations"><span>Sources</span>{msg.sources.map((source) => <Link key={`${source.url}-${source.title}`} to={source.url} onClick={onNavigate}>{source.title}</Link>)}</div>
      )}
      {!!msg.followups?.length && (
        <div className="assistant-followups"><span>Continue exploring</span>{msg.followups.map((question) => <button key={question} type="button" onClick={() => onFollowup(question)}>{question}</button>)}</div>
      )}
      <div className="assistant-answer-actions" aria-label="Answer actions">
        <button type="button" onClick={() => onFeedback(msg, "helpful")} className={feedback === "helpful" ? "is-active" : ""} aria-label="Helpful answer"><FiThumbsUp /></button>
        <button type="button" onClick={() => onFeedback(msg, "not_helpful")} className={feedback === "not_helpful" ? "is-active" : ""} aria-label="Not helpful answer"><FiThumbsDown /></button>
        <button type="button" onClick={() => onRegenerate(msg.question)} aria-label="Regenerate answer"><FiRefreshCw /></button>
        <button type="button" onClick={() => onShare(msg.text)} aria-label="Share answer"><FiShare2 /></button>
      </div>
    </div>
  );
}

function MessageBubble({ msg, feedback, onEdit, onFeedback, onFollowup, onRegenerate, onShare, onNavigate, onAgentAction }) {
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
        {!isUser && (msg.agentStatus || msg.tools?.length) && <div className="assistant-agent-trace">
          <span><HiSparkles /> {msg.agentStatus || "Portfolio tools complete"}</span>
          {!!msg.tools?.length && <small>{msg.tools.map((tool) => tool.name.replaceAll("_", " ")).join(" · ")}</small>}
        </div>}
        <div className="assistant-message-meta">
          <time dateTime={new Date(msg.ts).toISOString()}>{fmtTime(msg.ts)}</time>
          {!isUser && msg.done && msg.text && !msg.error && <CopyButton text={msg.text} />}
          {isUser && <button type="button" className="assistant-copy" onClick={() => onEdit(msg.text)} aria-label="Edit question"><FiEdit3 /></button>}
        </div>
        {!isUser && <MessageExtras msg={msg} feedback={feedback} onFeedback={onFeedback} onFollowup={onFollowup} onRegenerate={onRegenerate} onShare={onShare} onNavigate={onNavigate} onAgentAction={onAgentAction} />}
      </div>
    </motion.article>
  );
}

function StarterPanel({ loading, activeChip, onSelect, onNavigate }) {
  return (
    <section className="assistant-starters" aria-label="Suggested questions">
      <div className="assistant-starter-heading">
        <div><HiSparkles /><strong>Experience Agentic AI</strong></div>
        <p>Choose a demo. Agent selects tools and shows each action.</p>
      </div>
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
            <span><strong>{question.title}</strong><small>{question.capability}</small></span>
          </button>
        ))}
      </div>
      <div className="assistant-resources" aria-label="Popular portfolio links">
        <Link to="/projects/aiora" onClick={onNavigate}>AIORA</Link>
        <Link to="/projects/pocketpet" onClick={onNavigate}>PocketPet</Link>
        <Link to="/projects/glycanbench" onClick={onNavigate}>GlycanBench</Link>
      </div>
      <div className="assistant-recruiter-shortcuts" aria-label="Recruiter shortcuts">
        <span>Recruiter shortcuts</span>
        <Link to="/resume" onClick={onNavigate}>Résumé</Link>
        <button type="button" onClick={() => onSelect("Is Vigneshwaran available for a new role?", null)}>Availability</button>
        <button type="button" onClick={() => onSelect("Show his strongest projects", null)}>Best work</button>
        <Link to="/contact" onClick={onNavigate}>Contact</Link>
      </div>
    </section>
  );
}

function ConnectionLabel({ connection, loading }) {
  if (loading) return "Writing response";
  if (connection === "reconnecting") return "Reconnecting";
  if (connection === "error") return "Connection unavailable";
  return "Ready to answer";
}

function HistoryPanel({ sessions, activeId, onClose, onNew, onSwitch, onRename, onDelete, largeText, setLargeText, highContrast, setHighContrast }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const filtered = sessions.filter((session) => !normalized || session.title.toLowerCase().includes(normalized) || session.messages.some((message) => message.text?.toLowerCase().includes(normalized)));
  return (
    <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: .2 }} className="assistant-history" aria-label="Conversation history">
      <div className="assistant-history-header"><strong>Conversations</strong><button type="button" onClick={onClose} aria-label="Close history"><FiX /></button></div>
      <button type="button" className="assistant-new-chat" onClick={onNew}><FiPlus /> New conversation</button>
      <label className="assistant-history-search"><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" aria-label="Search conversations" /></label>
      <div className="assistant-session-list">
        {filtered.map((session) => (
          <div key={session.id} className={session.id === activeId ? "is-active" : ""}>
            <button type="button" onClick={() => onSwitch(session.id)}><span>{session.title}</span><small>{session.messages.length - 1} messages · {new Date(session.updatedAt).toLocaleDateString()}</small></button>
            <button type="button" onClick={() => { const next = window.prompt("Rename conversation", session.title); if (next) onRename(session.id, next); }} aria-label={`Rename ${session.title}`}><FiEdit3 /></button>
            <button type="button" onClick={() => onDelete(session.id)} aria-label={`Delete ${session.title}`}><FiTrash2 /></button>
          </div>
        ))}
        {!filtered.length && <p>No matching conversations.</p>}
      </div>
      <div className="assistant-accessibility-settings">
        <span>Reading settings</span>
        <button type="button" className={largeText ? "is-active" : ""} onClick={() => setLargeText(!largeText)}><FiType /> Larger text</button>
        <button type="button" className={highContrast ? "is-active" : ""} onClick={() => setHighContrast(!highContrast)}><FiEye /> High contrast</button>
      </div>
    </motion.aside>
  );
}

export default function PortfolioAssistant() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const launcherRef = useRef(null);
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const nearBottomRef = useRef(true);
  const recognitionRef = useRef(null);
  const touchStartRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [feedback, setFeedback] = useState({});
  const [walkthrough, setWalkthrough] = useState(null);
  const [walkthroughIndex, setWalkthroughIndex] = useState(0);
  const executedActionsRef = useRef(new Set());
  const [largeText, setLargeText] = useState(() => localStorage.getItem("assistant-large-text") === "true");
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem("assistant-high-contrast") === "true");
  const {
    connection, lastQuestion, messages, input, setInput, activeChip, setActiveChip,
    loading, sendMessage, clearChat, stopResponse, sessions, activeSessionId,
    newChat, switchSession, renameSession, deleteSession, usageRemaining,
  } = useAssistantChat(language);

  useEffect(() => {
    const openFromPage = (event) => {
      const question = typeof event.detail?.question === "string" ? event.detail.question : "";
      setOpen(true);
      if (!question) return;
      setInput(question);
      if (event.detail?.autoSubmit && !loading) sendMessage(question);
    };
    window.addEventListener("portfolio-assistant:open", openFromPage);
    return () => window.removeEventListener("portfolio-assistant:open", openFromPage);
  }, [loading, sendMessage, setInput]);

  const closePanel = () => {
    recognitionRef.current?.stop();
    setShowHistory(false);
    setOpen(false);
    setTimeout(() => launcherRef.current?.focus(), 100);
  };

  const scrollToBottom = (smooth = false) => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTo({ top: element.scrollHeight, behavior: smooth ? "smooth" : "instant" });
  };

  useEffect(() => { if (nearBottomRef.current) scrollToBottom(false); }, [messages]);
  useEffect(() => { localStorage.setItem("assistant-large-text", String(largeText)); }, [largeText]);
  useEffect(() => { localStorage.setItem("assistant-high-contrast", String(highContrast)); }, [highContrast]);
  useEffect(() => {
    if (!open) return undefined;
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [open]);
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape" && open) {
        if (showHistory) setShowHistory(false);
        else closePanel();
      }
      if (event.key === "Tab" && open && panelRef.current) {
        const controls = [...panelRef.current.querySelectorAll('button:not(:disabled),a[href],textarea:not(:disabled),input:not(:disabled)')];
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, showHistory]);
  useEffect(() => { if (!input && inputRef.current) inputRef.current.style.height = "auto"; }, [input]);
  useEffect(() => {
    const latest = [...messages].reverse().find((message) => message.from === "bot" && message.done && message.actions?.length);
    if (!latest) return;
    latest.actions.forEach((action) => {
      const key = `${latest.id}:${action.type}:${action.target}`;
      if (executedActionsRef.current.has(key)) return;
      executedActionsRef.current.add(key);
      executeAgentAction(action, navigate);
    });
  }, [messages, navigate]);

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

  const startVoice = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceError("Voice input is unavailable in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const locale = { en: "en-IN", ta: "ta-IN", fr: "fr-FR", "zh-CN": "zh-CN", hi: "hi-IN", es: "es-ES", ar: "ar-SA" }[language];
    const recognition = new Recognition();
    recognition.lang = locale;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onstart = () => { setListening(true); setVoiceError(""); };
    recognition.onresult = (event) => setInput([...event.results].map((result) => result[0].transcript).join(""));
    recognition.onerror = () => setVoiceError("Could not capture voice. Try again.");
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const shareAnswer = async (text) => {
    const data = { title: "Vigneshwaran portfolio answer", text, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(`${text}\n\n${window.location.href}`);
    } catch {}
  };

  const downloadTranscript = () => {
    const transcript = messages.map((message) => `${message.from === "user" ? "You" : "Portfolio AI"}: ${message.text}`).join("\n\n");
    const url = URL.createObjectURL(new Blob([transcript], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "vigneshwaran-portfolio-chat.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const recordFeedback = (message, rating) => {
    setFeedback((current) => ({ ...current, [message.id]: rating }));
    portfolioApi.event({ name: "assistant_feedback", path: window.location.pathname, properties: { rating, has_sources: !!message.sources?.length } }).catch(() => {});
  };

  const editQuestion = (text) => {
    setInput(text);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const runAgentAction = (action) => {
    const safe = validateAgentAction(action);
    if (!safe) return;
    if (safe.type === "contact") {
      const topic = String(safe.data?.topic || "your portfolio").slice(0, 240);
      navigate(`/contact?message=${encodeURIComponent(`Hi Vigneshwaran, I reviewed your portfolio and would like to discuss ${topic}.`)}`);
      closePanel();
      return;
    }
    if (safe.type === "walkthrough") {
      setWalkthrough(safe);
      setWalkthroughIndex(0);
      navigate(safe.resolved.path);
      setTimeout(() => highlightAgentTarget("[data-walkthrough-step='0']"), 180);
      return;
    }
    navigate(safe.resolved.path);
    setTimeout(() => highlightAgentTarget(safe.resolved.selector), 150);
  };

  const moveWalkthrough = (next) => {
    const steps = walkthrough?.data?.steps || [];
    const index = Math.max(0, Math.min(steps.length - 1, next));
    setWalkthroughIndex(index);
    highlightAgentTarget(`[data-walkthrough-step='${index}']`);
  };

  const handleTouchStart = (event) => { touchStartRef.current = event.touches[0]?.clientY ?? null; };
  const handleTouchEnd = (event) => {
    const end = event.changedTouches[0]?.clientY;
    if (touchStartRef.current != null && end - touchStartRef.current > 90) closePanel();
    touchStartRef.current = null;
  };

  const showStarters = messages.length === 1;
  const lastUserMessage = [...messages].reverse().find((message) => message.from === "user")?.text || "your portfolio";
  const contactUrl = `/contact?message=${encodeURIComponent(`Hi Vigneshwaran, I reviewed your portfolio and would like to discuss ${lastUserMessage}.`)}`;

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
            ref={panelRef}
            key="assistant-panel"
            role="region"
            aria-label="Portfolio assistant"
            aria-labelledby="assistant-title"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className={`assistant-panel ${largeText ? "assistant-text-large" : ""} ${highContrast ? "assistant-high-contrast" : ""}`}
          >
            <header className="assistant-header" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <span className="assistant-drag-handle" aria-hidden="true" />
              <div className="assistant-identity">
                <span className="assistant-brand-icon"><HiSparkles /></span>
                <div>
                  <h2 id="assistant-title">Portfolio assistant</h2>
                  <p className={connection === "error" ? "is-error" : ""}><i /> <ConnectionLabel connection={connection} loading={loading} /></p>
                </div>
              </div>
              <div className="assistant-header-actions">
                <button type="button" onClick={() => setShowHistory(true)} title="Conversation history" aria-label="Conversation history"><FiClock /></button>
                <button type="button" onClick={newChat} title="New conversation" aria-label="New conversation"><FiPlus /></button>
                <button type="button" onClick={downloadTranscript} disabled={messages.length === 1} title="Download transcript" aria-label="Download transcript"><FiDownload /></button>
                <button type="button" onClick={clearChat} disabled={messages.length === 1 && !loading} title="Clear chat" aria-label="Clear chat"><FiTrash2 /></button>
                <button type="button" onClick={closePanel} aria-label="Close"><FiX /></button>
              </div>
            </header>

            <div ref={scrollRef} onScroll={handleScroll} role="log" aria-live="polite" aria-relevant="additions text" aria-busy={loading} className="assistant-conversation">
              <div className="assistant-context-note"><span>OKF</span><span>Laya</span><span>LangGraph</span><span>Groq</span><p>Plans · uses tools · acts safely</p></div>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  msg={message}
                  feedback={feedback[message.id]}
                  onEdit={editQuestion}
                  onFeedback={recordFeedback}
                  onFollowup={submitMessage}
                  onRegenerate={(question) => question && sendMessage(question, { appendUser: false })}
                  onShare={shareAnswer}
                  onNavigate={closePanel}
                  onAgentAction={runAgentAction}
                />
              ))}
              {showStarters && <StarterPanel loading={loading} activeChip={activeChip} onSelect={selectStarter} onNavigate={closePanel} />}
              <AnimatePresence>
                {showScrollButton && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} type="button" onClick={() => scrollToBottom(true)} className="assistant-scroll-button">
                    <FiChevronDown /> Latest
                  </motion.button>
                )}
              </AnimatePresence>
              {!showStarters && <div className="assistant-handoff"><span>Want to continue with Vigneshwaran?</span><Link to={contactUrl} onClick={closePanel}><FiUserPlus /> Prepare contact message</Link></div>}
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
                <button type="button" onClick={startVoice} className={`assistant-voice ${listening ? "is-listening" : ""}`} aria-label={listening ? "Stop voice input" : "Start voice input"}><FiMic /></button>
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
              {voiceError && <p className="assistant-voice-error" role="status">{voiceError}</p>}
              <p><span>Enter to send · Shift + Enter for new line</span><span>{usageRemaining} requests left today</span></p>
            </footer>
            <AnimatePresence>
              {showHistory && (
                <HistoryPanel
                  sessions={sessions}
                  activeId={activeSessionId}
                  onClose={() => setShowHistory(false)}
                  onNew={() => { newChat(); setShowHistory(false); }}
                  onSwitch={(id) => { switchSession(id); setShowHistory(false); }}
                  onRename={renameSession}
                  onDelete={deleteSession}
                  largeText={largeText}
                  setLargeText={setLargeText}
                  highContrast={highContrast}
                  setHighContrast={setHighContrast}
                />
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {walkthrough && <motion.aside className="assistant-walkthrough" role="dialog" aria-label="Project walkthrough" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
          <div><span>Interactive walkthrough</span><button type="button" onClick={() => setWalkthrough(null)} aria-label="Close walkthrough"><FiX /></button></div>
          <strong>{walkthrough.data.steps[walkthroughIndex]}</strong>
          <p>Step {walkthroughIndex + 1} of {walkthrough.data.steps.length}</p>
          <nav>
            <button type="button" disabled={walkthroughIndex === 0} onClick={() => moveWalkthrough(walkthroughIndex - 1)}>Previous</button>
            <button type="button" disabled={walkthroughIndex === walkthrough.data.steps.length - 1} onClick={() => moveWalkthrough(walkthroughIndex + 1)}>Next</button>
          </nav>
        </motion.aside>}
      </AnimatePresence>
    </>
  );
}
