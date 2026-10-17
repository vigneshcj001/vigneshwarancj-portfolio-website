import { track } from "@vercel/analytics";
import { portfolioApi } from "../services/portfolioApi";
// Do not send contact details, form contents, or chat messages to analytics.
export function trackConversion(name, properties = {}) {
  try { track(name, properties); } catch { /* Tracking must not interrupt the visitor. */ }
  try {
    portfolioApi.event({ name, path: window.location.pathname, properties }).catch(() => {});
  } catch { /* First-party analytics must not interrupt visitor. */ }
}
