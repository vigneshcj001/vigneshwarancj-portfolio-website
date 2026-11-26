import { useMemo, useState } from "react";
import { Link } from "react-router";
import portfolioData from "../data/portfolio.generated.js";
import { caseStudies } from "../data/showcase";
import { projects as presentationProjects } from "../data/projects";

const normalise = (value) => value.toLowerCase().replace(/\.js$/, "").replace(/\s+\d+(\.\d+)*$/, "").trim();

const CASE_BY_TITLE = Object.fromEntries(Object.entries(caseStudies).map(([slug, study]) => [presentationProjects[study.index]?.title, slug]));

// Every place a technology is documented: roles' deliverables, independent
// projects, and skill categories. Built once from the generated knowledge.
function buildIndex() {
  const index = new Map();
  const add = (tech, evidence) => {
    const key = normalise(tech);
    if (!key) return;
    const entry = index.get(key) || { label: tech.replace(/\s+\d+(\.\d+)*$/, ""), evidence: [] };
    if (!entry.evidence.some((item) => item.title === evidence.title)) entry.evidence.push(evidence);
    index.set(key, entry);
  };
  for (const role of portfolioData.work_experience) {
    for (const project of role.projects || []) {
      for (const tech of project.tech || []) add(tech, { kind: "Work", title: project.name, detail: `${role.role}, ${role.company}`, to: "/experience" });
    }
  }
  for (const [title, project] of Object.entries(portfolioData.projects)) {
    const slug = CASE_BY_TITLE[title] || Object.entries(CASE_BY_TITLE).find(([name]) => name && title.startsWith(name.split(":")[0]))?.[1];
    for (const tech of project.tech_stack || []) {
      add(tech, { kind: "Project", title, detail: project.subtitle || project.type || "", to: slug ? `/projects/${slug}` : `/projects?q=${encodeURIComponent(title.split(":")[0])}` });
    }
  }
  return [...index.values()].sort((a, b) => b.evidence.length - a.evidence.length || a.label.localeCompare(b.label));
}

export default function SkillProofMap() {
  const skills = useMemo(buildIndex, []);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(() => skills[0]?.label || "");
  const visible = skills.filter((skill) => !query || skill.label.toLowerCase().includes(query.toLowerCase())).slice(0, query ? 40 : 24);
  const active = skills.find((skill) => skill.label === selected);

  return (
    <section className="proof-map" aria-labelledby="proof-map-title">
      <div className="proof-map-head">
        <div>
          <p className="eyebrow">Skills proof map</p>
          <h2 id="proof-map-title">Where each skill is actually used</h2>
          <p>Pick a technology to see every role deliverable and project that documents it.</p>
        </div>
        <label className="proof-map-search">
          <span className="sr-only">Filter technologies</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter, e.g. Redis, PyTorch, React" />
        </label>
      </div>
      <div className="proof-map-chips" role="group" aria-label="Technologies">
        {visible.map((skill) => (
          <button
            key={skill.label}
            type="button"
            aria-pressed={skill.label === selected}
            aria-label={`${skill.label}, ${skill.evidence.length} ${skill.evidence.length === 1 ? "place" : "places"}`}
            onClick={() => setSelected(skill.label)}
          >
            {skill.label}<span aria-hidden="true">{skill.evidence.length}</span>
          </button>
        ))}
        {!visible.length && <p className="match-empty">No documented technology matches “{query}”.</p>}
      </div>
      {active && (
        <div className="proof-map-detail" aria-live="polite">
          <h3>{active.label} <span>{active.evidence.length} {active.evidence.length === 1 ? "place" : "places"}</span></h3>
          <ul>
            {active.evidence.map((item) => (
              <li key={`${item.kind}-${item.title}`}>
                <em data-kind={item.kind}>{item.kind}</em>
                <Link to={item.to}><strong>{item.title}</strong></Link>
                {item.detail && <span>{item.detail}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
