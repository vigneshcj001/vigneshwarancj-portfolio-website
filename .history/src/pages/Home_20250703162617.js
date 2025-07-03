import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Alphabetically sorted skills
const skills = [
  "Arduino", "Babel", "Bioinformatics", "Bootstrap", "C++", "Computer Vision", "Content Creation",
  "Content Writing", "CSS", "CSS3", "Cytoscape", "Data Science", "Deep Learning", "Firebase", "Galaxy",
  "GCP", "Git", "GitHub", "GlycoWork", "Glycomics", "HTML", "HTML5", "Java", "JavaScript", "KBase", "Linux",
  "Machine Learning", "MongoDB", "NLP", "NodeJS", "Network Science", "NetworkX", "OpenCV", "Oracle",
  "Pandas", "Photoshop", "Proteomics", "Public Speaking", "PyMOL", "PyTorch", "Python", "R", "React",
  "Redux", "Sass", "Scikit Learn", "Seaborn", "SQL", "Tailwind CSS", "TensorFlow", "UX/UI Design",
  "Video Editing", "Vim", "Webpack"
];

// Generate random positions for bubbles
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
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>

      {/* Greeting Text */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Hi, I'm <span className="text-yellow-400 dark:text-green-300">Vigneshwaran C.J.</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto text-white/90 dark:text-white/80">
          I blend Bioinformatics, AI, and Web Engineering to build impactful tools at the intersection of Biology and Technology.
        </p>
      </div>

      {/* Animated Bubbles */}
      <div className="absolute inset-0 z-0">
        {bubblePositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute w-16 h-16 bg-gradient-to-br from-pink-500 via-yellow-500 to-orange-500 dark:from-gray-700 dark:to-black rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
            style={{ top: position.top, left: position.left }}
            animate={{ y: [0, 20, -20, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <motion.span
              className="absolute bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-300 pointer-events-none"
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
