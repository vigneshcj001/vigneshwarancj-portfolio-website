import { Link } from "react-router";
import { HiSparkles } from "react-icons/hi2";
import portrait640 from "url:../assets/portrait-640.webp";
import portrait960 from "url:../assets/portrait-960.webp";
import portrait1536 from "url:../assets/portrait-1536.webp";
import portraitFallback from "url:../assets/portrait-960.jpg";
import { projects } from "../data/projects";
import { skillCategories } from "../data/skills";
import { caseStudies, articles } from "../data/showcase";
import ProjectPreview from "../Components/ProjectPreview";
import useMeta from "../Hooks/useMeta";
import { trackConversion } from "../Utils/analytics";
import CareerTimeline from "../Components/CareerTimeline";
import LiveProof from "../Components/LiveProof";

const FEATURED_PROJECTS = ["aiora", "pocketpet", "glycanbench"];
const ASSISTANT_STACK = [
  ["OKF", "Structured portfolio knowledge"],
  ["Laya", "Typed scope and topic routing"],
  ["LangGraph", "Tool planning and session state"],
  ["Groq", "Fast streamed generation"],
];
const AGENT_DEMOS = [
  ["Search + navigate", "Find Vigneshwaran's strongest Agentic AI project, explain why, and show it."],
  ["Interactive walkthrough", "Give me a step-by-step walkthrough of AIORA architecture."],
  ["Safe contact action", "I want to hire Vigneshwaran for an AI engineering role. Prepare a contact action."],
];

function openAgent(question = "", autoSubmit = false) {
  window.dispatchEvent(new CustomEvent("portfolio-assistant:open", { detail: { question, autoSubmit } }));
}

