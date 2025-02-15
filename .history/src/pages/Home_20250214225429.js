import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Skills Array
const skills = [
  "Bioinformatics",
  "Bootstrap",
  "C++",
  "Computer Vision",
  "Content Creation",
  "Content Writing",
  "CSS",
  "Cytoscape",
  "Data Science",
  "Deep Learning",
  "Galaxy",
  "Git",
  "GitHub",
  "GlycoWork",
  "Glycomics",
  "HTML",
  "Java",
  "JavaScript",
  "KBase",
  "Linux",
  "Machine Learning",
  "Network Science",
  "NetworkX",
  "NLP",
  "Proteomics",
  "PyMOL",
  "Python",
  "PyTorch",
  "R",
  "React",
  "SQL",
  "Tailwind CSS",
  "TensorFlow",
  "UX/UI Design",
  "Vim",
  "Video Editing",
  "Public Speaking",
];

// Generate random positions within a safer range
const generateRandomPositions = (count) => {
  return Array.from({ length: count }, () => ({
    top: `${Math.random() * 90}vh`, // Keep within viewport
    left: `${Math.random() * 85}vw`, // Avoid too far left/right
  }));
};

const Home = () => {
  const [bubblePositions, setBubblePositions] = useState(() =>
    generateRandomPositions(skills.length)
  );

  // Update positions on window resize
  const updatePositions = useCallback(() => {
    setBubblePositions(generateRandomPositions(skills.length));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [updatePositions]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white dark:bg-black text-gray-300 overflow-hidden">
      {/* Prevent white edges */}
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          background-color: black;
          overflow-x: hidden;
        }
      `}</style>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          I'm <span className="text-cyan-300">Vigneshwaran C.J.</span>
        </h1>
      </div>

      {/* Floating Skill Bubbles */}
      <div className="absolute inset-0 z-0">
        {bubblePositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute w-20 h-20 bg-yellow-300 dark:bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-black dark:text-white shadow-lg transition-all"
            style={{ top: position.top, left: position.left }}
            animate={{ y: [0, 15, -15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <span className="absolute bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {skills[index]}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
