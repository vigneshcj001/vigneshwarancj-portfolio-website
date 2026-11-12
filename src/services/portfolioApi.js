import { apiUrl } from "../config/runtime";

export class PortfolioApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "PortfolioApiError";
    this.status = status;
  }
}

// The API is hosted on a free tier that can take ~30s to wake from sleep, so
// requests get a generous ceiling instead of hanging forever.
const DEFAULT_TIMEOUT_MS = 45000;

const STATUS_MESSAGES = {
  429: "Too many requests — please wait a moment and try again.",
  502: "The portfolio API is waking up. Please try again in a few seconds.",
  503: "This feature is temporarily unavailable. Please try again later.",
  504: "The portfolio API took too long to respond. Please try again.",
};

async function errorMessage(response) {
  const payload = await response.json().catch(() => ({}));
  if (typeof payload.detail === "string") return payload.detail;
  return STATUS_MESSAGES[response.status] || `Request failed (${response.status}). Please try again.`;
}

function withTimeout(signal, timeoutMs) {
  if (!timeoutMs || typeof AbortSignal === "undefined" || !AbortSignal.timeout) return signal;
  const timeout = AbortSignal.timeout(timeoutMs);
  if (!signal) return timeout;
  return AbortSignal.any ? AbortSignal.any([signal, timeout]) : signal;
}

async function send(path, { timeoutMs = DEFAULT_TIMEOUT_MS, signal, ...options } = {}) {
  try {
    return await fetch(apiUrl(path), { ...options, signal: withTimeout(signal, timeoutMs) });
  } catch (error) {
    // A caller-initiated abort should propagate unchanged so callers can ignore it.
    if (signal?.aborted) throw error;
    if (error?.name === "TimeoutError") {
      throw new PortfolioApiError(STATUS_MESSAGES[504], 0);
    }
    throw new PortfolioApiError("Couldn’t reach the portfolio API. Check your connection and try again.", 0);
  }
}

export async function requestJson(path, options = {}) {
  const headers = { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers };
  const response = await send(path, { ...options, headers });
  if (!response.ok) throw new PortfolioApiError(await errorMessage(response), response.status);
  return response.json();
}

export async function openAssistantStream(payload, signal) {
  const response = await fetch(apiUrl("/api/assistant/stream"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  if (!response.ok || !response.body) {
    throw new PortfolioApiError(await errorMessage(response), response.status);
  }
  return response;
}

export const portfolioApi = {
  proof: (signal) => requestJson("/api/proof", { signal }),
  demo: (slug, input) => requestJson(`/api/demo/${encodeURIComponent(slug)}`, {
    method: "POST", body: JSON.stringify({ input }),
  }),
  newsletter: (email) => requestJson("/api/newsletter", {
    method: "POST", body: JSON.stringify({ email }),
  }),
  contact: (payload) => requestJson("/api/contact", {
    method: "POST", body: JSON.stringify(payload),
  }),
  translate: (language, texts) => requestJson("/api/translate", {
    method: "POST", body: JSON.stringify({ language, texts }),
  }),
  event: (payload) => requestJson("/api/events", {
    method: "POST", body: JSON.stringify(payload), keepalive: true,
  }),
  admin: (path, key, options = {}) => requestJson(path, {
    ...options,
    headers: { "X-Admin-Key": key, ...options.headers },
  }),
  resume: async (signal) => {
    const response = await fetch(apiUrl("/api/resume"), { signal });
    if (!response.ok) throw new PortfolioApiError(`Server error: ${response.status}`, response.status);
    return response.blob();
  },
};
