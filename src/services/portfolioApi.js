import { apiUrl } from "../config/runtime";

export class PortfolioApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "PortfolioApiError";
    this.status = status;
  }
}

async function errorMessage(response) {
  const payload = await response.json().catch(() => ({}));
  return typeof payload.detail === "string" ? payload.detail : `Request failed: ${response.status}`;
}

export async function requestJson(path, options = {}) {
  const headers = { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers };
  const response = await fetch(apiUrl(path), { ...options, headers });
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
