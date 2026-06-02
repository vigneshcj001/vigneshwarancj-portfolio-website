import { motion } from "framer-motion";
import profilePhoto from "../assets/image.jpeg";
import { education, accentMap, researchInterests } from "../data/education.js";
import PageHeader from "../Components/ui/PageHeader.js";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title="About Me"
          subtitle="Interdisciplinary researcher-engineer bridging AI, bioinformatics, glycomics, and full-stack development."
        />

        {/* Profile section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12 p-7 rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 shadow-sm"
        >
          {/* Photo */}
          <div className="shrink-0">
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-blue-200 dark:border-blue-800/50 shadow-lg">
              <img
                src={profilePhoto}
                alt="Vigneshwaran C. J."
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
              Vigneshwaran C. J.
            </h2>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
              M.Tech Big Data Biology · SASTRA Deemed University
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              I build at the intersection of artificial intelligence and molecular biology — developing
              deep learning models for glycomics, explainable ML frameworks for drug discovery, and
              production-grade full-stack platforms. My work spans agentic AI systems, graph neural
              networks, and bioinformatics pipelines, always with a focus on scientific rigor and
              real-world deployment.
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {["AI / ML", "Bioinformatics", "Full-Stack", "Glycomics", "Agentic AI"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
          Education Timeline
        </p>

        <div className="space-y-5">
          {education.map(({ degree, institution, location, period, percentage, Icon, accent }, i) => {
            const a = accentMap[accent];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.15 }}
                className={`flex gap-5 p-6 rounded-2xl border ${a.border} bg-white dark:bg-gray-800/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${a.icon}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                    {degree}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{institution}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{location}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-full">
                      {period}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${a.badge}`}>
                      {percentage}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Research interests */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.55 }}
          className="mt-8 p-6 rounded-2xl border border-violet-200 dark:border-violet-800/40 bg-white dark:bg-gray-800/60 shadow-sm"
        >
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
            Research Interests
          </p>
          <div className="flex flex-wrap gap-2">
            {researchInterests.map((r) => (
              <span
                key={r}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/40"
              >
                {r}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
