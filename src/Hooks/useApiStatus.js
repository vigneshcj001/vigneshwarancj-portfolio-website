import { useEffect, useSyncExternalStore } from "react";
import { portfolioApi } from "../services/portfolioApi";

// One shared probe per page load. The free-tier API sleeps when idle and takes
// ~30s to wake, so pinging /api/health shortly after load means it is usually
// awake by the time a visitor asks the assistant something.
const WAKING_AFTER_MS = 2500;
const START_DELAY_MS = 1200;

let status = "checking"; // checking | waking | online | offline
let started = false;
const listeners = new Set();

function setStatus(next) {
  if (status === next) return;
  status = next;
  listeners.forEach((listener) => listener());
}

export function warmApi() {
  if (started || typeof window === "undefined") return;
  started = true;
  const wakingTimer = setTimeout(() => { if (status === "checking") setStatus("waking"); }, WAKING_AFTER_MS);
  portfolioApi.health()
    .then(() => setStatus("online"))
    .catch(() => setStatus("offline"))
    .finally(() => clearTimeout(wakingTimer));
}

const subscribe = (listener) => { listeners.add(listener); return () => listeners.delete(listener); };
const getSnapshot = () => status;

export const API_STATUS_LABELS = {
  checking: "Connecting…",
  waking: "Waking up…",
  online: "Online",
  offline: "Offline · links still work",
};

export default function useApiStatus({ warm = true } = {}) {
  useEffect(() => {
    if (!warm) return undefined;
    // Wait until the page has painted so the probe never competes with first load.
    const timer = setTimeout(warmApi, START_DELAY_MS);
    return () => clearTimeout(timer);
  }, [warm]);
  return useSyncExternalStore(subscribe, getSnapshot, () => "checking");
}
