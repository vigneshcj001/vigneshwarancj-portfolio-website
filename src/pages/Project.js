import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, accentMap, tagColorMap, categoryFilters } from "../data/projects.js";
import PageHeader from "../Components/ui/PageHeader.js";

const TOP_BORDER = {
  teal:   "from-teal-400 to-teal-600",
  blue:   "from-blue-400 to-blue-600",
  green:  "from-green-400 to-green-600",
  orange: "from-orange-400 to-orange-600",
  violet: "from-violet-400 to-violet-600",
  lime:   "from-lime-400 to-lime-600",
  yellow: "from-yellow-400 to-yellow-500",
  pink:   "from-pink-400 to-pink-600",
  slate:  "from-slate-400 to-slate-600",
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen px-4 pt-24 pb-20">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          badge="Portfolio"
          title="Projects"
          subtitle="Selected work spanning AI/ML research, full-stack engineering, computational biology platforms, and embedded systems."
        />

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categoryFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                activeFilter === f
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(({ title, subtitle, description, link, tags, accent, category }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="relative flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600"
            >
              {/* Top accent bar */}
              <div className={`h-0.5 w-full bg-linear-to-r ${TOP_BORDER[accent] || TOP_BORDER.slate}`} />

              <div className="flex flex-col flex-1 p-5">
                {/* Category badge */}
                <span className="absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {category}
                </span>

                <div className="mb-3 pr-16">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                    {title}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                    {subtitle}
                  </p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1 mb-4">
                  {description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tags.map((tag) => (
                    <span key={tag} className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${tagColorMap[accent] ?? tagColorMap.slate}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-auto border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 px-3 py-1.5 rounded-lg w-fit"
                  >
                    View Project <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
