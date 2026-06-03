import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import profilePhoto from "url:../assets/image.jpeg";
import { education, accentMap, researchInterests } from "../data/education.js";
import PageHeader from "../Components/ui/PageHeader.js";
import { LINKEDIN_LINK, GITHUB_LINK } from "../Utils/const.js";

const STATS = [
  { value: "9+",  label: "Projects"         },
  { value: "40+", label: "Skills"            },
  { value: "2",   label: "Research Domains"  },
  { value: "1+",  label: "Yr. Experience"    },
];

const QUICK_LINKS = [
  { label: "LinkedIn", href: LINKEDIN_LINK,              Icon: FaLinkedin, color: "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/40 hover:bg-blue-50 dark:hover:bg-blue-900/20" },
  { label: "GitHub",   href: GITHUB_LINK,                       Icon: FaGithub,   color: "text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/40" },
  { label: "Email",    href: "mailto:vigneshwarancj@gmail.com",  Icon: FaEnvelope, color: "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" },
];

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          badge="Profile"
          title="About Me"
          subtitle="Specialising in the convergence of artificial intelligence, computational biology, and enterprise software engineering."
        />

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 shadow-sm overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-1 w-full bg-linear-to-r from-blue-500 via-violet-500 to-pink-500" />

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-7">
            {/* Photo */}
            <div className="shrink-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-linear-to-br from-blue-500/30 to-violet-500/30 blur-sm" />
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-white dark:border-gray-700 shadow-lg">
                  <img
                    src={profilePhoto}
                    alt="Vigneshwaran C. J."
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-0.5">
                Vigneshwaran C. J.
              </h2>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-0.5">
                Junior Software Developer · Ceiyone Tech Works Pvt. Ltd.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                M.Tech Big Data Biology · SASTRA Deemed University
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                Specialising in the intersection of artificial intelligence and computational biology,
                with core expertise in deep learning for glycomics research, explainable ML frameworks
                for pharmaceutical drug discovery, and production-grade full-stack engineering.
                Professional experience spans enterprise backend systems, AWS cloud services, and
                AI/LLM integration at Ceiyone Tech Works Pvt. Ltd., a Zoho Partner firm.
              </p>

              {/* Domain tags */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
                {["AI / ML", "Bioinformatics", "Full-Stack", "Glycomics", "Cloud (AWS)", "Agentic AI"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick links */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {QUICK_LINKS.map(({ label, href, Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 ${color}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-gray-100 dark:border-gray-700/40">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className={`text-center py-4 ${i < STATS.length - 1 ? "border-r border-gray-100 dark:border-gray-700/40" : ""}`}
              >
                <p className="text-xl font-black text-gray-900 dark:text-white">{value}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
          Academic Background
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
