import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { consumeAssistantStream } from "./stream";
import { createId, createInitialMessage, MAX_HISTORY } from "./constants";
import { createSession, loadSessionState, readDailyUsage, saveSessionState, writeDailyUsage } from "./storage";

const DAILY_LIMIT = 40;

export default function useAssistantChat(language = "en") {
  const initial = useMemo(loadSessionState, []);
  const [sessions, setSessions] = useState(initial.sessions);
  const [activeSessionId, setActiveSessionId] = useState(initial.activeId);
  const [connection, setConnection] = useState("idle");
  const [lastQuestion, setLastQuestion] = useState("");
  const [input, setInput] = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState(readDailyUsage);
  const abortRef = useRef(null);
  const messagesRef = useRef([]);

  const activeSession = sessions.find((session) => session.id === activeSessionId) || sessions[0];
  const messages = activeSession?.messages || [createInitialMessage()];

  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => {
    const timer = setTimeout(() => saveSessionState(sessions, activeSessionId), 250);
    return () => clearTimeout(timer);
  }, [sessions, activeSessionId]);
  useEffect(() => () => abortRef.current?.abort(), []);

  const updateMessages = useCallback((updater) => {
    setSessions((current) => current.map((session) => {
      if (session.id !== activeSessionId) return session;
      const nextMessages = typeof updater === "function" ? updater(session.messages) : updater;
      const firstQuestion = nextMessages.find((message) => message.from === "user")?.text;
      return {
        ...session,
        title: session.title === "New conversation" && firstQuestion ? firstQuestion.slice(0, 42) : session.title,
        updatedAt: Date.now(),
        messages: nextMessages,
      };
    }));
  }, [activeSessionId]);

  const patchMessage = useCallback((id, patch) => {
    updateMessages((current) => current.map((message) => message.id === id ? { ...message, ...patch } : message));
  }, [updateMessages]);

  const incrementUsage = () => {
    setUsage((current) => {
      const today = new Date().toISOString().slice(0, 10);
      const next = current.date === today ? { date: today, count: current.count + 1 } : { date: today, count: 1 };
      writeDailyUsage(next);
      return next;
    });
  };

  const sendMessage = useCallback(async (text, options = {}) => {
    const message = text.trim();
    if (!message || loading) return;
    if (usage.count >= DAILY_LIMIT) {
      updateMessages((current) => [...current, { id: createId(), from: "bot", text: "Daily chat limit reached. Please continue tomorrow or use the contact page.", ts: Date.now(), done: true, error: true }]);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    let timedOut = false;
    const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 45000);
    const history = messagesRef.current
      .filter((item) => item.done && item.text && !item.error && !item.stopped)
      .slice(-MAX_HISTORY)
      .map((item) => ({ role: item.from === "user" ? "user" : "assistant", content: item.text }));
    const userId = createId();
    const botId = createId();
    const now = Date.now();

    setConnection("connecting");
    setLastQuestion(message);
    updateMessages((current) => [
      ...current,
      ...(options.appendUser === false ? [] : [{ id: userId, from: "user", text: message, ts: now, done: true }]),
      { id: botId, from: "bot", text: "", question: message, ts: now + 1, done: false },
    ]);
    setInput("");
    setActiveChip(null);
    setLoading(true);
    incrementUsage();

    try {
      let result;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          setConnection(attempt ? "reconnecting" : "connected");
          if (attempt) patchMessage(botId, { text: "" });
          result = await consumeAssistantStream(
            { message, history, language },
            controller.signal,
            (chunk) => updateMessages((current) => current.map((item) =>
              item.id === botId ? { ...item, text: `${item.text || ""}${chunk}` } : item
            )),
          );
          break;
        } catch (error) {
          if (controller.signal.aborted || attempt === 1) throw error;
          await new Promise((resolve) => setTimeout(resolve, 450));
        }
      }
      patchMessage(botId, { text: result.full, done: true, sources: result.sources, followups: result.followups, project: result.project });
      setConnection("connected");
    } catch (error) {
      if (controller.signal.aborted && !timedOut) return;
      setConnection("error");
      patchMessage(botId, {
        text: timedOut ? "Response timed out. Retry or use the contact page." : error.message || "Connection failed. Retry or use the contact page.",
        done: true,
        error: true,
      });
    } finally {
      clearTimeout(timeout);
      if (abortRef.current === controller) setLoading(false);
    }
  }, [language, loading, patchMessage, updateMessages, usage.count]);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    updateMessages([createInitialMessage()]);
    setConnection("idle");
    setLastQuestion("");
    setLoading(false);
    setInput("");
    setActiveChip(null);
  }, [updateMessages]);

  const stopResponse = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    updateMessages((current) => current.map((item) =>
      item.from === "bot" && !item.done ? { ...item, text: item.text || "Response stopped.", done: true, stopped: true } : item
    ));
    setConnection("idle");
    setLoading(false);
  }, [updateMessages]);

  const newChat = useCallback(() => {
    stopResponse();
    const session = createSession();
    setSessions((current) => [session, ...current].slice(0, 12));
    setActiveSessionId(session.id);
    setInput("");
  }, [stopResponse]);

  const switchSession = useCallback((id) => {
    stopResponse();
    setActiveSessionId(id);
    setConnection("idle");
  }, [stopResponse]);

  const renameSession = useCallback((id, title) => {
    const clean = title.trim().slice(0, 60);
    if (clean) setSessions((current) => current.map((session) => session.id === id ? { ...session, title: clean } : session));
  }, []);

  const deleteSession = useCallback((id) => {
    const remaining = sessions.filter((session) => session.id !== id);
    if (remaining.length) {
      setSessions(remaining);
      if (id === activeSessionId) setActiveSessionId(remaining[0].id);
      return;
    }
    const replacement = createSession();
    setSessions([replacement]);
    setActiveSessionId(replacement.id);
  }, [activeSessionId, sessions]);

  return {
    connection, lastQuestion, messages, input, setInput, activeChip, setActiveChip,
    loading, sendMessage, clearChat, stopResponse, sessions, activeSessionId,
    newChat, switchSession, renameSession, deleteSession, usageRemaining: Math.max(0, DAILY_LIMIT - usage.count),
  };
}
