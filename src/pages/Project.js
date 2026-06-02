import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, accentMap, tagColorMap, categoryFilters } from "../data/projects.js";
import PageHeader from "../Components/ui/PageHeader.js";

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
          title="Projects"
          subtitle="Research, full-stack applications, and hardware builds."
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
              className={`relative flex flex-col p-5 rounded-2xl border bg-linear-to-br ${accentMap[accent]} bg-white dark:bg-gray-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
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
                  <span key={tag} className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${tagColorMap[accent]}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-auto"
                >
                  View Project <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