function FeaturedProject({ slug, position }) {
  const study = caseStudies[slug];
  return (
    <Link className="featured-project" to={`/projects/${slug}`}>
      <ProjectPreview study={study} />
      <div className="featured-project-copy">
        <div className="featured-project-meta"><span>0{position}</span><p className="eyebrow">{study.label}</p></div>
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
        {study.metrics?.length > 0 && (
          <dl className="project-metrics">
            {study.metrics.slice(0, 2).map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
          </dl>
        )}
        <span className="text-link">View engineering case study <span aria-hidden="true">↗</span></span>
      </div>
    </Link>
  );
}

export default function Home() {
  useMeta();
  const copy = {
    eyebrow: "AI / ML engineer · Full-stack developer",
    title: "Useful software.", accent: "Thoughtful AI.",
    lead: "I’m Vigneshwaran C. J. I turn complex workflows into usable web, desktop, and AI products—from production messaging systems and browser agents to computational biology.",
    work: "Explore selected work", resume: "View résumé", note: "Coimbatore, India · Open to professional opportunities",
  };

  return (
    <div className="home-page">
      <section className="portfolio-section hero-section">
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}<br /><span>{copy.accent}</span></h1>
          <p className="lead">{copy.lead}</p>
          <div className="action-row">
            <Link className="primary-action" to="/projects">{copy.work} <span aria-hidden="true">→</span></Link>
            <Link className="secondary-action" to="/resume" onClick={() => trackConversion("resume_view", { source: "home" })}>{copy.resume} <span aria-hidden="true">↗</span></Link>
            <button type="button" className="agentic-action" onClick={() => openAgent()}><span>✦</span> Try Agentic AI</button>
          </div>
          <div className="hero-status"><span className="availability-dot" /><span>{copy.note}</span></div>
        </div>
        <div className="portrait-wrap">
          <picture><source type="image/webp" srcSet={`${portrait640} 640w, ${portrait960} 960w, ${portrait1536} 1536w`} sizes="(max-width: 767px) 100vw, 440px" /><img src={portraitFallback} width="960" height="640" alt="Vigneshwaran C. J." fetchPriority="high" decoding="async" /></picture>
          <div className="portrait-caption"><strong>Engineering × Research</strong><span>M.Tech · Big Data Biology · SASTRA</span></div>
        </div>
      </section>

      <section className="portfolio-section proof-strip" aria-label="Portfolio summary">
        <div><strong>{projects.length}</strong><span>Products and research projects</span></div>
        <div><strong>13</strong><span>Services in production AIORA platform</span></div>
        <div><strong>20</strong><span>Tools delivered through GlycanBench</span></div>
        <div><strong>{skillCategories.reduce((sum, category) => sum + category.skills.length, 0)}</strong><span>Technologies across product and research work</span></div>
      </section>

      <section className="portfolio-section section-spacing featured-work-section">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work</p><h2>Three systems. Three different constraints.</h2><p className="section-intro">Production infrastructure, guarded desktop automation, and scientific software—shown through decisions, architecture, and evidence.</p></div>
          <Link className="text-link" to="/projects">Browse all projects ↗</Link>
        </div>
        <div className="featured-project-grid">
          {FEATURED_PROJECTS.map((slug, index) => <FeaturedProject key={slug} slug={slug} position={index + 1} />)}
        </div>
        <div className="more-work-row">
          <Link to="/projects/syncly"><span>Also built</span><strong>Syncly developer network</strong><em>Case study ↗</em></Link>
          <Link to="/publications"><span>Research</span><strong>Explainable ML for EGFR inhibitors</strong><em>Publication work ↗</em></Link>
        </div>
      </section>

      <section className="portfolio-section section-spacing home-split">
        <article className="current-role-card">
          <p className="eyebrow">Working now</p>
          <h2>Production AI meets full-stack delivery.</h2>
          <p>Junior Software Developer at Ceiyone Tech Works, contributing to AIORA’s WhatsApp business platform across backend APIs, queues, AI workflows, integrations, interfaces, and deployment.</p>
          <dl>
            <div><dt>Focus</dt><dd>AI / ML and full-stack engineering</dd></div>
            <div><dt>Based in</dt><dd>Coimbatore, Tamil Nadu</dd></div>
          </dl>
          <Link className="text-link" to="/experience">See role and contribution details ↗</Link>
        </article>
        <article className="assistant-architecture-card">
          <div className="agentic-card-heading"><p className="eyebrow"><i /> Live Agentic AI</p><h2>Ask. Plan. Use tools. Act.</h2><p>More than chat. Assistant searches verified Markdown, selects typed tools, remembers context, navigates portfolio, and asks before contact actions.</p></div>
          <div className="agentic-flow" aria-label="Agent flow"><span>Question</span><b>→</b><span>Laya route</span><b>→</b><span>LangGraph plan</span><b>→</b><span>Safe action</span></div>
          <ol>{ASSISTANT_STACK.map(([name, detail], index) => <li key={name}><span>0{index + 1}</span><div><strong>{name}</strong><p>{detail}</p></div></li>)}</ol>
          <div className="agentic-demo-list"><span>Try live demos</span>{AGENT_DEMOS.map(([label, question]) => <button type="button" key={label} onClick={() => openAgent(question, true)}><HiSparkles aria-hidden="true" /> <strong>{label}</strong><em>Run demo →</em></button>)}</div>
        </article>
      </section>

      <section className="portfolio-section section-spacing timeline-section">
        <div className="section-heading"><div><p className="eyebrow">Recent path</p><h2>Engineering shaped by research.</h2></div><Link className="text-link" to="/experience">Full experience ↗</Link></div>
        <CareerTimeline limit={4} />
      </section>

      <section className="portfolio-section section-spacing"><LiveProof /></section>

      <section className="portfolio-section section-spacing writing-section">
        <div className="section-heading"><div><p className="eyebrow">Technical notes</p><h2>How decisions get made.</h2></div><Link className="text-link" to="/writing">All writing ↗</Link></div>
        <div className="writing-grid">{articles.slice(0, 3).map((article, index) => <Link key={article.slug} to={`/writing/${article.slug}`}><span>0{index + 1} · {article.project}</span><h3>{article.title}</h3><p>{article.intro}</p><em>Read note ↗</em></Link>)}</div>
      </section>

      <section className="portfolio-section section-spacing"><div className="contact-banner"><p className="eyebrow">Available for the right role</p><h2>Need an engineer who can cross product, AI, and research boundaries?</h2><p>Share the problem, team, and outcome you are hiring for.</p><Link className="primary-action" to="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>
    </div>
  );
}
