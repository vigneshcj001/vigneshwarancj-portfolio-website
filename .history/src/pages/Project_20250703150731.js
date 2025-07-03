import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "NATURAL LANGUAGE PROCESSING FOR GLYCOMICS OF INFECTIOUS MICROBES",
    description:
      "Studying glycans in infectious microbes using NLP & Deep Learning.",
    link: "https://github.com/APalaniaLab/GlycanBench",
    color: "bg-blue-400 dark:bg-blue-600",
    buttonGradient: "from-blue-500 to-blue-700",
  },
  {
    title: "Explainable AI for EGFR",
    description: "Developing EGFR inhibitors for ovarian cancer.",
    color: "bg-green-400 dark:bg-green-600",
    buttonGradient: "from-green-500 to-green-700",
  },
  {
    title:
      "Prediction of lignocellulosic components and fermentable sugars for bioethanol production by machine learning approach",
    description: `Summary:
This study explores the efficient production of bioethanol from waste biomass using an integrated approach involving nanotechnology, green pretreatment methods, and machine learning. Twenty different lignocellulosic biomass samples (mainly fruit peels and agro-wastes) were pretreated using physical, chemical, and novel physicochemical methods—such as nanocatalyst-assisted ionic liquid combined with ultrasound—to extract fermentable sugars.

Iron nanoparticles synthesized from Musa acuminata peels were used to improve biomass breakdown. Pretreatment effectiveness was validated by measuring cellulose, hemicellulose, and lignin content before and after treatment. The extracted sugars were fermented using Saccharomyces cerevisiae to produce bioethanol, which was quantified and validated using standard assays.

Machine learning models—including decision tree, random forest, and LGBM—were trained on experimental data to predict biomass composition and ethanol yield. Random forest and decision tree models showed high accuracy in predicting lignocellulosic content and sugar yield. A web interface was also developed to store and display experimental data.`,
    color: "bg-orange-400 dark:bg-orange-600",
    buttonGradient: "from-orange-500 to-orange-700",
  },
  {
    title:
      "Suitability Studies Of Fruits Of West Indian elm Plant (𝘎𝘶𝘢𝘻𝘶𝘮𝘢 𝘶𝘭𝘮𝘪𝘧𝘰𝘭𝘪𝘢) As Feedstock For Biofuel production",
    description: `Biofuels are a type of sustainable energy derived from biological materials. These are made by pretreating various feedstocks from first- and second-generation food crops, as well as agricultural residual wastes. However, it is challenging to find adequate feedstock with a high oil yield for biodiesel and a high sugar yield for bioethanol synthesis. Another focus is on the environmental damage produced by fossil fuels, such as increased CO₂ and other greenhouse gas emissions.

To satisfy these expectations and consequences, the current study sought to determine the potential of *Guazuma ulmifolia* as a feedstock for biofuel production. Guazuma ulmifolia fruits were ground into powder, which was subsequently extracted using solvent extraction procedures with petroleum ether. Confirmatory tests for the presence of lipids, such as emulsion and acrolein assays, were performed on the solvent-vaporised residue.

The processed biomass with sulfuric acid (H₂SO₄) by acid hydrolysis followed by heat treatment was subjected to a confirmatory test for sugars to further examine its eligibility for bioethanol. The sample included no lipids, but it did contain carbohydrates. The manufacturing of bioethanol has taken over. Because pretreatment was ineffective, the content of sugar was low.

🔬 Future Work: A comparative analysis of solvent extraction vs nano-catalysts and enzymatic pathways will be explored for better extraction.`,
    color: "bg-lime-400 dark:bg-lime-600",
    buttonGradient: "from-lime-500 to-lime-700",
  },
  {
    title: "CJFoods Webapp",
    description: "A full-stack food ordering platform.",
    link: "https://cj-foods.vercel.app/",
    color: "bg-yellow-400 dark:bg-yellow-600",
    buttonGradient: "from-yellow-500 to-yellow-700",
  },
  {
    title: "TinDog",
    description: "A fun dating platform for dogs.",
    link: "https://tindog-for-dogs.vercel.app/",
    color: "bg-purple-400 dark:bg-purple-600",
    buttonGradient: "from-purple-500 to-purple-700",
  },
  {
    title: "BTS",
    description: "A fan project related to BTS.",
    color: "bg-indigo-400 dark:bg-indigo-600",
    buttonGradient: "from-indigo-500 to-indigo-700",
  },
  {
    title: "CJBoT - Cookie",
    description:
      "A bipedal robot powered by Nano ATMEGA328, capable of obstacle detection with autonomous navigation. It also features Rtttl-based singing for interactive functionality.",
    link: "https://www.instagram.com/reel/C1Qg2iCy7D-/?igsh=MWtka3U3dWZzMjZ0OA==",
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
            <p className="text-sm text-white opacity-90 mb-4 whitespace-pre-wrap">
              {project.description}
            </p>

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
