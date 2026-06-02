import React from "react";
import {
  SiPython, SiR, SiJavascript, SiCplusplus,
  SiPandas, SiNumpy, SiScikitlearn, SiPytorch, SiTensorflow,
  SiReact, SiRedux, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiFlask, SiFastapi,
  SiMongodb, SiOracle,
  SiAmazonaws, SiGooglecloud, SiFirebase,
  SiGit, SiGithub, SiPostman, SiJupyter, SiAdobephotoshop, SiLinux, SiVim, SiArduino, SiMacos,
  SiLangchain, SiOpenai,
} from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaDatabase, FaNetworkWired, FaMicroscope, FaGlobe } from "react-icons/fa";
import { AiOutlineCloud } from "react-icons/ai";
import { FaAws } from "react-icons/fa";
import { motion } from "framer-motion";

const skillCategories = [
  {
    name: "Programming Languages",
    color: "blue",
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "R", icon: <SiR /> },
      { name: "SQL", icon: <FaDatabase /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "C++", icon: <SiCplusplus /> },
    ],
  },
  {
    name: "Data Science & ML",
    color: "purple",
    skills: [
      { name: "Pandas", icon: <SiPandas /> },
      { name: "NumPy", icon: <SiNumpy /> },
      { name: "Scikit-Learn", icon: <SiScikitlearn /> },
      { name: "PyTorch", icon: <SiPytorch /> },
      { name: "TensorFlow", icon: <SiTensorflow /> },
    ],
  },
  {
    name: "Frontend Development",
    color: "sky",
    skills: [
      { name: "React.js", icon: <SiReact /> },
      { name: "Redux", icon: <SiRedux /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss3 /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
    ],
  },
  {
    name: "Backend Development",
    color: "green",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "Flask", icon: <SiFlask /> },
      { name: "FastAPI", icon: <SiFastapi /> },
    ],
  },
  {
    name: "Databases",
    color: "orange",
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Oracle", icon: <SiOracle /> },
      { name: "PostgreSQL", icon: <BiLogoPostgresql /> },
    ],
  },
  {
    name: "Cloud & DevOps",
    color: "amber",
    skills: [
      { name: "AWS", icon: <FaAws /> },
      { name: "Google Cloud", icon: <SiGooglecloud /> },
      { name: "Firebase", icon: <SiFirebase /> },
      { name: "Cloud", icon: <AiOutlineCloud /> },
    ],
  },
  {
    name: "AI & LLMs",
    color: "violet",
    skills: [
      { name: "GPT-4", icon: <SiOpenai /> },
      { name: "LangChain", icon: <SiLangchain /> },
      { name: "LangGraph", icon: <FaNetworkWired /> },
      { name: "Agentic AI", icon: <FaNetworkWired /> },
    ],
  },
  {
    name: "Bioinformatics & Research",
    color: "pink",
    skills: [
      { name: "Glycomics", icon: <FaMicroscope /> },
      { name: "Cytoscape", icon: <FaNetworkWired /> },
      { name: "Galaxy", icon: <FaGlobe /> },
    ],
  },
  {
    name: "Tools & Others",
    color: "slate",
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Jupyter", icon: <SiJupyter /> },
      { name: "Photoshop", icon: <SiAdobephotoshop /> },
      { name: "Linux", icon: <SiLinux /> },
      { name: "Vim", icon: <SiVim /> },
      { name: "Arduino", icon: <SiArduino /> },
      { name: "macOS", icon: <SiMacos /> },
    ],
  },
];

const colorMap = {
  blue:   { header: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/40", badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  purple: { header: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/40", badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
  sky:    { header: "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/40", badge: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300" },
  green:  { header: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/40", badge: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
  orange: { header: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/40", badge: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" },
  amber:  { header: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40", badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
  violet: { header: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/40", badge: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300" },
  pink:   { header: "bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800/40", badge: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300" },
  slate:  { header: "bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/40", badge: "bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300" },
};

const Skills = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h1 className="text-5xl font-black mb-3 bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Skills
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Technologies and tools I work with
        </p>
      </motion.div>

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
                {skills.map(({ name: sName, icon }) => (
                  <span
                    key={sName}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-transform duration-200 hover:scale-105 ${c.badge}`}
                  >
                    <span className="text-base">{icon}</span>
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
