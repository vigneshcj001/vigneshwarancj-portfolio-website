import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

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

      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          I'm{" "}
          <span className="text-yellow-400 dark:text-green-300">
            Vigneshwaran C.J.
          </span>
        </h1>
      </div>

      <div className="absolute inset-0 z-0">
        {bubblePositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute w-16 h-16 bg-gradient-to-br from-[#FF512F] via-[#DD2476] to-[#F09819] dark:from-[#434343] dark:to-[#000000] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-xl"
            style={{ top: position.top, left: position.left }}
            animate={{ y: [0, 15, -15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <motion.span
              className="absolute bg-black text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-300"
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
