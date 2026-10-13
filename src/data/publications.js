export const publications = [
  {
    id: "glycanbench",
    title: "GlycanBench: a unified resource for working with glycans",
    authors: "Vigneshwaran CJ & Ashok Palaniappan",
    guide: "Ashok Palaniappan",
    institution: "Systems Computational Biology Lab, SASTRA Deemed University",
    year: "2026",
    status: "Submitted — Frontiers in Systems Biology",
    type: "Research Paper",
    context: "PG M.Tech · Main Project",
    abstract:
      "A unified glycoinformatics web server and Python package with 20 tools for glycan creation, 2D/3D visualisation, fingerprint comparison, GLYSUM sequence alignment, clustering, immunogenicity prediction, and literature-aware chat. The MPNN workflow uses 1,344 curated glycans after correcting 12 contradictory labels across two datasets.",
    tags: ["Glycomics", "MPNN", "Python", "Bioinformatics", "RDKit"],
    link: "https://glycanbench.sastra.edu/",
    github: "https://github.com/APalaniaLab/GlycanBench",
    pypi: "https://pypi.org/project/glycanbench/",
    doi: "https://doi.org/10.5281/zenodo.22756268",
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
    context: "PG M.Tech Big Data Biology · Thesis & Mini Project",
    abstract:
      "M.Tech thesis developing an explainable ML framework for EGFR inhibitor discovery in ovarian cancer. More than 1,800 molecular descriptors were reduced through LASSO selection. Six classifiers were evaluated with GridSearchCV and four-fold cross-validation; Random Forest reached 93% accuracy and tuned Gradient Boosting reached 98.28%. SHAP explained the model's key activity-driving descriptors.",
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
    status: "B.Tech Main Project",
    type: "UG Project",
    context: "UG B.Tech Biotechnology · Main Project",
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
    status: "B.Tech Mini Project",
    type: "UG Project",
    context: "UG B.Tech Biotechnology · Mini Project",
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
  "Research Paper": { label: "Paper",      cls: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/40"     },
  "Thesis":         { label: "Thesis",     cls: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40"         },
  "UG Project":     { label: "UG Project", cls: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40" },
};
