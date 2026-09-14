import { Link, useParams } from "react-router";
import { caseStudies, projectMedia } from "../data/showcase";
import { projects } from "../data/projects";
import ProjectPreview from "../Components/ProjectPreview";
import useMeta from "../Hooks/useMeta";
import { trackConversion } from "../Utils/analytics";
export default function CaseStudy() {
  const { slug } = useParams();
  const study = caseStudies[slug];
  useMeta(study ? `${study.title} — Case study` : "Project not found", study?.summary);
  if (!study) return <section className="portfolio-section"><h1>Project not found</h1><Link to="/projects">Browse projects</Link></section>;
  const project = projects[study.index];
  const media = projectMedia[slug];
  return <article className="portfolio-section case-study">
    <Link className="text-link" to="/projects">← All projects</Link>
    <p className="eyebrow mt-8">{study.label} / Case study</p><h1>{study.title}</h1><p className="lead">{study.summary}</p>
    <div className="action-row">{media?.liveAvailable !== false && <a className="primary-action" href={project.link} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("project_demo_click", { project: slug })}>Open live project ↗</a>}<a className="secondary-action" href={project.github} target="_blank" rel="noopener noreferrer">Source code ↗</a></div>
    {media?.liveAvailable === false && <p className="mb-6 text-sm">Live preview is currently unavailable. Explore the workflow and source code below.</p>}
    <ProjectPreview study={study} />
    {media?.poster && <img className="rounded-2xl my-8" src={media.poster} alt={`${study.title} application screenshot`} loading="lazy" />}
    {media?.video && <section><h2>Product walkthrough</h2><video className="w-full rounded-2xl" controls preload="none" poster={media.poster}><source src={media.video} type="video/mp4" />{media.captions && <track kind="captions" src={media.captions} srcLang="en" label="English" default />}</video>{media.transcript && <p>{media.transcript}</p>}</section>}
    <div className="editorial-grid"><section><h2>The problem</h2><p>{study.problem}</p></section><section><h2>My contribution</h2><p>{study.role}</p></section></div>
    <section><h2>Architecture at a glance</h2><p>A high-level map of the technologies used.</p><ol className="architecture-list">{study.architecture.map(item => <li key={item}>{item}</li>)}</ol></section>
    <section><h2>Design decisions</h2><ul className="space-y-4 list-disc pl-5">{study.decisions.map(item => <li key={item}>{item}</li>)}</ul></section>
    <section className="surface-card"><p className="eyebrow">Delivered</p><h2>{study.result}</h2><p>{study.caveat}</p></section>
    <div className="flex flex-wrap gap-2 my-8">{project.tags.map(tag => <Link className="skill-pill" key={tag} to={`/projects?q=${encodeURIComponent(tag)}`}>{tag}</Link>)}</div>
    <Link className="text-link" to="/contact">Discuss a related project →</Link>
  </article>;
}
