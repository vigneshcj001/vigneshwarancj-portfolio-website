import { useEffect, useState } from "react";
import { GITHUB_LINK } from "../Utils/const";
import { portfolioApi } from "../services/portfolioApi";

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};
const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

export default function LiveProof() {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    const controller = new AbortController();
    portfolioApi.proof(controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch(() => { if (!controller.signal.aborted) setState({ status: "unavailable", data: null }); });
    return () => controller.abort();
  }, []);

  const { status, data } = state;
  const repos = data?.github?.slice(0, 3) || [];
  const summary = {
    loading: "Fetching current GitHub and PyPI activity…",
    ready: data && `GitHub and PyPI metadata, refreshed ${formatDate(data.cached_at)}.`,
    unavailable: "Live metadata is resting right now — browse the public repositories directly.",
  }[status];

  return (
    <section className="surface-card live-proof" aria-busy={status === "loading"}>
      <div>
        <p className="eyebrow">Live engineering proof</p>
        <h2>Public work and package activity</h2>
        <p>{summary}</p>
      </div>
      <div className="proof-grid">
        {status === "loading" && [0, 1, 2].map((index) => <span key={index} className="proof-skeleton" aria-hidden="true" />)}
        {repos.map((repo) => (
          <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer">
            <strong>{repo.name}</strong>
            <span>{plural(repo.stars, "star")} · updated {formatDate(repo.updated_at)}</span>
          </a>
        ))}
        {data?.pypi && (
          <a href={data.pypi.url || "https://pypi.org/project/glycanbench/"} target="_blank" rel="noreferrer">
            <strong>glycanbench {data.pypi.version}</strong>
            <span>Latest PyPI release</span>
          </a>
        )}
        {status !== "loading" && (
          <a href={GITHUB_LINK} target="_blank" rel="noreferrer" className="proof-profile-link">
            <strong>{status === "ready" ? "All public repositories" : "View public repositories"}</strong>
            <span>GitHub profile ↗</span>
          </a>
        )}
      </div>
    </section>
  );
}
