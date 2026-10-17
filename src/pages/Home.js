import { Link } from "react-router";
import portrait640 from "url:../assets/portrait-640.webp";
import portrait960 from "url:../assets/portrait-960.webp";
import portrait1536 from "url:../assets/portrait-1536.webp";
import portraitFallback from "url:../assets/portrait-960.jpg";
import { projects } from "../data/projects";
import { skillCategories } from "../data/skills";
import { caseStudies, testimonials, articles } from "../data/showcase";
import ProjectPreview from "../Components/ProjectPreview";
import useMeta from "../Hooks/useMeta";
import { trackConversion } from "../Utils/analytics";
import CareerTimeline from "../Components/CareerTimeline";
import LiveProof from "../Components/LiveProof";
import { useLanguage } from "../Contexts/LanguageContext";

export default function Home() {
  useMeta();
  const { language } = useLanguage();
  const copy = language === "ta" ? {
    eyebrow: "AI / ML பொறியாளர் · Full-stack developer",
    title: "பயனுள்ள மென்பொருள்.", accent: "பொறுப்பான AI.",
    lead: "நான் விக்னேஷ்வரன் C. J. Browser agents, developer networking, computational biology போன்ற சிக்கலான பணிகளை எளிதாகப் பயன்படுத்தக்கூடிய web, desktop, AI தயாரிப்புகளாக உருவாக்குகிறேன்.",
    work: "என் பணிகளைப் பாருங்கள் →", resume: "Résumé பதிவிறக்கவும் ↓", note: "கோயம்புத்தூர், இந்தியா · தொழில்முறை வாய்ப்புகளுக்கு தயாராக உள்ளேன்",
  } : {
    eyebrow: "AI / ML engineer · Full-stack developer", title: "Useful software.", accent: "Thoughtful AI.",
    lead: "I’m Vigneshwaran C. J. I build web, desktop, and AI products that turn complex workflows into usable software—from browser agents and developer networking to computational biology.",
    work: "Explore my work →", resume: "Download résumé ↓", note: "Coimbatore, India · Open to professional opportunities",
  };
  return <div className="home-page">
    <section className="portfolio-section hero-section">
      <div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}<br /><span>{copy.accent}</span></h1><p className="lead">{copy.lead}</p>
        <div className="action-row"><Link className="primary-action" to="/projects">{copy.work}</Link><Link className="secondary-action" to="/resume" onClick={() => trackConversion("resume_view", { source: "home" })}>{copy.resume}</Link></div>
        <p className="hero-note">{copy.note}</p>
      </div><div className="portrait-wrap"><picture><source type="image/webp" srcSet={`${portrait640} 640w, ${portrait960} 960w, ${portrait1536} 1536w`} sizes="(max-width: 767px) 100vw, 440px" /><img src={portraitFallback} width="960" height="640" alt="Vigneshwaran C. J." fetchPriority="high" decoding="async" /></picture><div className="portrait-caption"><strong>Engineering × Research</strong><span>M.Tech · Big Data Biology · SASTRA</span></div></div>
    </section>
    <div className="portfolio-section stats-strip"><span><b>{projects.length}</b> selected projects</span><span><b>{skillCategories.reduce((sum, c) => sum + c.skills.length, 0)}</b> technologies</span><span><b>Web + Desktop + AI + Bio</b> connected expertise</span></div>
    <section className="portfolio-section section-spacing"><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>From idea to working product.</h2></div><Link className="text-link" to="/projects">All projects ↗</Link></div>
      <div className="editorial-grid">{Object.entries(caseStudies).sort(([a], [b]) => ["aiora", "pocketpet", "glycanbench", "syncly"].indexOf(a) - ["aiora", "pocketpet", "glycanbench", "syncly"].indexOf(b)).map(([slug, study]) => <Link key={slug} className="showcase-card" to={`/projects/${slug}`}><ProjectPreview study={study} /><div className="p-7"><p className="eyebrow">{study.label}</p><h3>{study.title}</h3><p>{study.summary}</p><span className="text-link">Read case study →</span></div></Link>)}</div>
      <Link className="surface-card block mt-6" to="/publications"><p className="eyebrow">Also in research</p><h3>Explainable ML for EGFR inhibitor classification</h3><p>Explore the thesis, reported evaluation results, and related research work.</p><span className="text-link">Explore research →</span></Link>
    </section>
    <section className="portfolio-section section-spacing"><div className="surface-card recruiter-card"><div><p className="eyebrow">At a glance</p><h2>Building across disciplines.</h2><p>Junior Software Developer at Ceiyone Tech Works, working on the AIORA WhatsApp business platform. My independent work combines React, Node.js, Python, and applied machine learning.</p><Link className="text-link" to="/experience">Experience and contributions →</Link></div><dl><dt>Interested in</dt><dd>AI / ML and full-stack engineering opportunities</dd><dt>Based in</dt><dd>Coimbatore, Tamil Nadu, India</dd><dt>Start a conversation</dt><dd><Link className="text-link" to="/contact">Get in touch ↗</Link></dd></dl></div></section>
    <section className="portfolio-section section-spacing"><div className="surface-card"><p className="eyebrow">Portfolio AI architecture</p><h2>Grounded answers with typed routing.</h2><p>Structured OKF Markdown supplies verified portfolio facts. Laya routes scope and topic. Groq generates concise answers through a streamed assistant API.</p><div className="stats-strip mt-6"><span><b>OKF</b> knowledge</span><span><b>Laya</b> routing</span><span><b>Groq</b> generation</span></div></div></section>
    <section className="portfolio-section section-spacing"><div className="availability-banner"><div><span className="availability-dot" />Open to AI/ML and full-stack roles</div><span>Coimbatore, India · Contact for notice period and work arrangement</span><Link to="/contact">Discuss opportunity →</Link></div></section>
    <section className="portfolio-section section-spacing"><p className="eyebrow">Career timeline</p><h2>Engineering, research, and education.</h2><CareerTimeline /></section>
    <section className="portfolio-section section-spacing"><LiveProof /></section>
    {testimonials.filter(t => t.approved).length > 0 && <section className="portfolio-section section-spacing"><p className="eyebrow">Working together</p><h2>From collaborators</h2><div className="editorial-grid">{testimonials.filter(t => t.approved).map(t => <figure className="surface-card" key={t.name}><blockquote>“{t.quote}”</blockquote><figcaption className="mt-4">{t.name} · {t.role}</figcaption></figure>)}</div></section>}
    <section className="portfolio-section section-spacing"><p className="eyebrow">Technical notes</p><h2>Beyond the technology list.</h2><div className="editorial-grid mt-6">{articles.map(article => <Link className="surface-card" key={article.slug} to={`/writing/${article.slug}`}><h3>{article.title}</h3><p>{article.intro}</p><span className="text-link">Read note →</span></Link>)}</div></section>
    <section className="portfolio-section section-spacing"><div className="contact-banner"><p className="eyebrow">Have something in mind?</p><h2>Let’s build something useful.</h2><Link className="primary-action" to="/contact">Start a conversation ↗</Link></div></section>
  </div>;
}
