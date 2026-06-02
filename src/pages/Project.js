import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Syncly",
    subtitle: "Professional Networking Platform",
    description:
      "Cross-sector networking platform with real-time chat (Socket.IO), portfolio builder, AWS EC2 deployment, SES email notifications, and daily cron jobs.",
    link: "https://syncly.co.in",
    tags: ["React.js", "Node.js", "MongoDB", "Socket.IO", "AWS"],
    accent: "teal",
  },
  {
    title: "GlycanBench",
    subtitle: "Glycomics AI Platform",
    description:
      "Interactive glycomics platform with deep learning models (BiLSTM, GAT, GIN, MPNN) for immunogenicity prediction achieving up to 98.2% accuracy.",
    link: "https://glycanbench.sastra.edu/",
    tags: ["Python", "FastAPI", "React.js", "PyTorch", "Tailwind CSS"],
    accent: "blue",
  },
  {
    title: "EGFR Inhibitors — Ovarian Cancer",
    subtitle: "Explainable ML · Drug Discovery",
    description:
      "Explainable ML framework for EGFR inhibitor discovery using SHAP, RDKit, Mordred descriptors. Gradient Boosting achieved 92% accuracy on ChEMBL dataset.",
    tags: ["Python", "SHAP", "Scikit-Learn", "RDKit", "Mordred"],
    accent: "green",
    badge: "Research",
  },
  {
    title: "Lignocellulosic Bioethanol",
    subtitle: "ML for Green Energy",
    description:
      "ML models predicting lignocellulosic components and fermentable sugars for bioethanol production. Includes BFuel web platform with dataset hosting.",
    tags: ["Python", "Random Forest", "SVM", "Web Dev"],
    accent: "orange",
    badge: "Research",
  },
  {
    title: "QSPR for Posaconazole SEDDS",
    subtitle: "Pharmaceutical Formulation",
    description:
      "QSPR models predicting Posaconazole solubility in SEDDS using quantum descriptors and VIF analysis. Random Forest achieved R² up to 0.926.",
    tags: ["Python", "ML", "QSPR", "Pharma"],
    accent: "violet",
    badge: "Research",
  },
  {
    title: "Guazuma ulmifolia Bioethanol",
    subtitle: "Suitability Study",
    description:
      "Evaluated West Indian Elm fruit as bioethanol feedstock via chemical pretreatment, proximate analysis, and fermentable sugar quantification.",
    tags: ["Bioinformatics", "Research", "Bioethanol"],
    accent: "lime",
    badge: "Research",
  },
  {
    title: "CJFoods",
    subtitle: "MERN Food Delivery App",
    description:
      "Scalable MERN-based food delivery platform integrating Swiggy API with real-time UI and optimized performance.",
    link: "https://cj-foods.vercel.app/",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js"],
    accent: "yellow",
  },
  {
    title: "TinDog",
    subtitle: "Responsive Landing Page",
    description:
      "Playful dog-dating website built with Bootstrap and HTML for mastering responsive design patterns.",
    link: "https://tindog-for-dogs.vercel.app/",
    tags: ["Bootstrap", "HTML", "CSS"],
    accent: "pink",
  },
  {
    title: "CJBoT — Cookie",
    subtitle: "Autonomous Singing Robot",
    description:
      "Autonomous singing biped robot built on Arduino Nano ATMEGA328 with obstacle detection sensors.",
    link: "https://www.instagram.com/reel/C1Qg2iCy7D-/?igsh=MWtka3U3dWZzMjZ0OA==",
    tags: ["Arduino", "C++", "Robotics", "Sensors"],
    accent: "slate",
  },
];

const accentMap = {
  teal:   "from-teal-500/15 to-teal-600/5 border-teal-500/20 hover:border-teal-400/50",
  blue:   "from-blue-500/15 to-blue-600/5 border-blue-500/20 hover:border-blue-400/50",
  green:  "from-green-500/15 to-green-600/5 border-green-500/20 hover:border-green-400/50",
  orange: "from-orange-500/15 to-orange-600/5 border-orange-500/20 hover:border-orange-400/50",
  violet: "from-violet-500/15 to-violet-600/5 border-violet-500/20 hover:border-violet-400/50",
  lime:   "from-lime-500/15 to-lime-600/5 border-lime-500/20 hover:border-lime-400/50",
  yellow: "from-yellow-500/15 to-yellow-600/5 border-yellow-500/20 hover:border-yellow-400/50",
  pink:   "from-pink-500/15 to-pink-600/5 border-pink-500/20 hover:border-pink-400/50",
  slate:  "from-slate-500/15 to-slate-600/5 border-slate-500/20 hover:border-slate-400/50",
};

const tagColorMap = {
  teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  lime: "bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300",
  yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
  slate: "bg-slate-100 dark:bg-slate-700/40 text-slate-700 dark:text-slate-300",
};

const Projects = () => {
  return (
    <div className="min-h-screen px-4 pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-black mb-3 bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Research, full-stack apps, and hardware builds
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(({ title, subtitle, description, link, tags, accent, badge }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className={`relative flex flex-col p-5 rounded-2xl border bg-linear-to-br ${accentMap[accent]} bg-white dark:bg-gray-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group`}
            >
              {/* Research badge */}
              {badge && (
                <span className="absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {badge}
                </span>
              )}

              {/* Title */}
              <div className="mb-3 pr-12">
                <h2 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                  {title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                  {subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1 mb-4">
                {description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${tagColorMap[accent]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
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
