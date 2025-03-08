import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "NLP for Glycomics",
    description: "Studying glycans in infectious microbes.",
    status: "On-going",
    color: "bg-blue-600",
  },
  {
    title: "Explainable AI for EGFR",
    description: "Developing EGFR inhibitors for ovarian cancer.",
    status: "Completed",
    color: "bg-green-600",
  },
  {
    title: "Lignocellulosic Prediction",
    description: "Predicting fermentable sugars for bioethanol production.",
    status: "Completed",
    color: "bg-orange-600",
  },
  {
    title: "CJFoods Webapp",
    description: "A full-stack food ordering platform.",
    link: "https://cj-foods.vercel.app/",
    status: "Completed",
    color: "bg-yellow-600",
  },
  {
    title: "TinDog",
    description: "A fun dating platform for dogs.",
    link: "https://tindog-for-dogs.vercel.app/",
    status: "Completed",
    color: "bg-purple-600",
  },
  {
    title: "BTS",
    description: "A fan project related to BTS.",
    status: "Completed",
    color: "bg-indigo-600",
  },
  {
    title: "CJBoT - Cookie",
    description: "AI chatbot for tech & fun conversations.",
    status: "On-going",
    color: "bg-pink-600",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Projects 🚀
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl ${project.color}`}
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-lg text-white opacity-90">
              {project.description}
            </p>

            {/* View Project Button */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-black/50 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:scale-105 transition"
              >
                View Project <ArrowRight className="w-5 h-5" />
              </a>
            )}

            {/* Status Badge */}
            <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-semibold bg-black/50 text-white">
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
