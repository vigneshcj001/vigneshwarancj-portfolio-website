import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Skills Array
const skills = [
  "Bioinformatics", "Bootstrap", "C++", "Computer Vision", "Content Creation",
  "Content Writing", "CSS", "Cytoscape", "Data Science", "Deep Learning",
  "Galaxy", "Git", "GitHub", "GlycoWork", "Glycomics", "HTML", "Java",
  "JavaScript", "KBase", "Linux", "Machine Learning", "Network Science",
  "NetworkX", "NLP", "Proteomics", "PyMOL", "Python", "PyTorch", "R", "React",
  "SQL", "Tailwind CSS", "TensorFlow", "UX/UI Design", "Vim", "Video Editing",
  "Public Speaking",
];

// Generate random positions within the viewport
const generateRandomPositions = (count) => {
  return Array.from({ length: count }, () => ({
    top: `${Math.random() * 90}vh`,
    left: `${Math.random() * 85}vw`,
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
            className="absolute w-16 h-16 bg-yellow-300 dark:bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-black dark:text-white shadow-lg"
            style={{ top: position.top, left: position.left }}
            animate={{ y: [0, 15, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          >
            <motion.span
              className="absolute bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            >
              {skills[index]}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
