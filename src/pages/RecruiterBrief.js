import { Link, useSearchParams } from "react-router";
import useMeta from "../Hooks/useMeta";
import portfolioData from "../data/portfolio.generated.js";
import { caseStudies } from "../data/showcase";
import { BOOKING_URL } from "../Utils/const";

const FEATURED = ["aiora", "pocketpet", "glycanbench"];
const CORE_STACK = ["Python", "TypeScript", "FastAPI", "Node.js", "React", "PostgreSQL", "Redis", "LangGraph", "LangChain", "Docker", "PyTorch"];

const link = (url) => url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function RecruiterBrief() {
  useMeta("Recruiter brief", "One-page summary of Vigneshwaran C. J.: role fit, current work, top projects, and contact details.");
  const [params] = useSearchParams();
  const preparedFor = (params.get("for") || "").slice(0, 80);
  const { personal, work_experience: roles, education } = portfolioData;
  const current = roles[0];
  const degree = education[0];
  const highlights = (current.projects || []).slice(0, 3);

  return (
    <div className="brief-page">
      <div className="brief-toolbar no-print">
        <Link className="text-link" to="/">← Portfolio</Link>
        <div>
          <button type="button" className="secondary-action" onClick={() => navigator.clipboard?.writeText(window.location.href)}>Copy link</button>
          <button type="button" className="primary-action" onClick={() => window.print()}>Print or save as PDF</button>
        </div>
      </div>

      <article className="brief-sheet" aria-label="Recruiter brief">
        <header className="brief-header">
          <div>
            <h1>{personal.name}</h1>
            <p>AI Engineer · Full-Stack Developer · Coimbatore, India</p>
          </div>
          {preparedFor && <p className="brief-for">Prepared for {preparedFor}</p>}
        </header>

        <section className="brief-contact" aria-label="Contact">
          <a href={`mailto:${personal.email}`}>{personal.email}</a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">{link(personal.linkedin)}</a>
          <a href={personal.github} target="_blank" rel="noopener noreferrer">{link(personal.github)}</a>
          <a href={personal.portfolio} target="_blank" rel="noopener noreferrer">{link(personal.portfolio)}</a>
          {personal.open_to_opportunities && <span className="brief-open">Open to opportunities</span>}
        </section>

        <section>
          <h2>Fit at a glance</h2>
          <p>
            Builds production AI products end to end: grounded LLM assistants and agents, multi-tenant APIs,
            and the React interfaces on top, with published machine-learning research in computational biology.
          </p>
          <ul className="brief-stack">{CORE_STACK.map((tech) => <li key={tech}>{tech}</li>)}</ul>
        </section>

        <section>
          <h2>Now: {current.role}, {current.company}</h2>
          <p className="brief-meta">{current.period}</p>
          <ul>
            {highlights.map((project) => <li key={project.name}><strong>{project.name}.</strong> {project.description.split(/(?<=\.)\s/)[0]}</li>)}
          </ul>
        </section>

        <section>
          <h2>Top projects</h2>
          <ul className="brief-projects">
            {FEATURED.map((slug) => {
              const study = caseStudies[slug];
              const metric = study.metrics?.[0];
              return (
                <li key={slug}>
                  <strong>{study.title}</strong> <span>{study.label}</span>
                  <p>{study.summary}</p>
                  {metric && <p className="brief-meta">{metric.label} {metric.value}</p>}
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h2>Education</h2>
          <p>{degree.degree}, {degree.institution} ({degree.period})</p>
        </section>

        <footer className="brief-footer no-print">
          <Link className="primary-action" to="/resume">Full résumé</Link>
          <Link className="secondary-action" to="/match">Check fit against a job description</Link>
          {BOOKING_URL && <a className="secondary-action" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a call ↗</a>}
        </footer>
      </article>
    </div>
  );
}
