import { useState } from "react";
import useMeta from "../Hooks/useMeta";
import { portfolioApi } from "../services/portfolioApi";

export default function Admin() {
  useMeta("Portfolio Admin", "Protected portfolio content and analytics console.");
  const [key, setKey] = useState(() => sessionStorage.getItem("portfolio-admin-key") || "");
  const [content, setContent] = useState("");
  const [note, setNote] = useState("Portfolio content update");
  const [analytics, setAnalytics] = useState([]);
  const [status, setStatus] = useState("");

  const request = (path, options = {}) => portfolioApi.admin(path, key, options);
  const unlock = async () => { try { const data = await request("/api/admin/content"); sessionStorage.setItem("portfolio-admin-key", key); setContent(JSON.stringify(data, null, 2)); setStatus("Editor unlocked."); } catch (error) { setStatus(error.message); } };
  const save = async () => { try { const parsed = JSON.parse(content); const result = await request("/api/admin/content", { method: "PUT", body: JSON.stringify({ content: parsed, note }) }); setStatus(`Saved revision ${result.revision_id}.`); } catch (error) { setStatus(error.message); } };
  const loadAnalytics = async () => { try { const data = await request("/api/admin/analytics"); setAnalytics(data.events); setStatus("Analytics loaded."); } catch (error) { setStatus(error.message); } };
  const checkLinks = async () => { try { setStatus("Checking links…"); const data = await request("/api/admin/check-links", { method: "POST" }); setStatus(`${data.checked} links checked; ${data.failed.length} failed.`); } catch (error) { setStatus(error.message); } };

  return <main className="admin-page portfolio-section">
    <p className="eyebrow">Protected workspace</p><h1>Portfolio admin</h1><p>Admin key stays in this browser tab. Content revisions require configured PostgreSQL storage.</p>
    <div className="admin-auth"><label htmlFor="admin-key">Admin API key</label><input id="admin-key" type="password" value={key} onChange={event => setKey(event.target.value)} autoComplete="off" /><button className="primary-action" onClick={unlock}>Unlock</button></div>
    {status && <p role="status" className="admin-status">{status}</p>}
    {content && <><div className="admin-toolbar"><input aria-label="Revision note" value={note} onChange={event => setNote(event.target.value)} /><button className="primary-action" onClick={save}>Save revision</button><button className="secondary-action" onClick={loadAnalytics}>Load analytics</button><button className="secondary-action" onClick={checkLinks}>Check links</button></div><textarea className="admin-editor" aria-label="Portfolio JSON content" value={content} onChange={event => setContent(event.target.value)} spellCheck="false" /></>}
    {analytics.length > 0 && <table className="admin-table"><thead><tr><th>Event</th><th>Count</th><th>Last seen</th></tr></thead><tbody>{analytics.map(item => <tr key={item.name}><td>{item.name}</td><td>{item.count}</td><td>{new Date(item.last_seen).toLocaleString()}</td></tr>)}</tbody></table>}
  </main>;
}
