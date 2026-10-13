import { track } from "@vercel/analytics";
// Do not send contact details, form contents, or chat messages to analytics.
export function trackConversion(name, properties = {}) {
  try { track(name, properties); } catch { /* Tracking must not interrupt the visitor. */ }
  try {
    fetch("https://vigneshwarancj-portfolio-backend.onrender.com/api/events", {
      method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
      body: JSON.stringify({ name, path: window.location.pathname, properties }),
    }).catch(() => {});
  } catch { /* First-party analytics must not interrupt visitor. */ }
}
