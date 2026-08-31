import { useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiPrinter, FiGithub, FiLinkedin, FiMail, FiGlobe, FiExternalLink, FiMapPin } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { roles } from "../data/experience.js";
import { education, certifications, researchInterests } from "../data/education.js";
import { publications } from "../data/publications.js";
import { projects } from "../data/projects.js";
import { skillCategories } from "../data/skills.js";
import { LINKEDIN_LINK, GITHUB_LINK } from "../Utils/const.js";
import useMeta from "../Hooks/useMeta.js";

const BACKEND = "https://vigneshwarancj-portfolio-backend.onrender.com";

const FEATURED_PROJECT_TITLES = [
  "Syncly",
  "GlycanBench: integrated resource for working with glycans",
  "Explainable Machine Learning-Based Approach to Developing Potent EGFR Inhibitors for Ovarian Cancer",
  "QSPR for Posaconazole SEDDS",
  "Prediction of lignocellulosic components and fermentable sugars for bioethanol production by machine learning approach",
];

function SectionLabel({ children }) {
  return (
    <div className="mb-3">
      <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-700 dark:text-blue-400">
        {children}
      </h2>
      <div className="h-px bg-blue-700/30 dark:bg-blue-400/30 mt-0.5" />
    </div>
  );
}

function ResumeHeader() {
  return (
    <div className="pb-5 border-b-2 border-blue-700/20 dark:border-blue-400/20 mb-5">
      <h1 className="text-[26px] leading-none font-black text-gray-900 dark:text-white tracking-tight">
        Vigneshwaran C. J.
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
        AI/ML Engineer &amp; Full-Stack Developer — Building the AIORA WhatsApp Business Platform
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-500 dark:text-gray-400">
        <a href="mailto:vigneshwarancj@gmail.com" className="flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          <FiMail className="w-3 h-3" /> vigneshwarancj@gmail.com
        </a>
        <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          <FiLinkedin className="w-3 h-3" /> linkedin.com/in/vigneshwarancj1
        </a>
        <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          <FiGithub className="w-3 h-3" /> github.com/vigneshcj001
        </a>
        <a href="https://vigneshwarancj-portfolio-website.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          <FiGlobe className="w-3 h-3" /> vigneshwarancj-portfolio-website.vercel.app
        </a>
        <span className="flex items-center gap-1">
          <FiMapPin className="w-3 h-3" /> Coimbatore, Tamil Nadu, India
        </span>
      </div>
    </div>
  );
}

