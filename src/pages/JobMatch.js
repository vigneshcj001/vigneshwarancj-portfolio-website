import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import useMeta from "../Hooks/useMeta";
import PageHeader from "../Components/ui/PageHeader";
import { portfolioApi } from "../services/portfolioApi";
import { trackConversion } from "../Utils/analytics";

const DRAFT_KEY = "job-match-draft";
const MIN_LENGTH = 80;
const MAX_LENGTH = 8000;
const SAMPLE = `AI Engineer (Full-Stack)

We're looking for an engineer to build LLM-powered product features end to end.

Responsibilities
- Design and ship Python (FastAPI) and Node.js/TypeScript services
- Build React front ends for AI workflows
- Integrate LLM APIs, agent workflows, and retrieval over company knowledge
- Own PostgreSQL and Redis data layers; deploy with Docker on AWS

Nice to have: Kafka, Terraform, Kubernetes, computer vision or OCR experience.`;

const STATUS_LABELS = { strong: "Strong evidence", partial: "Related evidence", gap: "Gap" };

function readDraft() {
  try { return sessionStorage.getItem(DRAFT_KEY) || ""; } catch { return ""; }
}

function writeDraft(value) {
  try { sessionStorage.setItem(DRAFT_KEY, value); } catch { /* storage is a convenience only */ }
}

function coverageBucket(coverage) {
  if (coverage == null) return "none";
  return coverage >= 0.75 ? "high" : coverage >= 0.5 ? "medium" : "low";
}

function CoverageMeter({ coverage }) {
  if (coverage == null) return null;
  const percent = Math.round(coverage * 100);
  return (
    <div className="match-coverage">
      <div className="match-coverage-head"><span>Technology coverage</span><strong>{percent}%</strong></div>
      <div className="match-coverage-track" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Technology coverage">
        <span style={{ width: `${percent}%` }} />
      </div>
      <p>Share of technologies named in the description that have documented evidence in this portfolio.</p>
    </div>
  );
}

