import React from "react";
import { motion } from "framer-motion";
import { skillCategories, colorMap } from "../data/skills.js";
import PageHeader from "../Components/ui/PageHeader.js";

const totalSkills = skillCategories.reduce((acc, c) => acc + c.skills.length, 0);

const Skills = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 pt-24 pb-20">
      <PageHeader
        badge="Technical Competencies"
        title="Skills"
        subtitle="Comprehensive expertise spanning data science, AI engineering, full-stack development, cloud infrastructure, and computational biology research."
      />

      {/* Summary strip */}
      <div className="flex flex-wrap justify-center gap-6 mb-10 text-center">
        <div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">{totalSkills}+</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Technologies</p>
        </div>
        <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch" />
        <div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">{skillCategories.length}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Categories</p>
        </div>
        <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch" />
        <div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">6+</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Yrs. Coding</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {skillCategories.map(({ name, color, skills }, idx) => {
          const c = colorMap[color];
          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Category header */}
              <div className={`flex items-center justify-between px-4 py-3 border-b ${c.header} border-current/10`}>
                <span className="text-xs font-bold uppercase tracking-wider">{name}</span>
                <span className="text-[10px] font-semibold opacity-70">{skills.length} tools</span>
              </div>
              {/* Skills */}
              <div className="p-4 flex flex-wrap gap-2">
                {skills.map(({ name: sName, Icon }) => (
                  <span
                    key={sName}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-transform duration-200 hover:scale-105 cursor-default ${c.badge}`}
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
