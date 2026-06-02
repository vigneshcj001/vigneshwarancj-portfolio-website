import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBriefcase, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { roles, tagColors, roleAccents } from "../data/experience.js";
import PageHeader from "../Components/ui/PageHeader.js";

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
        Full Tech Stack
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

function RoleCard({ role, index }) {
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

      {/* Timeline vertical line (only for first card) */}
      {index === 0 && (
        <div className={`absolute left-[7px] top-10 bottom-0 w-0.5 ${a.line}`} />
      )}

      {/* Role card */}
      <div className={`rounded-2xl border ${a.border} bg-white dark:bg-gray-800/60 shadow-sm overflow-hidden`}>

        {/* Role header */}
        <div className={`px-6 py-5 bg-linear-to-r ${a.header} text-white`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiBriefcase className="w-4 h-4 opacity-80" />
                <span className="text-xs font-medium opacity-80">{role.company}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 font-medium">
                  {role.type}
                </span>
              </div>
              <h3 className="text-lg font-black leading-tight">{role.title}</h3>
              <p className="text-sm opacity-80 mt-0.5">{role.period}</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {role.overview}
                </p>

                {/* Projects */}
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                  Projects · {role.projects.length}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {role.projects.map((project, i) => (
                    <ProjectCard key={project.name} project={project} idx={i} />
                  ))}
                </div>

                {/* Additional responsibilities */}
                {role.additionalSkills.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700/40">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                      Additional Responsibilities
                    </p>
                    <ul className="space-y-1.5">
                      {role.additionalSkills.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Full tech stack */}
                <TechStackSection techStack={role.techStack} />
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
          title="Experience"
          subtitle="Professional roles, projects, and tech stacks across AI engineering and software development."
        />

        <div className="relative space-y-10">
          {roles.map((role, i) => (
            <RoleCard key={role.id} role={role} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