export default function JobMatch() {
  useMeta("Job description match", "Paste a job description to see which requirements Vigneshwaran's documented work covers, with evidence links and honest gaps.");
  const [text, setText] = useState(readDraft);
  const [state, setState] = useState({ status: "idle", result: null, error: "" });
  const controllerRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => () => controllerRef.current?.abort(), []);
  useEffect(() => { writeDraft(text); }, [text]);

  const trimmed = text.trim();
  const tooShort = trimmed.length < MIN_LENGTH;
  const loading = state.status === "loading";

  const analyze = async (event) => {
    event.preventDefault();
    if (tooShort || loading) return;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ status: "loading", result: null, error: "" });
    try {
      const result = await portfolioApi.match(trimmed, controller.signal);
      setState({ status: "done", result, error: "" });
      // Only aggregate signals are recorded — never the job description itself.
      trackConversion("job_match_run", { coverage: coverageBucket(result.keywords?.coverage), engine: result.generated_by });
      setTimeout(() => resultRef.current?.focus(), 50);
    } catch (error) {
      if (controller.signal.aborted && error?.name === "AbortError") return;
      setState({ status: "error", result: null, error: error?.message || "The match service is unavailable right now." });
    }
  };

  const result = state.result;
  const keywords = result?.keywords;
  const contactDraft = keywords
    ? `Hi Vigneshwaran, I'm hiring for a role that needs ${keywords.matched.slice(0, 5).map((item) => item.term).join(", ") || "your skill set"}. `
      + "I'd like to talk about whether it's a fit."
    : "";

  return (
    <div className="min-h-screen px-4 pt-24 pb-20">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          badge="For recruiters"
          title="Job match"
          subtitle="Paste a job description. Each requirement is mapped to documented projects and roles, with links to the evidence and honest gaps."
        />

        <form className="match-form surface-card" onSubmit={analyze}>
          <div className="match-form-head">
            <label htmlFor="job-description">Job description</label>
            <button type="button" className="text-link" onClick={() => setText(SAMPLE)}>Use a sample</button>
          </div>
          <textarea
            id="job-description"
            value={text}
            onChange={(event) => setText(event.target.value.slice(0, MAX_LENGTH))}
            placeholder="Paste the full job description, including responsibilities and requirements…"
            rows={10}
            aria-describedby="job-description-help"
          />
          <div className="match-form-foot">
            <span id="job-description-help">
              {tooShort && trimmed.length > 0 ? `Add at least ${MIN_LENGTH - trimmed.length} more characters.` : `${trimmed.length.toLocaleString()} / ${MAX_LENGTH.toLocaleString()} characters · not stored on the server`}
            </span>
            <div>
              {text && <button type="button" className="secondary-action" onClick={() => { setText(""); setState({ status: "idle", result: null, error: "" }); }}>Clear</button>}
              <button type="submit" className="primary-action" disabled={tooShort || loading}>{loading ? "Analyzing…" : "Analyze fit"}</button>
            </div>
          </div>
          {loading && <p className="match-loading" role="status">Reading the description and matching it against projects, roles, and publications. A sleeping server can take up to half a minute to wake.</p>}
          {state.status === "error" && <p className="api-playground-error" role="alert">{state.error}</p>}
        </form>

        {result && (
          <section className="match-results" ref={resultRef} tabIndex={-1} aria-label="Match results">
            <div className="match-overview">
              <div>
                <p className="eyebrow">Assessment</p>
                <h2>{result.summary || "Keyword evidence"}</h2>
                {result.generated_by === "keywords" && (
                  <p className="match-note">The AI assessment is unavailable right now, so this shows the keyword evidence only.</p>
                )}
              </div>
              <CoverageMeter coverage={keywords?.coverage} />
            </div>

            {result.requirements.length > 0 && (
              <div className="match-section">
                <h3>Requirements</h3>
                <ul className="match-requirements">
                  {result.requirements.map((item, index) => (
                    <li key={`${item.requirement}-${index}`} data-status={item.status}>
                      <span className="match-badge">{STATUS_LABELS[item.status]}</span>
                      <div><strong>{item.requirement}</strong><p>{item.evidence}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="match-columns">
              <div className="match-section">
                <h3>Documented technologies <span>{keywords.matched.length}</span></h3>
                {keywords.matched.length ? (
                  <ul className="match-evidence">
                    {keywords.matched.map((item) => (
                      <li key={item.term}>
                        <strong>{item.term}</strong>
                        <span>{item.evidence.map((evidence, index) => (
                          <Link key={`${evidence.title}-${index}`} to={evidence.url}>{evidence.title}</Link>
                        ))}</span>
                      </li>
                    ))}
                  </ul>
                ) : <p className="match-empty">No listed technologies matched. The requirement assessment above may still find related work.</p>}
              </div>
              <div className="match-section">
                <h3>Not in the portfolio <span>{keywords.missing.length}</span></h3>
                {keywords.missing.length ? (
                  <>
                    <ul className="match-gaps">{keywords.missing.map((term) => <li key={term}>{term}</li>)}</ul>
                    <p className="match-empty">No documented project or role uses these yet. Worth asking about in an interview.</p>
                  </>
                ) : <p className="match-empty">Every technology the description names has documented evidence.</p>}
              </div>
            </div>

            {result.sources?.length > 0 && (
              <div className="match-section">
                <h3>Sources read</h3>
                <div className="match-sources">{result.sources.map((source) => <Link key={source.path} to={source.url}>{source.title}</Link>)}</div>
              </div>
            )}

            <div className="match-cta">
              <p>Generated from committed portfolio content; it does not replace a conversation.</p>
              <Link className="primary-action" to={`/contact?message=${encodeURIComponent(contactDraft)}`}>Discuss this role ↗</Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
