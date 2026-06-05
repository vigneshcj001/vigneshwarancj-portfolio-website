export const publications = [
  {
    id: "glycanbench",
    title: "GlycanBench: integrated resource for working with glycans",
    authors: "Vigneshwaran CJ & Ashok Palaniappan",
    guide: "Ashok Palaniappan",
    institution: "Systems Computational Biology Lab, SASTRA Deemed University",
    year: "2025",
    status: "Submitted",
    type: "Research Paper",
    abstract:
      "A comprehensive glycoinformatics platform covering glycan creation, 2D/3D visualisation, comparative fingerprint analysis (Morgan, AtomPair, Torsion, RDKit), sequence alignment, hierarchical/k-means clustering with outlier detection, and an optimised MPNN model for immunogenicity prediction with explainable outputs. Freely available as a web-server and Python package for academic and non-profit use.",
    tags: ["Glycomics", "MPNN", "Python", "Bioinformatics", "RDKit"],
    link: "https://glycanbench.sastra.edu/",
    accent: "blue",
  },
  {
    id: "egfr",
    title:
      "Explainable Machine Learning-Based Approach to Developing Potent EGFR Inhibitors for Ovarian Cancer",
    authors: "Vigneshwaran CJ",
    institution: "SASTRA Deemed University",
    year: "2025",
    status: "M.Tech Thesis",
    type: "Thesis",
    abstract:
      "M.Tech thesis developing an explainable ML framework to identify potent EGFR inhibitors for ovarian cancer. 310 compounds from ChEMBL encoded with RDKit and Mordred (1833 → 179 features via LASSO). Gradient Boosting achieved 98.47% accuracy, Random Forest 98.28% (ROC-AUC ≈ 1.00). SHAP force and waterfall plots identified key activity-driving descriptors: PEOE_VSA9, SM_VSA10, fr_bicyclic.",
    tags: ["Drug Discovery", "SHAP", "EGFR", "Ovarian Cancer", "Gradient Boosting", "RDKit"],
    accent: "green",
  },
  {
    id: "lignocellulosic",
    title:
      "Prediction of lignocellulosic components and fermentable sugars for bioethanol production by machine learning approach",
    authors: "Vigneshwaran CJ",
    institution: "SASTRA Deemed University",
    year: "2024",
    status: "Research Paper",
    type: "Research Paper",
    abstract:
      "Integrated nanotechnology, green pretreatment methods, and machine learning to predict biomass composition and ethanol yield from 20 lignocellulosic samples. Iron nanoparticles synthesised from Musa acuminata peels improved breakdown. Random Forest and Decision Tree showed highest accuracy. BFuel web platform developed for dataset hosting.",
    tags: ["Bioethanol", "Random Forest", "LGBM", "Decision Tree", "Biomass"],
    accent: "orange",
  },
  {
    id: "guazuma",
    title:
      "Suitability Studies Of Fruits Of West Indian elm Plant (Guazuma ulmifolia) As Feedstock For Biofuel production",
    authors: "Vigneshwaran CJ",
    institution: "Prathyusha Engineering College",
    year: "2023",
    status: "Research Paper",
    type: "Research Paper",
    abstract:
      "Investigated Guazuma ulmifolia fruits as biofuel feedstock via petroleum ether solvent extraction, confirmatory lipid assays (emulsion & acrolein), and H₂SO₄ acid hydrolysis for fermentable sugar testing. No lipids detected; carbohydrates confirmed — supports bioethanol pathway. Future work targets nano-catalysis and enzymatic pretreatment.",
    tags: ["Biofuel", "Biomass", "Bioethanol", "Guazuma ulmifolia"],
    accent: "lime",
  },
];

export const pubAccentMap = {
  blue:   { border: "border-blue-200 dark:border-blue-800/50",     badge: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",     tag: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",     bar: "from-blue-400 to-blue-600"   },
  green:  { border: "border-green-200 dark:border-green-800/50",   badge: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",   tag: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",   bar: "from-green-400 to-green-600" },
  orange: { border: "border-orange-200 dark:border-orange-800/50", badge: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300", tag: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300", bar: "from-orange-400 to-orange-600" },
  lime:   { border: "border-lime-200 dark:border-lime-800/50",     badge: "bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300",     tag: "bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300",     bar: "from-lime-400 to-lime-600"   },
};

export const typeLabels = {
  "Research Paper": { label: "Paper",  cls: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/40" },
  "Thesis":         { label: "Thesis", cls: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40"   },
};
