import { useCallback, useEffect, useState } from "react";
import useMeta from "../Hooks/useMeta";
import PageHeader from "../Components/ui/PageHeader";
import { portfolioApi } from "../services/portfolioApi";

const REFRESH_MS = 60000;

function formatUptime(seconds) {
  if (seconds == null) return "—";
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return days ? `${days}d ${hours}h` : hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

const LABELS = {
  ok: ["operational", "Operational"],
  degraded: ["degraded", "Degraded: optional storage unavailable"],
  down: ["down", "Unreachable"],
  checking: ["checking", "Checking…"],
};

export default function Status() {
  useMeta("Status", "Live status of the portfolio API, AI assistant, and storage.");
  const [state, setState] = useState({ status: "checking", health: null, latency: null, checkedAt: null, error: "" });

  const check = useCallback(async () => {
    const started = performance.now();
    try {
      const health = await portfolioApi.health();
      setState({ status: health.status === "ok" ? "ok" : "degraded", health, latency: Math.round(performance.now() - started), checkedAt: new Date(), error: "" });
    } catch (error) {
      setState({ status: "down", health: null, latency: null, checkedAt: new Date(), error: error?.message || "No response" });
    }
  }, []);

  useEffect(() => {
    check();
    const timer = setInterval(check, REFRESH_MS);
    return () => clearInterval(timer);
  }, [check]);

  const [tone, label] = LABELS[state.status];
  const health = state.health;
  const rows = [
    ["Portfolio website", "operational", "Served by Vercel"],
    ["Portfolio API", state.status === "checking" ? "checking" : state.status === "down" ? "down" : "operational", state.latency != null ? `${state.latency} ms round trip` : state.error || "—"],
    ["AI assistant", !health ? (state.status === "checking" ? "checking" : "down") : "operational", health ? `Router: ${health.assistant?.router === "laya" ? "Laya" : "local rules"} · Generator: Groq` : "Needs the API"],
    ["Database", !health ? "checking" : health.database === "connected" ? "operational" : health.database === "not_configured" ? "optional" : "degraded", health ? health.database.replace("_", " ") : "—"],
  ];

  return (
    <div className="min-h-screen px-4 pt-24 pb-20">
      <div className="max-w-3xl mx-auto">
        <PageHeader badge="Live" title="Status" subtitle="Whether the portfolio's API, AI assistant, and storage are up right now. The free-tier API sleeps when idle and takes up to ~30 seconds to wake." />
        <div className="status-banner" data-tone={tone} role="status">
          <span aria-hidden="true" />
          <strong>{label}</strong>
          <button type="button" className="text-link" onClick={check}>Check again</button>
        </div>
        <ul className="status-list">
          {rows.map(([name, rowTone, detail]) => (
            <li key={name} data-tone={rowTone}>
              <span className="status-dot" aria-hidden="true" />
              <div><strong>{name}</strong><p>{detail}</p></div>
              <em>{rowTone === "optional" ? "Not configured" : rowTone[0].toUpperCase() + rowTone.slice(1)}</em>
            </li>
          ))}
        </ul>
        <dl className="status-facts">
          <div><dt>API version</dt><dd>{health?.version || "—"}</dd></div>
          <div><dt>Uptime since last restart</dt><dd>{formatUptime(health?.uptime_seconds)}</dd></div>
          <div><dt>Last checked</dt><dd>{state.checkedAt ? state.checkedAt.toLocaleTimeString() : "—"}</dd></div>
        </dl>
        <p className="status-note">Checks run from your browser every minute while this page is open. History is not stored.</p>
      </div>
    </div>
  );
}
