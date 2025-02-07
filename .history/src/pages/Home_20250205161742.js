import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

// Skills Array
const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "CSS",
  "HTML",
  "Python",
  "Django",
  "Machine Learning",
  "Data Science",
  "SQL",
  "Java",
  "C++",
  "TypeScript",
  "Git",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "Firebase",
  "PostgreSQL",
  "Ruby",
  "GitHub",
  "Bootstrap",
  "Swift",
  "Android Development",
  "iOS Development",
  "NoSQL",
  "Flask",
  "Vue.js",
  "TensorFlow",
  "PyTorch",
  "MySQL",
  "Terraform",
  "Jenkins",
  "Power BI",
  "Tableau",
  "Ansible",
  "Google Cloud",
  "Azure",
  "RESTful APIs",
  "Cloud Computing",
  "Security Best Practices",
  "Linux",
  "DevOps",
  "CI/CD",
  "Agile/Scrum",
  "JIRA",
  "Unit Testing",
  "Sass",
  "Tailwind CSS",
  "WordPress",
  "SEO Optimization",
  "Vim",
  "Docker Compose",
  "Hadoop",
  "Apache Spark",
  "NLP",
  "Computer Vision",
  "Blockchain",
  "Cryptography",
  "Penetration Testing",
  "Ethical Hacking",
  "ElasticSearch",
  "Web Security",
  "MongoDB",
  "Redis",
  "WebSockets",
  "Socket.io",
  "Figma",
  "UX/UI Design",
  "Google Analytics",
];

// Memoize positions to avoid recalculating on each render
const generateRandomPositions = (count) => {
  const maxX = window.innerWidth - 100; // Maximum width for bubble position
  const maxY = window.innerHeight - 100; // Maximum height for bubble position

  return Array.from({ length: count }, () => ({
    top: `${Math.random() * maxY}px`,
    left: `${Math.random() * maxX}px`,
  }));
};

const Home = () => {
  const [bubblePositions, setBubblePositions] = useState([]);

  // Optimized effect for resizing
  const updatePositions = useCallback(() => {
    const positions = generateRandomPositions(skills.length);
    setBubblePositions(positions);
  }, []);

  // Initialize positions and update on window resize
  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, [updatePositions]);

  const renderBubbles = useMemo(() => {
    return bubblePositions.map((position, index) => (
      <motion.div
        key={index}
        className="absolute w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
        style={{ top: position.top, left: position.left }}
        animate={{ y: [0, 10, -10, 0] }}
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
    ));
  }, [bubblePositions]);

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          I'm <span className="text-gray-500">Vigneshwaran C.J</span>
        </h1>
      </div>

      {/* Floating Bubbles (Behind the Text) */}
      <div className="absolute inset-0 z-0">{renderBubbles}</div>
    </div>
  );
};

export default Home;
