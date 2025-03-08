import React from "react";
import { Link } from "react-router-dom"; // Use react-router-dom for internal links

const projects = [
  {
    title: "NLP for Glycomics",
    description: "Studying glycans in infectious microbes.",
    status: "On-going",
    color: "bg-blue-400 dark:bg-blue-600",
    span: "col-span-2",
    link: "/projects/nlp-glycomics", // Internal route
  },
  {
    title: "Explainable AI for EGFR",
    description: "Developing EGFR inhibitors for ovarian cancer.",
    status: "Completed",
    color: "bg-green-400 dark:bg-green-600",
    link: "/projects/egfr-ai", // Internal route
  },
  {
    title: "Lignocellulosic Prediction",
    description: "Predicting fermentable sugars for bioethanol production.",
    status: "Completed",
    color: "bg-orange-400 dark:bg-orange-600",
    link: "/projects/lignocellulosic", // Internal route
  },
  {
    title: "CJFoods Webapp",
    description: "A full-stack food ordering platform.",
    link: "https://cj-foods.vercel.app/", // External link
    status: "Completed",
    color: "bg-yellow-400 dark:bg-yellow-600",
  },
  {
    title: "TinDog",
    description: "A fun dating platform for dogs.",
    status: "Completed",
    color: "bg-purple-400 dark:bg-purple-600",
    span: "col-span-2",
    link: "/projects/tindog", // Internal route
  },
  {
    title: "BTS",
    description: "A fan project related to BTS.",
    status: "Completed",
    color: "bg-indigo-400 dark:bg-indigo-600",
    link: "/projects/bts", // Internal route
  },
  {
    title: "CJBoT - Cookie",
    description: "AI chatbot for tech & fun conversations.",
    status: "On-going",
    color: "bg-pink-400 dark:bg-pink-600",
    link: "/projects/cjbot", // Internal route
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
            className={`relative p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              project.color
            } ${project.span || ""}`}
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-lg text-white opacity-90">
              {project.description}
            </p>

            {/* Internal Links using Link */}
            {project.link && project.link.startsWith("/") ? (
              <Link
                to={project.link}
                className="block mt-2 text-white underline hover:text-gray-200"
              >
                View Project
              </Link>
            ) : (
              /* External Links using <a> */
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-white underline hover:text-gray-200"
              >
                View Project
              </a>
            )}

            {/* Status Badge */}
            <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-semibold bg-black bg-opacity-50 text-white shadow-md">
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
