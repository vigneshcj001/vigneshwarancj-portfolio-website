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

// Generate random positions within the viewport
const generateRandomPositions = (count) => {
  return Array.from({ length: count }, () => ({
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 80 +10}vw`,
  }));
};
const Home = () => {
  const [bubblePositions, setBubblePositions] = useState(() =>
    generateRandomPositions(skills.length)
  );

  // Update positions on window resize
  const updatePositions = useCallback(()=>{
    setBubblePositions(
      generateRandomPositions(skills.length)
    ),[]
  });
  useEffect(()=>{
    window.addEventListener("resize",updatePositions);
    return() => window.removeEventListener("resize",updatePositions)
  },[updatePositions])
  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          I'm <span className="text-cyan-300">Vigneshwaran C.J.</span>
        </h1>
      </div>

      <div className="absolute inset-0 z-0">
        {bubblePositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
            style={{ top: position.top, left: position.left }}
            animate={{ y: [0, 15, -15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <motion.span
              className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-300"
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
