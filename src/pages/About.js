import { motion } from "framer-motion";
import { FaUniversity, FaGraduationCap } from "react-icons/fa";

const education = [
  {
    degree: "Master of Technology in Big Data Biology",
    institution: "SASTRA Deemed University",
    location: "Thanjavur, Tamil Nadu, India",
    period: "Aug 2023 – Present",
    percentage: "79.67%",
    Icon: FaGraduationCap,
    accent: "blue",
  },
  {
    degree: "Bachelor of Technology",
    institution: "Prathyusha Engineering College",
    location: "Tiruvallur, Tamil Nadu, India",
    period: "Aug 2019 – Apr 2023",
    percentage: "84.4%",
    Icon: FaUniversity,
    accent: "emerald",
  },
];

const accentMap = {
  blue: {
    icon: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    badge: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800/50",
  },
  emerald: {
    icon: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800/50",
  },
};

const About = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-black mb-3 bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-md mx-auto">
            Interdisciplinary researcher-engineer bridging AI, bioinformatics,
            glycomics, and full-stack development.
          </p>
        </motion.div>

        {/* Education section label */}
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
          Education Timeline
        </p>

        {/* Education cards */}
        <div className="space-y-5">
          {education.map(
            ({ degree, institution, location, period, percentage, Icon, accent }, i) => {
              const a = accentMap[accent];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.15 }}
                  className={`flex gap-5 p-6 rounded-2xl border ${a.border} bg-white dark:bg-gray-800/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group`}
                >
                  {/* Icon */}
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${a.icon}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {degree}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                      {institution}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{location}</p>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="text-xs bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-full">
                        {period}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${a.badge}`}
                      >
                        {percentage}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {/* Research interests */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="mt-10 p-6 rounded-2xl border border-violet-200 dark:border-violet-800/40 bg-white dark:bg-gray-800/60 shadow-sm"
        >
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
            Research Interests
          </p>
          <div className="flex flex-wrap gap-2">
            {["Graph Neural Networks", "Computational Glycobiology"].map((r) => (
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
