export const projects = [
  {
    title: "Syncly",
    subtitle: "Developer Networking Platform",
    description:
      "Developer-to-developer networking platform built solo end to end. Members pick a mentorship role (mentor, learner, both) and swipe a paginated feed of developers they have not met — Vibe to connect, Ghost to pass; the recipient replies Link or Noped, and a mutual Link unlocks real-time 1:1 chat over Socket.IO with persisted history. Every member gets a shareable portfolio page at their profile slug (projects, experience, education, certifications, theme, SEO, visibility). httpOnly JWT cookie auth with bcrypt, AWS SES email on every swipe, and a daily 08:00 node-cron reminder for pending Vibes. Loop: Discover → Vibe → Link → Chat → Showcase.",
    link: "https://syncly.co.in",
    github: "https://github.com/vigneshcj001/Syncly_fronend",
    githubBackend: "https://github.com/vigneshcj001/Syncly_Backend",
    tags: ["React.js", "Vite", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Mongoose", "Socket.IO", "JWT", "AWS SES", "AWS EC2", "Tailwind CSS"],
    accent: "teal",
    category: "Full-Stack",
  },
  {
    title: "GlycanBench: a unified resource for working with glycans",
    subtitle: "Glycoinformatics Web Server + Python Package · SASTRA University",
    description:
      "Full-stack glycoinformatics platform and installable Python package (SDK, CLI, server) with eight tool groups behind one React UI and one FastAPI API: Create (click-to-build glycans with SNFG 2D + 3D conformers, Cytoscape.js biosynthetic networks, IUPAC/WURCS/GlycoCT/SMILES conversion), Visualize (2D SNFG, 3Dmol.js, KEGG pathways), Analyse (characterisation, GlyTouCan insight, RDKit descriptors + fingerprints, motif mutation), Compare (Tanimoto over five fingerprints), Align (Needleman-Wunsch with the GLYSUM matrix), Cluster (agglomerative/K-means, elbow, outliers), Predict (PyTorch Geometric MPNN immunogenicity classifier with confidence score and motif flags), and GlycomicsChat (Groq gpt-oss-120b with an LLM tool router over PubMed, ArXiv, GlyTouCan). Developed under Ashok Palaniappan at SASTRA's Systems Computational Biology Lab; free for academic use.",
    link: "https://glycanbench.sastra.edu/",
    github: "https://github.com/APalaniaLab/GlycanBench",
    tags: ["Python", "FastAPI", "React.js", "TypeScript", "PyTorch", "PyTorch Geometric", "MPNN", "RDKit", "glycowork", "LangChain", "Groq", "Tailwind CSS"],
    accent: "blue",
    category: "AI/Research",
  },
  {
    title: "Explainable Machine Learning-Based Approach to Developing Potent EGFR Inhibitors for Ovarian Cancer",
    subtitle: "M.Tech Thesis · Explainable AI · Drug Discovery",
    description:
      "M.Tech thesis developing an explainable ML framework to identify potent EGFR inhibitors for ovarian cancer. 310 compounds from ChEMBL encoded with RDKit and Mordred descriptors (1833 → 179 features via LASSO selection). Six classifiers evaluated — Gradient Boosting achieved 98.47% accuracy, Random Forest 98.28% (ROC-AUC ≈ 1.00). SHAP force and waterfall plots identified key activity-driving descriptors: PEOE_VSA9, SM_VSA10, fr_bicyclic.",
    github: null,
    tags: ["Python", "SHAP", "Gradient Boosting", "Random Forest", "RDKit", "Mordred", "ChEMBL"],
    accent: "green",
    category: "AI/Research",
  },
  {
    title: "Prediction of lignocellulosic components and fermentable sugars for bioethanol production by machine learning approach",
    subtitle: "ML for Green Energy · Biomass Pretreatment",
    description:
      "Applied Decision Tree, Random Forest, and LGBM on 20 lignocellulosic biomass samples (fruit peels & agro-wastes) pretreated with nanotechnology, ionic liquids, and ultrasound. Iron nanoparticles synthesised from Musa acuminata peels improved biomass breakdown. Includes BFuel web platform for dataset hosting.",
    github: null,
    tags: ["Python", "Random Forest", "LGBM", "Decision Tree", "Web Dev"],
    accent: "orange",
    category: "AI/Research",
  },
  {
    title: "QSPR for Posaconazole SEDDS",
    subtitle: "Drug Solubility Prediction · Manipal Institute of Technology",
    description:
      "Developed ML-based QSPR models to predict Posaconazole solubility in Self-Emulsifying Drug Delivery Systems (SEDDS) at Manipal Institute of Technology (supervised by Dr. Neha Sureshchandra Gandhi). 50+ molecular descriptors generated with RDKit; VIF analysis selected 10 key descriptors (ELUMO, EHOMO, MaxQ-, FpDensityMorgan2, HallKierAlpha). Random Forest achieved R²=0.865, outperforming PLS (0.733), Linear Regression (0.740), SVM (0.630), and KNN (0.590).",
    github: null,
    tags: ["Python", "RDKit", "Random Forest", "PLS", "QSPR", "Scikit-Learn"],
    accent: "violet",
    category: "AI/Research",
  },
  {
    title: "Suitability Studies Of Fruits Of West Indian elm Plant (Guazuma ulmifolia) As Feedstock For Biofuel production",
    subtitle: "Biofuel Feedstock Evaluation",
    description:
      "Investigated Guazuma ulmifolia fruits as biofuel feedstock via petroleum ether solvent extraction, confirmatory lipid assays (emulsion & acrolein), and H₂SO₄ acid hydrolysis for sugar testing. Confirmed carbohydrate presence; future work targets nano-catalysis and enzymatic pretreatment.",
    github: null,
    tags: ["Bioinformatics", "Research", "Bioethanol", "Biomass"],
    accent: "lime",
    category: "Research",
  },
  {
    title: "CJFoods",
    subtitle: "React.js Food Delivery App",
    description:
      "Frontend-only React.js SPA consuming the Swiggy API in real time. Displays live restaurant listings, menus, and filters with a responsive, performance-optimised UI.",
    link: "https://cj-foods.vercel.app/",
    github: "https://github.com/vigneshcj001/CJFoods",
    tags: ["React.js", "Swiggy API", "JavaScript"],
    accent: "yellow",
    category: "Frontend",
  },
  {
    title: "TinDog",
    subtitle: "Responsive Landing Page",
    description:
      "Playful dog-dating website built with Bootstrap and HTML for mastering responsive design patterns.",
    link: "https://tindog-for-dogs.vercel.app/",
    github: "https://github.com/vigneshcj001/Tindog_for_dogs",
    tags: ["Bootstrap", "HTML", "CSS"],
    accent: "pink",
    category: "Frontend",
  },
  {
    title: "CJBoT — Cookie",
    subtitle: "Autonomous Singing Robot",
    description:
      "Autonomous singing biped robot built on Arduino Nano ATMEGA328 with obstacle detection sensors.",
    link: "https://www.instagram.com/reel/C1Qg2iCy7D-/?igsh=MWtka3U3dWZzMjZ0OA==",
    github: null,
    tags: ["Arduino", "C++", "Robotics", "Sensors"],
    accent: "slate",
    category: "Hardware",
  },
];

export const accentMap = {
  teal:   "from-teal-500/15 to-teal-600/5 border-teal-500/20 hover:border-teal-400/50",
  blue:   "from-blue-500/15 to-blue-600/5 border-blue-500/20 hover:border-blue-400/50",
  green:  "from-green-500/15 to-green-600/5 border-green-500/20 hover:border-green-400/50",
  orange: "from-orange-500/15 to-orange-600/5 border-orange-500/20 hover:border-orange-400/50",
  violet: "from-violet-500/15 to-violet-600/5 border-violet-500/20 hover:border-violet-400/50",
  lime:   "from-lime-500/15 to-lime-600/5 border-lime-500/20 hover:border-lime-400/50",
  yellow: "from-yellow-500/15 to-yellow-600/5 border-yellow-500/20 hover:border-yellow-400/50",
  pink:   "from-pink-500/15 to-pink-600/5 border-pink-500/20 hover:border-pink-400/50",
  slate:  "from-slate-500/15 to-slate-600/5 border-slate-500/20 hover:border-slate-400/50",
};

export const tagColorMap = {
  teal:   "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
  blue:   "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  green:  "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  lime:   "bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300",
  yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  pink:   "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
  slate:  "bg-slate-100 dark:bg-slate-700/40 text-slate-700 dark:text-slate-300",
};

export const categoryFilters = ["All", "Full-Stack", "AI/Research", "Research", "Frontend", "Hardware"];
