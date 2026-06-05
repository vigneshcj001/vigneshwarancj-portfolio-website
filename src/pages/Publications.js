import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FiBookOpen } from "react-icons/fi";
import { publications, pubAccentMap, typeLabels } from "../data/publications.js";
import PageHeader from "../Components/ui/PageHeader.js";

const TYPE_FILTERS = ["All", "Research Paper", "Thesis", "UG Project"];

const Publications = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? publications
      : publications.filter((p) => p.type === activeFilter);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          badge="Research Output"
          title="Publications"
          subtitle="Peer-reviewed papers and academic theses spanning glycoinformatics, explainable drug discovery ML, green energy, and biofuel research."
        />

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mb-10 text-center"
        >
          <div>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{publications.length}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Publications</p>
          </div>
          <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch" />
          <div>
            <p className="text-2xl font-black text-gray-900 dark:text-white">
              {publications.filter((p) => p.type === "Research Paper").length}
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Papers</p>
          </div>
          <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch" />
          <div>
            <p className="text-2xl font-black text-gray-900 dark:text-white">
              {publications.filter((p) => p.type === "Thesis").length}
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Thesis</p>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {TYPE_FILTERS.map((f) => (
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

        {/* Cards */}
        <div className="space-y-5">
          {filtered.map((pub, idx) => {
            const a = pubAccentMap[pub.accent];
            const tl = typeLabels[pub.type];
            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className={`rounded-2xl border ${a.border} bg-white dark:bg-gray-800/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
              >
                {/* Top accent bar */}
                <div className={`h-0.5 w-full bg-linear-to-r ${a.bar}`} />

                <div className="p-6">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${tl.cls}`}>
                        {tl.label}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                        {pub.year}
                      </span>
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${a.badge}`}>
                        {pub.status}
                      </span>
                    </div>
                  </div>
                  {/* Context (degree / project type) */}
                  {pub.context && (
                    <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                      {pub.context}
                    </p>
                  )}

                  {/* Title */}
                  <h2 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-2">
                    {pub.title}
                  </h2>

                  {/* Authors + institution */}
                  <div className="flex items-start gap-1.5 mb-1">
                    <FiBookOpen className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">{pub.authors}</p>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 pl-5">{pub.institution}</p>

                  {/* Abstract */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {pub.abstract}
                  </p>

                  {/* Tags + link */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {pub.tags.map((t) => (
                        <span key={t} className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${a.tag}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 px-3 py-1.5 rounded-lg"
                      >
                        View <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Publications;
