import { portfolioApi } from "../services/portfolioApi";

// First-party error monitoring: uncaught errors reach the admin page without a
// third-party SDK. Messages are truncated, query strings are never sent, and
// each page load reports at most MAX_REPORTS distinct errors.
const MAX_REPORTS = 10;
const IGNORED = [/^Script error\.?$/i, /ResizeObserver loop/i, /chrome-extension:|moz-extension:|safari-extension:/i];
const seen = new Set();
let installed = false;

export function reportError(error, kind = "error", source = "", line = 0) {
  try {
    const message = String(error?.message || error || "Unknown error").slice(0, 300);
    if (IGNORED.some((pattern) => pattern.test(message) || pattern.test(source))) return;
    const key = `${kind}:${message}:${source}:${line}`;
    if (seen.has(key) || seen.size >= MAX_REPORTS) return;
    seen.add(key);
    portfolioApi.reportClientError({
      message,
      kind,
      source: String(source || "").split("?")[0].slice(0, 200),
      line: Number(line) || 0,
      path: window.location.pathname.slice(0, 200),
    });
  } catch { /* reporting must never cause another error */ }
}

export function installErrorReporter() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  window.addEventListener("error", (event) => reportError(event.error || event.message, "error", event.filename, event.lineno));
  window.addEventListener("unhandledrejection", (event) => reportError(event.reason, "unhandledrejection"));
}
