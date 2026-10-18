import { createId, createInitialMessage } from "./constants";

const SESSIONS_KEY = "portfolio-assistant-sessions-v2";
const ACTIVE_KEY = "portfolio-assistant-active-session-v2";
const USAGE_KEY = "portfolio-assistant-usage-v1";

export function createSession() {
  return { id: String(createId()), title: "New conversation", createdAt: Date.now(), updatedAt: Date.now(), messages: [createInitialMessage()] };
}

export function loadSessionState() {
  try {
    const sessions = JSON.parse(localStorage.getItem(SESSIONS_KEY) || "[]")
      .filter((session) => session?.id && Array.isArray(session.messages))
      .map((session) => ({ ...session, messages: session.messages.map((message) => ({ ...message, done: true, runActions: false })) }))
      .slice(0, 12);
    if (sessions.length) {
      const savedActive = localStorage.getItem(ACTIVE_KEY);
      return { sessions, activeId: sessions.some((item) => item.id === savedActive) ? savedActive : sessions[0].id };
    }
  } catch {}
  const session = createSession();
  return { sessions: [session], activeId: session.id };
}

export function saveSessionState(sessions, activeId) {
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.slice(0, 12)));
    localStorage.setItem(ACTIVE_KEY, activeId);
  } catch {}
}

export function readDailyUsage() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const saved = JSON.parse(localStorage.getItem(USAGE_KEY) || "{}");
    return saved.date === today ? { date: today, count: Number(saved.count) || 0 } : { date: today, count: 0 };
  } catch {
    return { date: today, count: 0 };
  }
}

export function writeDailyUsage(usage) {
  try { localStorage.setItem(USAGE_KEY, JSON.stringify(usage)); } catch {}
}
