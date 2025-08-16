import React from "react";
import {
  SiPython, SiR, SiJavascript, SiCplusplus, SiPandas, SiNumpy,
  SiScikitlearn, SiPytorch, SiTensorflow, SiReact, SiRedux,
  SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiNodedotjs,
  SiExpress, SiFlask, SiMongodb, SiOracle, SiAmazonaws,
  SiGooglecloud, SiFirebase, SiGit, SiGithub, SiPostman,
  SiJupyter, SiAdobephotoshop, SiLinux, SiVim, SiArduino,
  SiMacos, SiLangchain, SiOpenai
} from "react-icons/si";
import { FaDatabase, FaNetworkWired, FaMicroscope, FaGlobe } from "react-icons/fa";
import { AiOutlineCloud } from "react-icons/ai";

const Skills = () => {
  const skillCategories = {
    "Programming Languages": [
      { name: "Python", icon: <SiPython className="text-blue-500" /> },
      { name: "R", icon: <SiR className="text-blue-400" /> },
      { name: "SQL", icon: <FaDatabase className="text-gray-600" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
      { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
    ],
    "Data Science & ML": [
      { name: "Pandas", icon: <SiPandas className="text-purple-500" /> },
      { name: "NumPy", icon: <SiNumpy className="text-blue-500" /> },
      { name: "Scikit Learn", icon: <SiScikitlearn className="text-orange-500" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-red-500" /> },
      { name: "TensorFlow", icon: <SiTensorflow className="text-orange-400" /> },
    ],
    "Frontend Development": [
      { name: "React.js", icon: <SiReact className="text-blue-400" /> },
      { name: "Redux", icon: <SiRedux className="text-purple-600" /> },
      { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
      { name: "CSS3", icon: <SiCss3 className="text-blue-600" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
      { name: "Bootstrap", icon: <SiBootstrap className="text-purple-600" /> },
    ],
    "Backend Development": [
      { name: "Node.js", icon: <SiNodedotjs className="text-green-600" /> },
      { name: "Express.js", icon: <SiExpress className="text-gray-800 dark:text-white" /> },
      { name: "Flask", icon: <SiFlask className="text-black dark:text-white" /> },
    ],
    "Databases": [
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      { name: "Oracle", icon: <SiOracle className="text-red-600" /> },
      { name: "SQL", icon: <FaDatabase className="text-gray-600" /> },
    ],
    "Cloud & DevOps": [
      { name: "AWS", icon: <SiAmazonaws className="text-orange-500" /> },
      { name: "Google Cloud", icon: <SiGooglecloud className="text-blue-500" /> },
      { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
      { name: "Cloud", icon: <AiOutlineCloud className="text-gray-500" /> },
    ],
    "AI & LLMs": [
      { name: "GPT-4", icon: <SiOpenai className="text-gray-800 dark:text-white" /> },
      { name: "LangChain", icon: <SiLangchain className="text-green-600" /> },
      { name: "Agentic AI", icon: <FaNetworkWired className="text-purple-600" /> },
    ],
    "Bioinformatics & Research": [
      { name: "Glycomics", icon: <FaMicroscope className="text-pink-600" /> },
      { name: "Cytoscape", icon: <FaNetworkWired className="text-blue-600" /> },
      { name: "Galaxy", icon: <FaGlobe className="text-yellow-600" /> },
    ],
    "Tools & Others": [
      { name: "Git", icon: <SiGit className="text-red-500" /> },
      { name: "GitHub", icon: <SiGithub className="text-gray-800 dark:text-white" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
      { name: "Jupyter Notebook", icon: <SiJupyter className="text-orange-400" /> },
      { name: "Photoshop", icon: <SiAdobephotoshop className="text-blue-500" /> },
      { name: "Linux", icon: <SiLinux className="text-black dark:text-white" /> },
      { name: "Vim", icon: <SiVim className="text-green-600" /> },
      { name: "Arduino", icon: <SiArduino className="text-blue-600" /> },
      { name: "macOS", icon: <SiMacos className="text-gray-500" /> },
    ],
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12">
      <h2 className="text-4xl font-bold mb-10 text-center">🚀 Skills</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(skillCategories).map(([category, skills], idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium hover:scale-110 transition-transform duration-200"
                >
                  {skill.icon} {skill.name}
                </span>
              ))}
            </div>
          </div
        ))}
      </div>
    </section>
  );
};

export default Skills;
