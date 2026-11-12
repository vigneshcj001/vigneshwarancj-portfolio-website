import { useState } from "react";

const STAGE_LABELS = {
  visits: "Page views",
  case_studies: "Case study views",
  resume: "Résumé views & downloads",
  job_match: "Job match runs",
  contact: "Contact sent",
};

function percent(value, base) {
  return base ? `${Math.round((value / base) * 1000) / 10}%` : "–";
}

export default function AdminFunnel({ request }) {
  const [days, setDays] = useState(30);
  const [state, setState] = useState({ status: "idle", data: null, error: "" });

  const load = async () => {
    setState({ status: "loading", data: null, error: "" });
    try {
      setState({ status: "ready", data: await request(`/api/admin/funnel?days=${days}`), error: "" });
    } catch (error) {
      setState({ status: "error", data: null, error: error.message });
    }
  };

  const data = state.data;
  const top = data ? Math.max(1, ...data.stages.map((stage) => data.totals[stage])) : 1;
  const visits = data?.totals.visits || 0;

  return (
    <section className="admin-funnel" aria-labelledby="admin-funnel-title">
      <div className="admin-funnel-head">
        <h2 id="admin-funnel-title">Conversion funnel</h2>
        <label>
          Range{" "}
          <select value={days} onChange={(event) => setDays(Number(event.target.value))}>
            {[7, 30, 90, 365].map((value) => <option key={value} value={value}>Last {value} days</option>)}
          </select>
        </label>
        <button type="button" className="secondary-action" onClick={load} disabled={state.status === "loading"}>
          {state.status === "loading" ? "Loading…" : "Load funnel"}
        </button>
      </div>
      {state.status === "error" && <p className="admin-status" role="alert">{state.error}</p>}
      {data && (
        <>
          <ol className="funnel-bars" aria-label={`Funnel totals, last ${data.days} days`}>
            {data.stages.map((stage) => {
              const value = data.totals[stage];
              return (
                <li key={stage} title={`${STAGE_LABELS[stage]}: ${value.toLocaleString()} (${percent(value, visits)} of page views)`}>
                  <span className="funnel-label">{STAGE_LABELS[stage]}</span>
                  <span className="funnel-track"><span style={{ width: `${Math.max(value ? 1.5 : 0, (value / top) * 100)}%` }} /></span>
                  <span className="funnel-value">{value.toLocaleString()}{stage !== "visits" && <small> · {percent(value, visits)}</small>}</span>
                </li>
              );
            })}
          </ol>
          <p className="funnel-note">Percentages are relative to page views. Events are counted, not unique visitors; no personal data is stored.</p>
          {data.top_case_studies.length > 0 && (
            <table className="admin-table">
              <caption>Most viewed case studies</caption>
              <thead><tr><th>Project</th><th>Views</th></tr></thead>
              <tbody>{data.top_case_studies.map((row) => <tr key={row.project}><td>{row.project}</td><td>{row.count}</td></tr>)}</tbody>
            </table>
          )}
          {data.daily.length > 0 && (
            <details className="funnel-daily">
              <summary>Daily breakdown (table)</summary>
              <table className="admin-table">
                <thead><tr><th>Day</th>{data.stages.map((stage) => <th key={stage}>{STAGE_LABELS[stage]}</th>)}</tr></thead>
                <tbody>{[...data.daily].reverse().map((row) => (
                  <tr key={row.day}><td>{row.day}</td>{data.stages.map((stage) => <td key={stage}>{row[stage]}</td>)}</tr>
                ))}</tbody>
              </table>
            </details>
          )}
        </>
      )}
    </section>
  );
}
