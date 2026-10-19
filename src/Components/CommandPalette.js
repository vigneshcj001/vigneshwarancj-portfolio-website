import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Search, X } from "lucide-react";
import { projects } from "../data/projects";
import { publications } from "../data/publications";
import { roles } from "../data/experience";
import { caseStudies } from "../data/showcase";

const pages = [
  ["Home", "/"], ["Projects", "/projects"], ["Experience", "/experience"],
  ["Publications", "/publications"], ["Skills", "/skills"], ["Writing", "/writing"],
  ["Résumé", "/resume"], ["Contact", "/contact"],
  ["AI assistant architecture and request flow", "/assistant-architecture"],
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const entries = useMemo(() => [
    ...pages.map(([title, to]) => ({ title, subtitle: "Page", to })),
    ...Object.entries(caseStudies).map(([slug, study]) => ({ title: study.title, subtitle: "Case study", to: `/projects/${slug}` })),
    ...projects.map((project) => ({ title: project.title, subtitle: `${project.category} · ${project.tags.join(" · ")}`, to: `/projects?q=${encodeURIComponent(project.title)}` })),
    ...publications.map((publication) => ({ title: publication.title, subtitle: `${publication.type} · ${publication.year}`, to: "/publications" })),
    ...roles.map((role) => ({ title: `${role.title} · ${role.company}`, subtitle: role.period, to: "/experience" })),
    ...[...new Set(projects.flatMap((project) => project.tags))].map((skill) => ({ title: skill, subtitle: "Technology", to: `/projects?q=${encodeURIComponent(skill)}` })),
  ], []);

  const matches = entries.filter((entry) => `${entry.title} ${entry.subtitle}`.toLowerCase().includes(query.toLowerCase())).slice(0, 12);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen((value) => !value); }
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 0); else setQuery(""); }, [open]);

  const select = (to) => { navigate(to); setOpen(false); };
  if (!open) return <button className="command-trigger" onClick={() => setOpen(true)} aria-label="Search portfolio"><Search size={16} /><span>Search</span><kbd>Ctrl K</kbd></button>;
  return (
    <div className="command-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="command-dialog" role="dialog" aria-modal="true" aria-label="Search portfolio">
        <div className="command-input"><Search size={18} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, skills, publications…" aria-label="Search" /><button onClick={() => setOpen(false)} aria-label="Close search"><X size={18} /></button></div>
        <div className="command-results" role="listbox">{matches.length ? matches.map((entry, index) => <button key={`${entry.to}-${entry.title}-${index}`} onClick={() => select(entry.to)} role="option"><strong>{entry.title}</strong><span>{entry.subtitle}</span></button>) : <p>No matching work found.</p>}</div>
      </section>
    </div>
  );
}
