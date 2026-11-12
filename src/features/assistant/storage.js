import { createInitialMessage } from "./constants";

const SESSIONS_KEY = "portfolio-assistant-sessions-v2";
const ACTIVE_KEY = "portfolio-assistant-active-session-v2";
const USAGE_KEY = "portfolio-assistant-usage-v1";

// The conversation ID doubles as the server-side key for chat history (and the
// right to delete it), so it must be unguessable. Date.now() + Math.random()
// keeps only ~3 random decimal digits once added to a 13-digit timestamp.
function randomSessionId() {
  try {
    if (crypto.randomUUID) return `s-${crypto.randomUUID()}`;
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return `s-${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  } catch {
    return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
  }
}

export function createSession() {
  return { id: randomSessionId(), title: "New conversation", createdAt: Date.now(), updatedAt: Date.now(), messages: [createInitialMessage()] };
}

export function loadSessionState() {
  try {
    const retiredIds = [];
    const renamed = new Map();
    const sessions = JSON.parse(localStorage.getItem(SESSIONS_KEY) || "[]")
      .filter((session) => session?.id && Array.isArray(session.messages))
      .slice(0, 12)
      .map((session) => {
        let id = String(session.id);
        // Older timestamp-based IDs are guessable: re-key them. The caller erases
        // the server copy under the old ID; the next request sends local history.
        if (!id.startsWith("s-")) {
          retiredIds.push(id);
          const next = randomSessionId();
          renamed.set(id, next);
          id = next;
        }
        return { ...session, id, messages: session.messages.map((message) => ({ ...message, done: true, runActions: false })) };
      });
    if (sessions.length) {
      const savedActive = localStorage.getItem(ACTIVE_KEY);
      const active = renamed.get(savedActive) || savedActive;
      return { sessions, retiredIds, activeId: sessions.some((item) => item.id === active) ? active : sessions[0].id };
    }
  } catch {}
  const session = createSession();
  return { sessions: [session], retiredIds: [], activeId: session.id };
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
