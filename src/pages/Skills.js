import React from "react";
import { motion } from "framer-motion";
import { skillCategories, colorMap } from "../data/skills.js";
import PageHeader from "../Components/ui/PageHeader.js";

const Skills = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 pt-24 pb-20">
      <PageHeader
        title="Skills"
        subtitle="Technologies and tools I work with across research, engineering, and deployment."
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {skillCategories.map(({ name, color, skills }, idx) => {
          const c = colorMap[color];
          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${c.header}`}>
                {name}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(({ name: sName, Icon }) => (
                  <span
                    key={sName}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-transform duration-200 hover:scale-105 ${c.badge}`}
                  >
                    <Icon className="text-base shrink-0" />
                    {sName}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
