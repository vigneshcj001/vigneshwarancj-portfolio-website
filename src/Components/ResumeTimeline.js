import { useMemo, useState } from "react";
import portfolioData from "../data/portfolio.generated.js";

const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

// "Dec 2025 – Present" → sortable month index of the start date.
function startIndex(period = "") {
  const match = period.match(/([A-Za-z]{3})[a-z]*\s+(\d{4})/);
  return match ? Number(match[2]) * 12 + (MONTHS[match[1].toLowerCase()] ?? 0) : 0;
}

function buildEntries() {
  const work = portfolioData.work_experience.map((role, index) => {
    const tech = [...new Set((role.projects || []).flatMap((project) => project.tech || []))];
    return {
      id: `work-${index}`,
      kind: "Work",
      title: role.role,
      org: role.company,
      period: role.period,
      start: startIndex(role.period),
      summary: role.overview,
      tech,
      highlights: (role.projects || []).slice(0, 4).map((project) => project.name),
    };
  });
  const education = portfolioData.education.map((item, index) => ({
    id: `edu-${index}`,
    kind: "Education",
    title: item.degree,
    org: item.institution,
    period: item.period,
    start: startIndex(item.period),
    summary: item.focus ? `Focus: ${item.focus}.` : "",
    tech: [],
    highlights: [],
  }));
  return [...work, ...education].sort((a, b) => a.start - b.start);
}

export default function ResumeTimeline() {
  const entries = useMemo(buildEntries, []);
  const current = [...entries].reverse().find((entry) => entry.kind === "Work") || entries[entries.length - 1];
  const [selectedId, setSelectedId] = useState(current?.id);
  const selected = entries.find((entry) => entry.id === selectedId) || current;

  // Every technology used across roles, most-used first, so the highlight shows
  // how each role adds to the overall toolkit.
  const allTech = useMemo(() => {
    const counts = new Map();
    entries.forEach((entry) => entry.tech.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([tag]) => tag);
  }, [entries]);

  if (!selected) return null;
  const activeTech = new Set(selected.tech);

  return (
    <section className="resume-timeline no-print" aria-labelledby="resume-timeline-title">
      <div className="resume-timeline-head">
        <p className="eyebrow">Career at a glance</p>
        <h2 id="resume-timeline-title">Select a role to see the stack it used</h2>
      </div>
      <ol className="resume-timeline-track">
        {entries.map((entry) => (
          <li key={entry.id} data-kind={entry.kind}>
            <button type="button" aria-pressed={entry.id === selected.id} onClick={() => setSelectedId(entry.id)}>
              <span>{entry.period}</span>
              <strong>{entry.title}</strong>
              <em>{entry.org}</em>
            </button>
          </li>
        ))}
      </ol>
      <div className="resume-timeline-detail" aria-live="polite">
        <div>
          <p className="resume-timeline-kind">{selected.kind} · {selected.period}</p>
          <h3>{selected.title} <span>— {selected.org}</span></h3>
          {selected.summary && <p>{selected.summary}</p>}
          {selected.highlights.length > 0 && <p className="resume-timeline-built"><strong>Built:</strong> {selected.highlights.join(" · ")}</p>}
        </div>
        {allTech.length > 0 && (
          <div>
            <p className="resume-timeline-kind">{activeTech.size ? `${activeTech.size} technologies in this role` : "Technology across roles"}</p>
            <ul className="resume-timeline-tech" aria-label="Technologies across roles; those used in the selected role are highlighted">
              {allTech.map((tag) => <li key={tag} data-active={activeTech.has(tag) || undefined}>{tag}</li>)}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
