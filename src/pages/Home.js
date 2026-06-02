import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";

const SKILLS_MARQUEE = [
  "Python", "React.js", "Node.js", "FastAPI", "PyTorch", "TensorFlow",
  "LangChain", "MongoDB", "AWS", "PostgreSQL", "Scikit-Learn", "NLP",
  "Agentic AI", "LangGraph", "GNN", "Glycomics", "SQL", "Flask",
];

const STATS = [
  { label: "Projects", value: "9+" },
  { label: "Skills", value: "40+" },
  { label: "Research Areas", value: "2" },
];

const Home = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#060610] text-white">
      {/* Background layers */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-950/60 via-[#060610] to-purple-950/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(99,102,241,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[60px_60px]" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl w-full">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Open to opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-4 leading-tight tracking-tight"
        >
          Vigneshwaran{" "}
          <span className="bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            C. J.
          </span>
        </motion.h1>

        {/* Animated roles */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-10 h-8 font-light"
        >
          <span className="text-gray-200 font-medium">
            <Typewriter
              words={[
                "AI / ML Engineer",
                "Full-Stack Developer",
                "Bioinformatics Researcher",
                "Glycomics Scientist",
                "Agentic AI Builder",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={55}
              deleteSpeed={35}
              delaySpeed={1800}
            />
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/projects"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm hover:bg-white/5 hover:scale-105"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-20 flex justify-center gap-12 border-t border-white/8 pt-10"
        >
          {STATS.map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black text-white">{value}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Skills marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 py-3 border-t border-white/5 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 w-max"
        >
          {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((skill, i) => (
            <span
              key={i}
              className="text-xs text-gray-600 font-medium uppercase tracking-widest whitespace-nowrap"
            >
              {skill}
              <span className="ml-10 text-blue-900">◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
