import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Text-based skill bubbles
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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-r from-[#2E3192] via-[#1BFFFF] to-[#1B1464] dark:from-[#0F2027] dark:via-[#203A43] dark:to-[#2C5364] text-white overflow-hidden pt-20 pb-10 px-4">
      {/* Fix for edge overflow */}
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>

      {/* Title */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold">
          I'm{" "}
          <span className="text-yellow-400 dark:text-green-300">
            Vigneshwaran C.J.
          </span>
        </h1>
      </div>

      {/* Floating Skill Bubbles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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

      {/* Tech Stack Logos */}
      <div className="relative z-10 mt-20 w-full max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-white">
          🔧 Tech Stack & Tools
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              href: "https://www.arduino.cc/",
              src: "https://cdn.worldvectorlogo.com/logos/arduino-1.svg",
              alt: "arduino",
            },
            {
              href: "https://babeljs.io/",
              src: "https://www.vectorlogo.zone/logos/babeljs/babeljs-icon.svg",
              alt: "babel",
            },
            {
              href: "https://getbootstrap.com",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg",
              alt: "bootstrap",
            },
            {
              href: "https://www.w3schools.com/css/",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
              alt: "css3",
            },
            {
              href: "https://firebase.google.com/",
              src: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
              alt: "firebase",
            },
            {
              href: "https://cloud.google.com",
              src: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
              alt: "gcp",
            },
            {
              href: "https://git-scm.com/",
              src: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
              alt: "git",
            },
            {
              href: "https://www.w3.org/html/",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
              alt: "html5",
            },
            {
              href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
              alt: "javascript",
            },
            {
              href: "https://www.linux.org/",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
              alt: "linux",
            },
            {
              href: "https://www.mongodb.com/",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
              alt: "mongodb",
            },
            {
              href: "https://nodejs.org",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
              alt: "nodejs",
            },
            {
              href: "https://opencv.org/",
              src: "https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg",
              alt: "opencv",
            },
            {
              href: "https://www.oracle.com/",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg",
              alt: "oracle",
            },
            {
              href: "https://pandas.pydata.org/",
              src: "https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/pandas/pandas-original.svg",
              alt: "pandas",
            },
            {
              href: "https://www.photoshop.com/en",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg",
              alt: "photoshop",
            },
            {
              href: "https://www.python.org",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
              alt: "python",
            },
            {
              href: "https://reactjs.org/",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
              alt: "react",
            },
            {
              href: "https://redux.js.org",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
              alt: "redux",
            },
            {
              href: "https://sass-lang.com",
              src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg",
              alt: "sass",
            },
            {
              href: "https://scikit-learn.org/",
              src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
              alt: "scikit_learn",
            },
            {
              href: "https://seaborn.pydata.org/",
              src: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg",
              alt: "seaborn",
            },
            {
              href: "https://tailwindcss.com/",
              src: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
              alt: "tailwind",
            },
            {
              href: "https://www.tensorflow.org",
              src: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg",
              alt: "tensorflow",
            },
            {
              href: "https://webpack.js.org",
              src: "https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg",
              alt: "webpack",
            },
          ].map(({ href, src, alt }, i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer">
              <img
                src={src}
                alt={alt}
                width="40"
                height="40"
                className="transition-transform hover:scale-125 duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
