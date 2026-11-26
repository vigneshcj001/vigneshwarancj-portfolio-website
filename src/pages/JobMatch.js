import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
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

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
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

function MatchResults({ result, actions = null, resultRef = null }) {
  const keywords = result.keywords || { matched: [], missing: [], coverage: null };
  const contactDraft = `Hi Vigneshwaran, I'm hiring for a role that needs ${keywords.matched.slice(0, 5).map((item) => item.term).join(", ") || "your skill set"}. I'd like to talk about whether it's a fit.`;
  return (
    <section className="match-results" ref={resultRef} tabIndex={-1} aria-label="Match results">
      <div className="match-overview">
        <div>
          <p className="eyebrow">{result.title ? `Assessment · ${result.title}` : "Assessment"}</p>
          <h2>{result.summary || "Keyword evidence"}</h2>
          {result.generated_by === "keywords" && (
            <p className="match-note">The AI assessment was unavailable, so this shows the keyword evidence only.</p>
          )}
        </div>
        <CoverageMeter coverage={keywords.coverage} />
      </div>

      {actions}

      {result.requirements?.length > 0 && (
        <div className="match-section">
          <h3>Requirements</h3>
          <ul className="match-requirements">
            {result.requirements.map((item, index) => (
              <li key={`${item.requirement}-${index}`} data-status={item.status}>
                <span className="match-badge">{STATUS_LABELS[item.status] || item.status}</span>
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
                  <span>{(item.evidence || []).map((evidence, index) => (
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
          <div className="match-sources">{result.sources.map((source) => <Link key={source.path || source.url} to={source.url}>{source.title}</Link>)}</div>
        </div>
      )}

      <div className="match-cta">
        <p>Generated from committed portfolio content; it does not replace a conversation.</p>
        <Link className="primary-action" to={`/contact?message=${encodeURIComponent(contactDraft)}`}>Discuss this role ↗</Link>
      </div>
    </section>
  );
}

function ResultActions({ jobDescription, result }) {
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState({ tone: "", text: "" });
  const [shareUrl, setShareUrl] = useState("");
  const [title, setTitle] = useState("");

  const download = async (format) => {
    setBusy(format);
    setMessage({ tone: "", text: "" });
    try {
      const { blob, filename } = await portfolioApi.tailoredResume(jobDescription, format);
      saveBlob(blob, filename);
      trackConversion("resume_download", { source: "match", version: "tailored", format });
      setMessage({ tone: "success", text: "Tailored résumé downloaded. Only skills with documented evidence are emphasised." });
    } catch (error) {
      setMessage({ tone: "error", text: error?.message || "The tailored résumé is unavailable right now." });
    } finally {
      setBusy("");
    }
  };

  const share = async () => {
    setBusy("share");
    setMessage({ tone: "", text: "" });
    try {
      const { id } = await portfolioApi.shareMatch(result, title.trim());
      const url = `${window.location.origin}/match/${id}`;
      setShareUrl(url);
      try { await navigator.clipboard.writeText(url); } catch { /* the link is shown below either way */ }
      trackConversion("job_match_shared", { engine: result.generated_by });
      setMessage({ tone: "success", text: "Share link created and copied. It expires in 30 days and does not include the job description." });
    } catch (error) {
      setMessage({ tone: "error", text: error?.status === 503 ? "Sharing needs the portfolio database, which is offline right now." : error?.message || "Could not create a share link." });
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="match-actions surface-card">
      <div>
        <p className="eyebrow">Take it further</p>
        <p>Download a résumé ordered for this role, or share this assessment with a hiring manager.</p>
      </div>
      <div className="match-actions-row">
        <button type="button" className="primary-action" onClick={() => download("pdf")} disabled={Boolean(busy)}>{busy === "pdf" ? "Preparing…" : "Tailored résumé (PDF)"}</button>
        <button type="button" className="secondary-action" onClick={() => download("docx")} disabled={Boolean(busy)}>{busy === "docx" ? "Preparing…" : "Tailored résumé (DOCX)"}</button>
      </div>
      <div className="match-actions-row">
        <label className="sr-only" htmlFor="share-title">Role name for the shared link (optional)</label>
        <input id="share-title" value={title} maxLength={120} onChange={(event) => setTitle(event.target.value)} placeholder="Role name (optional), e.g. AI Engineer at Acme" />
        <button type="button" className="secondary-action" onClick={share} disabled={Boolean(busy)}>{busy === "share" ? "Creating link…" : "Share this result"}</button>
      </div>
      {shareUrl && <p className="match-share-url"><a href={shareUrl}>{shareUrl}</a></p>}
      {message.text && <p className="match-actions-status" role="status" data-tone={message.tone}>{message.text}</p>}
    </div>
  );
}

function SharedMatch({ shareId }) {
  const [state, setState] = useState({ status: "loading", result: null, error: "" });
  useEffect(() => {
    const controller = new AbortController();
    portfolioApi.sharedMatch(shareId, controller.signal)
      .then((result) => setState({ status: "ready", result, error: "" }))
      .catch((error) => { if (!controller.signal.aborted) setState({ status: "error", result: null, error: error?.message || "This shared result could not be loaded." }); });
    return () => controller.abort();
  }, [shareId]);

  return (
    <div className="min-h-screen px-4 pt-24 pb-20">
      <div className="max-w-5xl mx-auto">
        <PageHeader badge="Shared job match" title="Job match" subtitle="A saved assessment of how Vigneshwaran's documented work fits a role." />
        {state.status === "loading" && <p className="match-loading" role="status">Loading the shared assessment…</p>}
        {state.status === "error" && <p className="api-playground-error" role="alert">{state.error}</p>}
        {state.result && <MatchResults result={state.result} />}
        <p className="match-shared-foot"><Link className="text-link" to="/match">Check another job description →</Link></p>
      </div>
    </div>
  );
}

export default function JobMatch() {
  const { shareId } = useParams();
  useMeta("Job description match", "Paste a job description to see which requirements Vigneshwaran's documented work covers, with evidence links and honest gaps.");
  const [text, setText] = useState(readDraft);
  const [state, setState] = useState({ status: "idle", result: null, error: "", analyzed: "" });
  const controllerRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => () => controllerRef.current?.abort(), []);
  useEffect(() => { writeDraft(text); }, [text]);

  if (shareId) return <SharedMatch shareId={shareId} />;

  const trimmed = text.trim();
  const tooShort = trimmed.length < MIN_LENGTH;
  const loading = state.status === "loading";

  const analyze = async (event) => {
    event.preventDefault();
    if (tooShort || loading) return;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ status: "loading", result: null, error: "", analyzed: "" });
    try {
      const result = await portfolioApi.match(trimmed, controller.signal);
      setState({ status: "done", result, error: "", analyzed: trimmed });
      // Only aggregate signals are recorded — never the job description itself.
      trackConversion("job_match_run", { coverage: coverageBucket(result.keywords?.coverage), engine: result.generated_by });
      setTimeout(() => resultRef.current?.focus(), 50);
    } catch (error) {
      if (controller.signal.aborted && error?.name === "AbortError") return;
      setState({ status: "error", result: null, error: error?.message || "The match service is unavailable right now.", analyzed: "" });
    }
  };

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
              {text && <button type="button" className="secondary-action" onClick={() => { setText(""); setState({ status: "idle", result: null, error: "", analyzed: "" }); }}>Clear</button>}
              <button type="submit" className="primary-action" disabled={tooShort || loading}>{loading ? "Analyzing…" : "Analyze fit"}</button>
            </div>
          </div>
          {loading && <p className="match-loading" role="status">Reading the description and matching it against projects, roles, and publications. A sleeping server can take up to half a minute to wake.</p>}
          {state.status === "error" && <p className="api-playground-error" role="alert">{state.error}</p>}
        </form>

        {state.result && (
          <MatchResults
            result={state.result}
            resultRef={resultRef}
            actions={<ResultActions jobDescription={state.analyzed} result={state.result} />}
          />
        )}
      </div>
    </div>
  );
}
