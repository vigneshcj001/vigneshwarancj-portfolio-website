import { track } from "@vercel/analytics";
// Do not send contact details, form contents, or chat messages to analytics.
export function trackConversion(name, properties = {}) {
  try { track(name, properties); } catch { /* Tracking must not interrupt the visitor. */ }
}
