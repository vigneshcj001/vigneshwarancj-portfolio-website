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
    left: `${Math.random() * 100}vw`,
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
    <div>
      <div>
        <h1>
          I'm <span>Vigneshwaran C.J.</span>
        </h1>
      </div>

      <div>
        {bubblePositions.map((position, index) => (
          <motion.div
          key={index}
          className="absolute w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
          style={{top:position.top,left: position.left}}
          animate={{y:[0,15,-15,0]}}>
            <motion.span>{skills[index]}</motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Home;
