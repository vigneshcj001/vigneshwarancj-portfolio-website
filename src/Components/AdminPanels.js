import { useState } from "react";

function useLoader(request) {
  const [state, setState] = useState({ status: "idle", data: null, error: "" });
  const load = async (path, options) => {
    setState((current) => ({ ...current, status: "loading", error: "" }));
    try {
      const data = await request(path, options);
      setState({ status: "ready", data, error: "" });
      return data;
    } catch (error) {
      setState({ status: "error", data: null, error: error.message });
      return null;
    }
  };
  return [state, load, setState];
}

function Panel({ title, action, children }) {
  return (
    <section className="admin-panel">
      <div className="admin-funnel-head"><h2>{title}</h2>{action}</div>
      {children}
    </section>
  );
}

export function MetricsPanel({ request }) {
  const [state, load] = useLoader(request);
  const data = state.data;
  return (
    <Panel title="AI metrics" action={<button type="button" className="secondary-action" onClick={() => load("/api/admin/metrics")}>{state.status === "loading" ? "Loading…" : "Load metrics"}</button>}>
      {state.error && <p className="admin-status" role="alert">{state.error}</p>}
      {data && (
        <>
          <dl className="admin-metric-grid">
            <div><dt>Answers generated</dt><dd>{data.counters["assistant.answered"] || 0}</dd></div>
            <div><dt>Cache hit rate</dt><dd>{data.rates.cache_hit_rate == null ? "—" : `${Math.round(data.rates.cache_hit_rate * 100)}%`}</dd></div>
            <div><dt>Refusal rate</dt><dd>{`${Math.round((data.rates.refusal_rate || 0) * 100)}%`}</dd></div>
            <div><dt>Output guard removals</dt><dd>{data.counters.guard_removed || 0}</dd></div>
            <div><dt>Timeouts / errors</dt><dd>{(data.counters["assistant.timeout"] || 0)} / {(data.counters["assistant.error"] || 0)}</dd></div>
            <div><dt>Est. tokens in / out</dt><dd>{(data.estimated_tokens["assistant.input"] || 0).toLocaleString()} / {(data.estimated_tokens["assistant.output"] || 0).toLocaleString()}</dd></div>
          </dl>
          {Object.keys(data.latency_ms).length > 0 && (
            <table className="admin-table">
              <caption>Latency (ms)</caption>
              <thead><tr><th>Step</th><th>Count</th><th>p50</th><th>p95</th><th>Max</th></tr></thead>
              <tbody>{Object.entries(data.latency_ms).map(([name, row]) => <tr key={name}><td>{name}</td><td>{row.count}</td><td>{row.p50}</td><td>{row.p95}</td><td>{row.max}</td></tr>)}</tbody>
            </table>
          )}
          <p className="funnel-note">Since {new Date(data.since).toLocaleString()}. {data.notes}</p>
        </>
      )}
    </Panel>
  );
}

export function TestimonialsPanel({ request }) {
  const [filter, setFilter] = useState("pending");
  const [state, load, setState] = useLoader(request);
  const refresh = (status = filter) => load(`/api/admin/testimonials?status=${status}`);
  const review = async (id, status) => {
    try {
      await request(`/api/admin/testimonials/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
      setState((current) => ({ ...current, data: { testimonials: current.data.testimonials.filter((item) => item.id !== id) } }));
    } catch (error) {
      setState((current) => ({ ...current, error: error.message }));
    }
  };
  return (
    <Panel title="Testimonials" action={<>
      <select value={filter} onChange={(event) => { setFilter(event.target.value); refresh(event.target.value); }} aria-label="Testimonial status">
        <option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
      </select>
      <button type="button" className="secondary-action" onClick={() => refresh()}>{state.status === "loading" ? "Loading…" : "Load"}</button>
    </>}>
      {state.error && <p className="admin-status" role="alert">{state.error}</p>}
      {state.data && !state.data.testimonials.length && <p className="funnel-note">No {filter} testimonials.</p>}
      <ul className="admin-testimonials">
        {state.data?.testimonials.map((item) => (
          <li key={item.id}>
            <blockquote>“{item.quote}”</blockquote>
            <p><strong>{item.name}</strong> · {item.role} · {item.relationship}</p>
            <div>
              {item.status !== "approved" && <button type="button" className="primary-action" onClick={() => review(item.id, "approved")}>Approve</button>}
              {item.status !== "rejected" && <button type="button" className="secondary-action" onClick={() => review(item.id, "rejected")}>Reject</button>}
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function NewsletterPanel({ request }) {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [state, load] = useLoader(request);
  const send = (dryRun) => {
    if (!dryRun && !window.confirm(`Send "${subject}" to every subscriber? This cannot be undone.`)) return;
    load("/api/admin/newsletter/send", { method: "POST", body: JSON.stringify({ subject, text, dry_run: dryRun }) });
  };
  const data = state.data;
  const ready = subject.trim().length >= 3 && text.trim().length >= 20;
  return (
    <Panel title="Newsletter">
      <div className="admin-newsletter">
        <input aria-label="Newsletter subject" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Subject" maxLength={150} />
        <textarea aria-label="Newsletter text" value={text} onChange={(event) => setText(event.target.value)} rows={6} placeholder="Plain text. Blank lines separate paragraphs. An unsubscribe link is added automatically." />
        <div>
          <button type="button" className="secondary-action" disabled={!ready} onClick={() => send(true)}>Check recipients</button>
          <button type="button" className="primary-action" disabled={!ready || data?.missing_settings?.length > 0} onClick={() => send(false)}>Send to subscribers</button>
        </div>
      </div>
      {state.error && <p className="admin-status" role="alert">{state.error}</p>}
      {data?.dry_run && <p className="admin-status" role="status">{data.recipients} subscriber(s).{data.missing_settings.length ? ` Sending is disabled until these are set on the server: ${data.missing_settings.join(", ")}.` : " Ready to send."}</p>}
      {data && !data.dry_run && <p className="admin-status" role="status">Sent {data.sent} of {data.attempted}{data.failed ? `; ${data.failed} failed` : ""}.</p>}
    </Panel>
  );
}

export function ClientErrorsPanel({ request }) {
  const [state, load] = useLoader(request);
  return (
    <Panel title="Client errors" action={<button type="button" className="secondary-action" onClick={() => load("/api/admin/client-errors")}>{state.status === "loading" ? "Loading…" : "Load errors"}</button>}>
      {state.error && <p className="admin-status" role="alert">{state.error}</p>}
      {state.data && !state.data.errors.length && <p className="funnel-note">No browser errors reported in the last 30 days.</p>}
      {state.data?.errors.length > 0 && (
        <table className="admin-table">
          <thead><tr><th>When</th><th>Page</th><th>Kind</th><th>Message</th><th>Source</th></tr></thead>
          <tbody>{state.data.errors.map((item, index) => (
            <tr key={index}><td>{new Date(item.created_at).toLocaleString()}</td><td>{item.path}</td><td>{item.kind}</td><td>{item.message}</td><td>{item.source ? `${item.source.split("/").pop()}:${item.line}` : "—"}</td></tr>
          ))}</tbody>
        </table>
      )}
    </Panel>
  );
}
