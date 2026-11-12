import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { HiSparkles } from "react-icons/hi2";
import { caseStudies, projectMedia } from "../data/showcase";
import { projects } from "../data/projects";
import ProjectPreview from "../Components/ProjectPreview";
import useMeta from "../Hooks/useMeta";
import { recordEvent, trackConversion } from "../Utils/analytics";
import { SiPypi } from "react-icons/si";
import ArchitectureDiagram from "../Components/ArchitectureDiagram";
import PocketPetDemo from "../Components/PocketPetDemo";
import ApiPlayground from "../Components/ApiPlayground";

const PROJECT_QUESTIONS = [
  "What was the hardest engineering decision in {title}, and why?",
  "Walk me through how {title} works end to end.",
  "What exactly did Vigneshwaran build in {title}?",
];

function askAssistant(question, autoSubmit) {
  window.dispatchEvent(new CustomEvent("portfolio-assistant:open", { detail: { question, autoSubmit } }));
}

function AskAboutProject({ title, slug }) {
  const questions = PROJECT_QUESTIONS.map((template) => template.replace("{title}", title));
  return (
    <aside className="ask-project" aria-label={`Ask the AI about ${title}`}>
      <div>
        <p className="eyebrow"><HiSparkles aria-hidden="true" /> Ask about this project</p>
        <p>The portfolio assistant answers from documented facts about {title} and cites its sources.</p>
      </div>
      <div className="ask-project-questions">
        {questions.map((question) => (
          <button key={question} type="button" onClick={() => { trackConversion("assistant_project_question", { project: slug }); askAssistant(question, true); }}>{question}</button>
        ))}
        <button type="button" className="ask-project-own" onClick={() => askAssistant(`About ${title}: `, false)}>Ask your own question →</button>
      </div>
    </aside>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const study = caseStudies[slug];
  useMeta(study ? `${study.title} — Case study` : "Project not found", study?.summary);
  useEffect(() => { if (study) recordEvent("case_study_view", { project: slug }); }, [slug, study]);
  if (!study) return <section className="portfolio-section"><h1>Project not found</h1><Link to="/projects">Browse projects</Link></section>;
  const project = projects[study.index];
  const media = projectMedia[slug];
  return <article id={`case-study-${slug}`} className="portfolio-section case-study" data-walkthrough-step="0">
    <Link className="text-link" to="/projects">← All projects</Link>
    <p className="eyebrow mt-8">{study.label} / Case study</p><h1>{study.title}</h1><p className="lead">{study.summary}</p>
    <div className="action-row">{project.link && media?.liveAvailable !== false && <a className="primary-action" href={project.link} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("project_demo_click", { project: slug })}>Open live project ↗</a>}{project.github && <a className="secondary-action" href={project.github} target="_blank" rel="noopener noreferrer">{project.githubWebsite ? "Application source" : "Source code"} ↗</a>}{project.githubWebsite && <a className="secondary-action" href={project.githubWebsite} target="_blank" rel="noopener noreferrer">Website source ↗</a>}{study.pypi && <a className="secondary-action" href={study.pypi} target="_blank" rel="noopener noreferrer"><SiPypi style={{display:"inline",verticalAlign:"middle",marginRight:"4px"}} />PyPI ↗</a>}{study.doi && <a className="secondary-action" href={study.doi} target="_blank" rel="noopener noreferrer">DOI ↗</a>}</div>
    {media?.liveAvailable === false && <p className="mb-6 text-sm">Live preview is currently unavailable. Explore the workflow and source code below.</p>}
    <ProjectPreview study={study} />
    {study.metrics && <dl className="evidence-grid">{study.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>}
    {slug === "pocketpet" && <PocketPetDemo />}
    {["aiora", "pocketpet", "glycanbench"].includes(slug) && <ApiPlayground slug={slug} />}
    {media?.poster && <img className="rounded-2xl my-8" src={media.poster} alt={`${study.title} application screenshot`} loading="lazy" />}
    {media?.video && <section><h2>Product walkthrough</h2><video className="w-full rounded-2xl" controls preload="none" poster={media.poster}><source src={media.video} type="video/mp4" />{media.captions && <track kind="captions" src={media.captions} srcLang="en" label="English" default />}</video>{media.transcript && <p>{media.transcript}</p>}</section>}
    <div className="editorial-grid" data-walkthrough-step="1"><section><h2>The problem</h2><p>{study.problem}</p></section><section><h2>My contribution</h2><p>{study.role}</p></section></div>
    <section data-walkthrough-step="2"><h2>Architecture at a glance</h2><p>High-level system map. Confidential infrastructure details omitted.</p><ArchitectureDiagram nodes={study.diagram} /><ol className="architecture-list">{study.architecture.map(item => <li key={item}>{item}</li>)}</ol></section>
    {study.install && <section className="surface-card"><p className="eyebrow">Install package</p><pre className="install-command"><code>{study.install}</code></pre></section>}
    {study.validation && <section><h2>Validation</h2><p>{study.validation}</p></section>}
    {study.limitations && <section><h2>Model limitations</h2><ul className="space-y-3 list-disc pl-5">{study.limitations.map(item => <li key={item}>{item}</li>)}</ul></section>}
    <section data-walkthrough-step="3"><h2>Design decisions</h2><ul className="space-y-4 list-disc pl-5">{study.decisions.map(item => <li key={item}>{item}</li>)}</ul></section>
    <section className="surface-card"><p className="eyebrow">Delivered</p><h2>{study.result}</h2><p>{study.caveat}</p></section>
    <AskAboutProject title={study.title} slug={slug} />
    <div className="flex flex-wrap gap-2 my-8">{project.tags.map(tag => <Link className="skill-pill" key={tag} to={`/projects?q=${encodeURIComponent(tag)}`}>{tag}</Link>)}</div>
    <Link className="text-link" to="/contact">Discuss a related project →</Link>
  </article>;
}
