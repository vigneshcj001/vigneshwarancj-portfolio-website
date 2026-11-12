import { track } from "@vercel/analytics";
import { portfolioApi } from "../services/portfolioApi";
// Do not send contact details, form contents, or chat messages to analytics.
export function trackConversion(name, properties = {}) {
  try { track(name, properties); } catch { /* Tracking must not interrupt the visitor. */ }
  recordEvent(name, properties);
}

// First-party only (feeds the admin funnel); Vercel already counts page views.
export function recordEvent(name, properties = {}) {
  try {
    portfolioApi.event({ name, path: window.location.pathname.slice(0, 200), properties }).catch(() => {});
  } catch { /* First-party analytics must not interrupt visitor. */ }
}
