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
        <motion.div>
          <motion.span>{skills[0]}</motion.span>
        </motion.div>
      </div>
    </div>
  );
};
export default Home;
