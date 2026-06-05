import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBriefcase, FiChevronDown, FiChevronUp, FiMapPin, FiAward } from "react-icons/fi";
import mitStudentsImg from "url:../../images/Dr. Neha Sureshchandra Gandhi's Students.jpg";
import mitCertPdf from "url:../../pdfs/Manipal Institute Of Technology Internship Completion Certificate.pdf";
import { roles, tagColors, roleAccents } from "../data/experience.js";
import PageHeader from "../Components/ui/PageHeader.js";

const ROLE_IMAGES = { mit: mitStudentsImg };
const ROLE_CERTS  = { mit: mitCertPdf };

const PROJECT_TAG_COLORS = {
  teal:   "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300",
  sky:    "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300",
  violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300",
  green:  "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
  orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
  amber:  "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
  blue:   "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
  indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300",
  pink:   "bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300",
};

const CARD_BORDERS = {
  teal:   "border-teal-200 dark:border-teal-800/40",
  sky:    "border-sky-200 dark:border-sky-800/40",
  violet: "border-violet-200 dark:border-violet-800/40",
  green:  "border-green-200 dark:border-green-800/40",
  orange: "border-orange-200 dark:border-orange-800/40",
  amber:  "border-amber-200 dark:border-amber-800/40",
  blue:   "border-blue-200 dark:border-blue-800/40",
  indigo: "border-indigo-200 dark:border-indigo-800/40",
  pink:   "border-pink-200 dark:border-pink-800/40",
};

function ProjectCard({ project, idx }) {
  const tagCls  = PROJECT_TAG_COLORS[project.accent] || PROJECT_TAG_COLORS.sky;
  const bordCls = CARD_BORDERS[project.accent] || CARD_BORDERS.sky;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: idx * 0.05 }}
      className={`p-5 rounded-xl border ${bordCls} bg-white dark:bg-gray-800/50 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
    >
      <div className="mb-2">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
          {project.name}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
          {project.subtitle}
        </p>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${tagCls}`}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function TechStackSection({ techStack }) {
  return (
    <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700/40">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Technology Stack
      </p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(techStack).map(([cat, items]) =>
          items.map((item) => (
            <span
              key={`${cat}-${item}`}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300"
            >
              {item}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

function RoleCard({ role, index, image, certPdf }) {
  const [expanded, setExpanded] = useState(true);
  const a = roleAccents[role.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 md:pl-10"
    >
      {/* Timeline dot */}
      <div className={`absolute left-0 top-6 w-4 h-4 rounded-full ${a.dot} ring-4 ring-white dark:ring-gray-900 z-10`} />

      {/* Timeline vertical line (first card only) */}
      {index === 0 && (
        <div className={`absolute left-[7px] top-10 bottom-0 w-0.5 ${a.line}`} />
      )}

      {/* Role card */}
      <div className={`rounded-2xl border ${a.border} bg-white dark:bg-gray-800/60 shadow-sm overflow-hidden`}>

        {/* Role header */}
        <div className={`px-6 py-5 bg-linear-to-r ${a.header} text-white`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <FiBriefcase className="w-3.5 h-3.5 opacity-75" />
                <span className="text-xs font-semibold opacity-90">{role.company}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 font-semibold uppercase tracking-wide">
                  {role.type}
                </span>
              </div>
              <h3 className="text-xl font-black leading-tight tracking-tight">{role.title}</h3>
              <p className="text-sm opacity-75 mt-1 font-medium">{role.period}</p>
              {role.location && (
                <p className="text-xs opacity-60 mt-0.5 flex items-center gap-1">
                  <FiMapPin className="w-3 h-3" />
                  {role.location}
                </p>
              )}
            </div>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="shrink-0 mt-1 p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded
                ? <FiChevronUp className="w-4 h-4" />
                : <FiChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 py-5">
                {/* Overview */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                  {role.overview}
                </p>

                {/* Research area label */}
                {role.researchArea && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 italic mb-5">
                    Focus: {role.researchArea}
                  </p>
                )}

                {/* Supervisor image */}
                {image && (
                  <div className="mb-5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700/50">
                    <img src={image} alt="Internship group photo" className="w-full max-h-52 object-cover object-top" />
                  </div>
                )}

                {/* Projects */}
                {role.projects.length > 0 && (
                  <>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                      Key Deliverables · {role.projects.length} Project{role.projects.length > 1 ? "s" : ""}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {role.projects.map((project, i) => (
                        <ProjectCard key={project.name} project={project} idx={i} />
                      ))}
                    </div>
                  </>
                )}

                {/* Additional responsibilities / impact */}
                {role.additionalSkills.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700/40">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                      {role.additionalSkillsLabel || "Additional Responsibilities"}
                    </p>
                    <ul className="space-y-1.5">
                      {role.additionalSkills.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="mt-2 w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {Object.keys(role.techStack).length > 0 && (
                  <TechStackSection techStack={role.techStack} />
                )}

                {/* Certificate download */}
                {certPdf && (
                  <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700/40">
                    <a
                      href={certPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border border-teal-200 dark:border-teal-800/40 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors"
                    >
                      <FiAward className="w-3.5 h-3.5" />
                      View Completion Certificate
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const Experience = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          badge="Career"
          title="Experience"
          subtitle="Professional and research roles spanning Ceiyone Tech Works (Zoho Partner), Manipal Institute of Technology, and teaching — covering AI engineering, enterprise software, pharmaceutical ML research, and education."
        />

        {/* Company note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-2.5 mb-10 px-5 py-3 rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-900/10"
        >
          <FiMapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
            Ceiyone Tech Works Private Limited — Zoho Partner ·{" "}
            <span className="font-normal opacity-80">
              25/2, Masakalipalayam, Peelamedu, Coimbatore, Tamil Nadu 641028
            </span>
          </p>
        </motion.div>

        <div className="relative space-y-10">
          {roles.map((role, i) => (
            <RoleCard
              key={role.id}
              role={role}
              index={i}
              image={ROLE_IMAGES[role.id]}
              certPdf={ROLE_CERTS[role.id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
