import { useCallback, useEffect, useRef, useState } from "react";
import { consumeAssistantStream } from "./stream";
import { createId, createInitialMessage, MAX_HISTORY } from "./constants";

export default function useAssistantChat() {
  const [connection, setConnection] = useState("idle");
  const [lastQuestion, setLastQuestion] = useState("");
  const [messages, setMessages] = useState(() => [createInitialMessage()]);
  const [input, setInput] = useState("");
  const [activeChip, setActiveChip] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);
  const messagesRef = useRef(messages);

  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => () => abortRef.current?.abort(), []);

  const patchMessage = useCallback((id, patch) => {
    setMessages((current) => current.map((message) => message.id === id ? { ...message, ...patch } : message));
  }, []);

  const sendMessage = useCallback(async (text) => {
    const message = text.trim();
    if (!message || loading) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    let timedOut = false;
    const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 45000);
    const history = messagesRef.current
      .filter((item) => item.done && item.text && !item.error)
      .slice(-MAX_HISTORY)
      .map((item) => ({ role: item.from === "user" ? "user" : "assistant", content: item.text }));
    const userId = createId();
    const botId = createId();
    const now = Date.now();

    setConnection("connecting");
    setLastQuestion(message);
    setMessages((current) => [
      ...current,
      { id: userId, from: "user", text: message, ts: now, done: true },
      { id: botId, from: "bot", text: "", ts: now + 1, done: false },
    ]);
    setInput("");
    setActiveChip(null);
    setLoading(true);

    try {
      setConnection("connected");
      const full = await consumeAssistantStream(
        { message, history },
        controller.signal,
        (chunk) => setMessages((current) => current.map((item) =>
          item.id === botId ? { ...item, text: `${item.text || ""}${chunk}` } : item
        )),
      );
      patchMessage(botId, { text: full, done: true });
    } catch (error) {
      if (controller.signal.aborted && !timedOut) return;
      setConnection("error");
      patchMessage(botId, {
        text: timedOut ? "The service took too long to respond. Please retry or explore the links below." : error.message || "Connection failed. Please retry or explore the links below.",
        done: true,
        error: true,
      });
    } finally {
      clearTimeout(timeout);
      if (abortRef.current === controller) setLoading(false);
    }
  }, [loading, patchMessage]);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setConnection("idle");
    setLastQuestion("");
    setMessages([createInitialMessage()]);
    setLoading(false);
    setInput("");
    setActiveChip(null);
  }, []);

  const stopResponse = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages((current) => current.map((item) =>
      item.from === "bot" && !item.done
        ? { ...item, text: item.text || "Response stopped.", done: true, stopped: true }
        : item
    ));
    setConnection("idle");
    setLoading(false);
  }, []);

  return {
    connection, lastQuestion, messages, input, setInput, activeChip, setActiveChip,
    loading, sendMessage, clearChat, stopResponse,
  };
}
