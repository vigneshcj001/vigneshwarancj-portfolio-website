import { Link } from "react-router";
import profilePhoto from "url:../assets/image.jpeg";
import { projects } from "../data/projects";
import { skillCategories } from "../data/skills";
import { caseStudies, testimonials, articles } from "../data/showcase";
import ProjectPreview from "../Components/ProjectPreview";
import useMeta from "../Hooks/useMeta";
import { trackConversion } from "../Utils/analytics";

export default function Home() {
  useMeta();
  return <div className="home-page">
    <section className="portfolio-section hero-section">
      <div><p className="eyebrow">AI / ML engineer · Full-stack developer</p><h1>Useful software.<br /><span>Thoughtful AI.</span></h1><p className="lead">I’m Vigneshwaran C. J. I build web platforms and AI tools that turn complex workflows into usable products—from developer networking to computational biology.</p>
        <div className="action-row"><Link className="primary-action" to="/projects">Explore my work →</Link><a className="secondary-action" href="/resume.pdf" download="Vigneshwaran_CJ_Resume.pdf" onClick={() => trackConversion("resume_download", { source: "home", version: "static" })}>Download résumé ↓</a></div>
        <p className="hero-note">Coimbatore, India · Open to professional opportunities</p>
      </div><div className="portrait-wrap"><img src={profilePhoto} width="1536" height="1024" alt="Vigneshwaran C. J." fetchPriority="high" /><div className="portrait-caption"><strong>Engineering × Research</strong><span>M.Tech · Big Data Biology · SASTRA</span></div></div>
    </section>
    <div className="portfolio-section stats-strip"><span><b>{projects.length}</b> selected projects</span><span><b>{skillCategories.reduce((sum, c) => sum + c.skills.length, 0)}</b> technologies</span><span><b>Web + AI + Bio</b> connected expertise</span></div>
    <section className="portfolio-section section-spacing"><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>From idea to working product.</h2></div><Link className="text-link" to="/projects">All projects ↗</Link></div>
      <div className="editorial-grid">{Object.entries(caseStudies).map(([slug, study]) => <Link key={slug} className="showcase-card" to={`/projects/${slug}`}><ProjectPreview study={study} /><div className="p-7"><p className="eyebrow">{study.label}</p><h3>{study.title}</h3><p>{study.summary}</p><span className="text-link">Read case study →</span></div></Link>)}</div>
      <Link className="surface-card block mt-6" to="/publications"><p className="eyebrow">Also in research</p><h3>Explainable ML for EGFR inhibitor classification</h3><p>Explore the thesis, reported evaluation results, and related research work.</p><span className="text-link">Explore research →</span></Link>
    </section>
    <section className="portfolio-section section-spacing"><div className="surface-card recruiter-card"><div><p className="eyebrow">At a glance</p><h2>Building across disciplines.</h2><p>Junior Software Developer at Ceiyone Tech Works, working on the AIORA WhatsApp business platform. My independent work combines React, Node.js, Python, and applied machine learning.</p><Link className="text-link" to="/experience">Experience and contributions →</Link></div><dl><dt>Interested in</dt><dd>AI / ML and full-stack engineering opportunities</dd><dt>Based in</dt><dd>Coimbatore, Tamil Nadu, India</dd><dt>Start a conversation</dt><dd><Link className="text-link" to="/contact">Get in touch ↗</Link></dd></dl></div></section>
    {testimonials.filter(t => t.approved).length > 0 && <section className="portfolio-section section-spacing"><p className="eyebrow">Working together</p><h2>From collaborators</h2><div className="editorial-grid">{testimonials.filter(t => t.approved).map(t => <figure className="surface-card" key={t.name}><blockquote>“{t.quote}”</blockquote><figcaption className="mt-4">{t.name} · {t.role}</figcaption></figure>)}</div></section>}
    <section className="portfolio-section section-spacing"><p className="eyebrow">Technical notes</p><h2>Beyond the technology list.</h2><div className="editorial-grid mt-6">{articles.map(article => <Link className="surface-card" key={article.slug} to={`/writing/${article.slug}`}><h3>{article.title}</h3><p>{article.intro}</p><span className="text-link">Read note →</span></Link>)}</div></section>
    <section className="portfolio-section section-spacing"><div className="contact-banner"><p className="eyebrow">Have something in mind?</p><h2>Let’s build something useful.</h2><Link className="primary-action" to="/contact">Start a conversation ↗</Link></div></section>
  </div>;
}
