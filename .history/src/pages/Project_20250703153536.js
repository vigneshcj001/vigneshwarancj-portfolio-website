import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Natural language processing for Glycomics of infectious microbes",
    description:
      "Utilizing NLP and Deep Learning to study glycans in infectious microbes for biomedical insight.",
    link: "https://github.com/APalaniaLab/GlycanBench",
    color: "bg-blue-400 dark:bg-blue-600",
    buttonGradient: "from-blue-500 to-blue-700",
  },
  {
    title:
      "Explainable Machine Learning-Based Approach to Developing Potent Epidermal Growth Factor Receptor Inhibitors for Ovarian Cancer",
    description:
      "Designing EGFR inhibitors for ovarian cancer with interpretable AI models and drug targets.",
    color: "bg-green-400 dark:bg-green-600",
    buttonGradient: "from-green-500 to-green-700",
  },
  {
    title:
      "Prediction of lignocellulosic components and fermentable sugars for bioethanol production by machine learning approach",
    description:
      "Machine learning predicts sugar yield from fruit peel biomass using novel green pretreatments.",
    color: "bg-orange-400 dark:bg-orange-600",
    buttonGradient: "from-orange-500 to-orange-700",
  },
  {
    title:
      "Suitability Studies Of Fruits Of West Indian elm Plant (𝘎𝘶𝘢𝘻𝘶𝘮𝘢 𝘶𝘭𝘮𝘪𝘧𝘰𝘭𝘪𝘢) As Feedstock For Biofuel production",
    description:
      "Evaluated *Guazuma ulmifolia* fruit for bioethanol yield via chemical pretreatment and sugar tests.",
    color: "bg-lime-400 dark:bg-lime-600",
    buttonGradient: "from-lime-500 to-lime-700",
  },
  {
    title: "CJFoods Webapp",
    description:
      "A scalable MERN-based food delivery platform using Swiggy API and real-time user interface.",
    link: "https://cj-foods.vercel.app/",
    color: "bg-yellow-400 dark:bg-yellow-600",
    buttonGradient: "from-yellow-500 to-yellow-700",
  },
  {
    title: "TinDog",
    description:
      "A playful dog dating website built with Bootstrap and HTML for learning responsive design.",
    link: "https://tindog-for-dogs.vercel.app/",
    color: "bg-purple-400 dark:bg-purple-600",
    buttonGradient: "from-purple-500 to-purple-700",
  },
  {
    title: "BTS",
    description:
      "A creative multimedia fan page project for BTS, featuring animations, galleries, and links.",
    color: "bg-indigo-400 dark:bg-indigo-600",
    buttonGradient: "from-indigo-500 to-indigo-700",
  },
  {
    title: "CJBoT - Cookie",
    description:
      "Autonomous singing biped robot built on Nano ATMEGA328 with obstacle detection sensors.",
    link: "https://www.instagram.com/reel/C1Qg2iCy7D-/?igsh=MWtka3U3dWZzMjZ0OA==",
    color: "bg-pink-400 dark:bg-pink-600",
    buttonGradient: "from-pink-500 to-pink-700",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-gray-900 dark:text-white">
      <h1 className="text-5xl font-extrabold mb-12 animate-pulse">
        🚀 My Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300/50 border border-white/10 backdrop-blur-md ${project.color}`}
          >
            <h2 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-white opacity-90 mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* View Button */}
            {project.link &&
              (project.link.startsWith("/") ? (
                <Link
                  to={project.link}
                  className={`mt-2 inline-flex items-center gap-2 bg-gradient-to-r ${project.buttonGradient} text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-300`}
                >
                  View Project <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-flex items-center gap-2 bg-gradient-to-r ${project.buttonGradient} text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-300`}
                >
                  View Project <ArrowRight className="w-4 h-4" />
                </a>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
