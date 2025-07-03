import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// A–Z sorted skill list
const skills = [
  "Bioinformatics", "Bootstrap", "C++", "Computer Vision", "Content Creation",
  "Content Writing", "CSS", "Cytoscape", "Data Science", "Deep Learning",
  "Galaxy", "Git", "GitHub", "GlycoWork", "Glycomics", "HTML", "Java",
  "JavaScript", "KBase", "Linux", "Machine Learning", "Network Science",
  "NetworkX", "NLP", "Proteomics", "Public Speaking", "PyMOL", "Pandas",
  "Photoshop", "Python", "PyTorch", "R", "React", "Redux", "SQL", "Sass",
  "Scikit Learn", "Seaborn", "Tailwind CSS", "TensorFlow", "UX/UI Design",
  "Vim", "Video Editing", "Webpack", "arduino", "babel", "css3", "firebase",
  "gcp", "html5", "mongodb", "nodejs", "opencv", "oracle"
].sort((a, b) => a.localeCompare(b));

// Generate random positions
const generateRandomPositions = (count) =>
  Array.from({ length: count }, () => ({
    top: `${Math.random() * 90}vh`,
    left: `${Math.random() * 85}vw`,
  }));

const Home = () => {
  const [bubblePositions, setBubblePositions] = useState(() =>
    generateRandomPositions(skills.length)
  );

  const updatePositions = useCallback(() => {
    setBubblePositions(generateRandomPositions(skills.length));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [updatePositions]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#2E3192] via-[#1BFFFF] to-[#1B1464] dark:from-[#0F2027] dark:via-[#203A43] dark:to-[#2C5364] text-white overflow-hidden">
      {/* Prevent horizontal scroll */}
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>

      {/* Animated Intro Text */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Hi, I'm{" "}
          <span className="text-yellow-400 dark:text-green-300">
            Vigneshwaran C.J.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-xl md:text-xl font-medium text-white/90 mb-6"
        >
          Interdisciplinary Researcher-Engineer|
          Artificial Intelligence | Bioinformatics | Glycomics| Full-Stack
          Developer
        </motion.p>

        <motion.a
          href="/projects"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl border border-white/30 backdrop-blur-md transition-all"
        >
          🚀 Explore My Projects
        </motion.a>
      </div>

      {/* Floating Skills */}
      <div className="absolute inset-0 z-0">
        {bubblePositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute w-16 h-16 bg-gradient-to-br from-[#FF512F] via-[#DD2476] to-[#F09819] dark:from-[#434343] dark:to-[#000000] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
            style={{ top: position.top, left: position.left }}
            animate={{ y: [0, 15, -15, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {/* Tooltip on hover */}
            <motion.span
              className="absolute bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 z-50 transition-opacity duration-300 whitespace-nowrap"
              whileHover={{ opacity: 1 }}
            >
              {skills[index]}
            </motion.span>

            {/* Skill abbreviation or icon placeholder */}
            <span className="z-10">
              {skills[index].slice(0, 2).toUpperCase()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