function SummarySection() {
  return (
    <div className="mb-5">
      <SectionLabel>Professional Summary</SectionLabel>
      <p className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed">
        AI/ML Engineer and Full-Stack Developer specialising in agentic AI systems, WhatsApp automation, and
        explainable machine learning. M.Tech in Big Data Biology from SASTRA Deemed University (2025, 79.67%).
        Currently a Junior Software Developer at Ceiyone Tech Works (Zoho Partner), building <strong className="font-semibold text-gray-900 dark:text-white">AIORA</strong> — a
        multi-tenant WhatsApp business platform spanning a WhatsApp gateway (Oblion), booking and commerce
        backends, n8n-orchestrated AI conversation agents, and operator/customer dashboards — and mentoring
        2 engineering interns on it. Also built production-grade platforms independently: Syncly (MERN + Socket.IO + AWS)
        and GlycanBench (glycoinformatics + MPNN). M.Tech thesis achieved 98.47% accuracy in EGFR inhibitor
        classification for ovarian cancer using Gradient Boosting and SHAP.
      </p>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div className="mb-5">
      <SectionLabel>Work Experience</SectionLabel>
      <div className="space-y-4">
        {roles.map((role) => (
          <div key={role.id} className="break-inside-avoid">
            <div className="flex flex-wrap justify-between items-baseline gap-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {role.title} — {role.company}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 shrink-0">
                {role.period}
              </p>
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">{role.type}</p>
            <p className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed mb-1">
              {role.overview}
            </p>
            {role.projects.length > 0 && (
              <p className="text-[13px] text-gray-600 dark:text-gray-400">
                <span className="font-medium">Key deliverables:</span>{" "}
                {role.projects.slice(0, 8).map((p) => p.name).join(", ")}
              </p>
            )}
            {role.additionalSkills?.length > 0 && (
              <ul className="mt-1 space-y-0.5">
                {role.additionalSkills.map((item) => (
                  <li key={item} className="text-[13px] text-gray-600 dark:text-gray-400 flex gap-1.5">
                    <span className="text-gray-400 shrink-0">-</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSection() {
  return (
    <div className="mb-5">
      <SectionLabel>Education</SectionLabel>
      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.degree} className="break-inside-avoid">
            <div className="flex flex-wrap justify-between items-baseline gap-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{edu.degree}</p>
              <p className="text-[10px] text-gray-400 shrink-0">{edu.period}</p>
            </div>
            <p className="text-[13px] text-gray-500 dark:text-gray-400">
              {edu.institution} · {edu.location} · Grade: {edu.percentage}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PublicationsSection() {
  return (
    <div className="mb-5">
      <SectionLabel>Publications &amp; Research</SectionLabel>
      <div className="space-y-3">
        {publications.map((pub) => (
          <div key={pub.id} className="break-inside-avoid">
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
              {pub.title}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">
              {pub.type} · {pub.status} · {pub.institution} · {pub.year}
            </p>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
              {pub.abstract.slice(0, 220)}{pub.abstract.length > 220 ? "..." : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection() {
  const featured = projects.filter((p) => FEATURED_PROJECT_TITLES.includes(p.title));
  return (
    <div>
      <SectionLabel>Key Independent Projects</SectionLabel>
      <div className="space-y-3">
        {featured.map((proj) => (
          <div key={proj.title} className="break-inside-avoid">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{proj.title}</p>
              {(proj.link || proj.github) && (
                <a
                  href={proj.link || proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-700 dark:text-blue-400 flex items-center gap-0.5 hover:underline no-print"
                >
                  <FiExternalLink className="w-2.5 h-2.5" /> Link
                </a>
              )}
            </div>
            {proj.subtitle && (
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">{proj.subtitle}</p>
            )}
            <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed mb-0.5">
              {proj.description.slice(0, 290)}{proj.description.length > 290 ? "..." : ""}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              <span className="font-medium">Stack:</span> {proj.tags.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarContact() {
  return (
    <div className="mb-6">
      <SectionLabel>Contact</SectionLabel>
      <div className="space-y-1.5 text-[12px] text-gray-600 dark:text-gray-400">
        <a href="mailto:vigneshwarancj@gmail.com" className="flex items-center gap-1.5 hover:text-blue-700 dark:hover:text-blue-400 transition-colors break-all">
          <FiMail className="w-3 h-3 shrink-0" /> vigneshwarancj@gmail.com
        </a>
        <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          <FiLinkedin className="w-3 h-3 shrink-0" /> vigneshwarancj1
        </a>
        <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
          <FiGithub className="w-3 h-3 shrink-0" /> vigneshcj001
        </a>
        <span className="flex items-center gap-1.5">
          <FiMapPin className="w-3 h-3 shrink-0" /> Coimbatore, India
        </span>
      </div>
    </div>
  );
}

function SidebarSkills() {
  return (
    <div className="mb-6">
      <SectionLabel>Technical Skills</SectionLabel>
      <div className="space-y-2.5">
        {skillCategories.map((cat) => (
          <div key={cat.name}>
            <p className="text-[11px] font-semibold text-gray-900 dark:text-white mb-1">{cat.name}</p>
            <div className="flex flex-wrap gap-1">
              {cat.skills.map((s) => (
                <span
                  key={s.name}
                  className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700/60 text-[10.5px] text-gray-700 dark:text-gray-300"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarCertifications() {
  return (
    <div className="mb-6">
      <SectionLabel>Certifications</SectionLabel>
      <div className="space-y-2">
        {certifications.map((cert) => (
          <div key={cert.title} className="break-inside-avoid">
            <p className="text-[12px] font-semibold text-gray-900 dark:text-white leading-snug">{cert.title}</p>
            <p className="text-[10.5px] text-gray-500 dark:text-gray-400">{cert.issuer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarResearchInterests() {
  return (
    <div>
      <SectionLabel>Research Interests</SectionLabel>
      <p className="text-[12px] text-gray-600 dark:text-gray-400 leading-relaxed">{researchInterests.join(", ")}</p>
    </div>
  );
}

const Resume = () => {
  useMeta("Resume", "Download or preview Vigneshwaran C.J.'s resume — AI/ML Engineer, Full-Stack Developer building the AIORA WhatsApp business platform.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND}/api/resume`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Vigneshwaran_CJ_Resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to download. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-20 print:p-0 print:pt-0 print:min-h-0">
      <div className="max-w-4xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-8 no-print">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800/40 mb-3">
            <HiOutlineDocumentText className="w-3.5 h-3.5" /> Document
          </span>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Resume
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-5">
            ATS-friendly PDF generated on-the-fly from live portfolio data.
            Always reflects the latest updates.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleDownload}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-600 disabled:bg-blue-400 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <FiDownload className="w-4 h-4" /> Download PDF
                </>
              )}
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-700 transition-all"
            >
              <FiPrinter className="w-4 h-4" /> Print Preview
            </button>
          </div>

          {error && (
            <p className="mt-3 text-xs text-red-500 dark:text-red-400">{error}</p>
          )}
        </div>

        {/* Resume page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white dark:bg-gray-800 rounded-2xl print:rounded-none border border-gray-200 dark:border-gray-700 print:border-0 shadow-2xl print:shadow-none ring-1 ring-black/5 print:ring-0"
        >
          {/* letterhead accent bar */}
          <div className="h-2 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 no-print" />

          <div className="p-8 md:p-10 print:p-8">
            <ResumeHeader />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-x-10">
              {/* Main column */}
              <div>
                <SummarySection />
                <ExperienceSection />
                <EducationSection />
                <PublicationsSection />
                <ProjectsSection />
              </div>
              {/* Sidebar column */}
              <div className="md:border-l md:border-gray-200 md:dark:border-gray-700 md:pl-6 pt-1">
                <SidebarContact />
                <SidebarSkills />
                <SidebarCertifications />
                <SidebarResearchInterests />
              </div>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4 no-print">
          The downloaded PDF is a single-column, plain-text layout formatted for ATS parsers —
          this page's two-column view is for on-screen reading only.
        </p>
      </div>
    </div>
  );
};

export default Resume;
