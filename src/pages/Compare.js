import { Link, useSearchParams } from "react-router";
import useMeta from "../Hooks/useMeta";
import PageHeader from "../Components/ui/PageHeader";
import { projects } from "../data/projects";
import { caseStudies } from "../data/showcase";

const slugOf = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
const ENTRIES = projects.map((project, index) => {
  const [caseSlug, study] = Object.entries(caseStudies).find(([, item]) => item.index === index) || [];
  return { key: caseSlug || slugOf(project.title), project, study, caseSlug };
});
const DEFAULTS = ["aiora", "pocketpet"];

function pick(key, fallback) {
  return ENTRIES.find((entry) => entry.key === key) || ENTRIES.find((entry) => entry.key === fallback) || ENTRIES[0];
}

function Row({ label, left, right }) {
  return (
    <tr>
      <th scope="row">{label}</th>
      <td>{left ?? <span className="compare-empty">Not documented</span>}</td>
      <td>{right ?? <span className="compare-empty">Not documented</span>}</td>
    </tr>
  );
}

function Stack({ tags, shared }) {
  return <ul className="compare-tags">{tags.map((tag) => <li key={tag} data-shared={shared.has(tag) || undefined}>{tag}</li>)}</ul>;
}

function Metrics({ study }) {
  if (!study?.metrics?.length) return null;
  return <ul className="compare-metrics">{study.metrics.map((metric) => <li key={metric.label}><strong>{metric.label}</strong> {metric.value}</li>)}</ul>;
}

function Links({ entry }) {
  const { project, caseSlug } = entry;
  return (
    <span className="compare-links">
      {caseSlug && <Link to={`/projects/${caseSlug}`}>Case study</Link>}
      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">Source ↗</a>}
      {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">Live ↗</a>}
    </span>
  );
}

export default function Compare() {
  useMeta("Compare projects", "Compare two of Vigneshwaran C. J.'s projects side by side: role, stack, architecture, and results.");
  const [params, setParams] = useSearchParams();
  const left = pick(params.get("a"), DEFAULTS[0]);
  const right = pick(params.get("b"), DEFAULTS[1]);
  const choose = (side, key) => {
    const next = new URLSearchParams(params);
    next.set(side, key);
    setParams(next, { replace: true });
  };
  const shared = new Set(left.project.tags.filter((tag) => right.project.tags.includes(tag)));
  const short = (text, length = 240) => (text && text.length > length ? `${text.slice(0, length).replace(/\s+\S*$/, "")}…` : text);

  return (
    <div className="min-h-screen px-4 pt-24 pb-20">
      <div className="max-w-6xl mx-auto">
        <PageHeader badge="Portfolio" title="Compare projects" subtitle="Pick two projects to see role, stack, architecture, and results side by side. Shared technologies are highlighted." />
        <div className="compare-pickers">
          {[["a", left, "First project"], ["b", right, "Second project"]].map(([side, entry, label]) => (
            <label key={side}>
              <span>{label}</span>
              <select value={entry.key} onChange={(event) => choose(side, event.target.value)}>
                {ENTRIES.map((item) => <option key={item.key} value={item.key}>{item.study?.title || item.project.title}</option>)}
              </select>
            </label>
          ))}
        </div>
        <p className="compare-scroll-hint" aria-hidden="true">Swipe sideways to see both projects →</p>
        <div className="compare-table-wrap" tabIndex={0} role="region" aria-label="Project comparison table (scrolls horizontally on small screens)">
          <table className="compare-table">
            <caption className="sr-only">Comparison of {left.project.title} and {right.project.title}</caption>
            <thead>
              <tr><th scope="col"><span className="sr-only">Attribute</span></th><th scope="col">{left.study?.title || left.project.title}</th><th scope="col">{right.study?.title || right.project.title}</th></tr>
            </thead>
            <tbody>
              <Row label="Type" left={left.project.category} right={right.project.category} />
              <Row label="When · status" left={`${left.project.date} · ${left.project.status}`} right={`${right.project.date} · ${right.project.status}`} />
              <Row label="Summary" left={left.study?.summary || short(left.project.description)} right={right.study?.summary || short(right.project.description)} />
              <Row label="My role" left={left.project.contribution} right={right.project.contribution} />
              <Row label="Problem" left={short(left.study?.problem)} right={short(right.study?.problem)} />
              <Row label="Architecture" left={left.study?.architecture?.slice(0, 4).join(" → ")} right={right.study?.architecture?.slice(0, 4).join(" → ")} />
              <Row label="Stack" left={<Stack tags={left.project.tags} shared={shared} />} right={<Stack tags={right.project.tags} shared={shared} />} />
              <Row label="Evidence" left={left.study?.metrics?.length ? <Metrics study={left.study} /> : null} right={right.study?.metrics?.length ? <Metrics study={right.study} /> : null} />
              <Row label="Result" left={short(left.study?.result)} right={short(right.study?.result)} />
              <Row label="Links" left={<Links entry={left} />} right={<Links entry={right} />} />
            </tbody>
          </table>
        </div>
        <p className="compare-foot">{shared.size ? `${shared.size} shared ${shared.size === 1 ? "technology" : "technologies"}: ${[...shared].join(", ")}.` : "These projects share no listed technologies."}</p>
      </div>
    </div>
  );
}
