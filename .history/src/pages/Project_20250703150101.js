import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "NATURAL LANGUAGE PROCESSING FOR GLYCOMICS OF INFECTIOUS MICROBES",
    description:
      "Studying glycans in infectious microbes using NLP & Deep Learning.",
    status: "Completed",
    link: "https://github.com/APalaniaLab/GlycanBench",
    color: "bg-blue-400 dark:bg-blue-600",
    buttonGradient: "from-blue-500 to-blue-700",
  },
  {
    title: "Explainable AI for EGFR",
    description: "Developing EGFR inhibitors for ovarian cancer.",
    status: "Completed",
    color: "bg-green-400 dark:bg-green-600",
    buttonGradient: "from-green-500 to-green-700",
  },
  {
    title: "Lignocellulosic Prediction",
    description: "Predicting fermentable sugars for bioethanol production.",
    status: "Completed",
    color: "bg-orange-400 dark:bg-orange-600",
    buttonGradient: "from-orange-500 to-orange-700",
  },
  {
    title: "CJFoods Webapp",
    description: "A full-stack food ordering platform.",
    link: "https://cj-foods.vercel.app/",
    status: "Completed",
    color: "bg-yellow-400 dark:bg-yellow-600",
    buttonGradient: "from-yellow-500 to-yellow-700",
  },
  {
    title: "TinDog",
    description: "A fun dating platform for dogs.",
    link: "https://tindog-for-dogs.vercel.app/",
    status: "Completed",
    color: "bg-purple-400 dark:bg-purple-600",
    buttonGradient: "from-purple-500 to-purple-700",
  },
  {
    title: "BTS",
    description: "A fan project related to BTS.",
    status: "Completed",
    color: "bg-indigo-400 dark:bg-indigo-600",
    buttonGradient: "from-indigo-500 to-indigo-700",
  },
  {
    title: "CJBoT - Cookie",
    description:
      "A bipedal robot powered by Nano ATMEGA328, capable of obstacle detection with autonomous navigation. It also features Rtttl-based singing for interactive functionality.",
    link: "https://www.instagram.com/reel/C1Qg2iCy7D-/?igsh=MWtka3U3dWZzMjZ0OA==",
    status: "On-going",
    color: "bg-pink-400 dark:bg-pink-600",
    buttonGradient: "from-pink-500 to-pink-700",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-950">
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-12 animate-pulse">
        🚀 My Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-300/50 border border-white/10 backdrop-blur-md bg-opacity-90 ${project.color}`}
          >
            <h2 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-white opacity-90 mb-4">
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

            {/* Status Badge */}
            <span
              className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                project.status === "Completed"
                  ? "bg-green-600"
                  : "bg-yellow-500"
              } text-white shadow-lg`}
            >
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
