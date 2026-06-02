export const projects = [
  {
    title: "Syncly",
    subtitle: "Professional Networking Platform",
    description:
      "Cross-sector networking platform with real-time chat (Socket.IO), portfolio builder, AWS EC2 deployment, SES email notifications, and daily cron jobs.",
    link: "https://syncly.co.in",
    tags: ["React.js", "Node.js", "MongoDB", "Socket.IO", "AWS"],
    accent: "teal",
    category: "Full-Stack",
  },
  {
    title: "GlycanBench",
    subtitle: "Glycomics AI Platform",
    description:
      "Interactive glycomics platform with deep learning models (BiLSTM, GAT, GIN, MPNN) for immunogenicity prediction achieving up to 98.2% accuracy.",
    link: "https://glycanbench.sastra.edu/",
    tags: ["Python", "FastAPI", "React.js", "PyTorch", "Tailwind CSS"],
    accent: "blue",
    category: "AI/Research",
  },
  {
    title: "EGFR Inhibitors — Ovarian Cancer",
    subtitle: "Explainable ML · Drug Discovery",
    description:
      "Explainable ML framework for EGFR inhibitor discovery using SHAP, RDKit, Mordred descriptors. Gradient Boosting achieved 92% accuracy on ChEMBL dataset.",
    tags: ["Python", "SHAP", "Scikit-Learn", "RDKit", "Mordred"],
    accent: "green",
    category: "AI/Research",
  },
  {
    title: "Lignocellulosic Bioethanol",
    subtitle: "ML for Green Energy",
    description:
      "ML models predicting lignocellulosic components and fermentable sugars for bioethanol production. Includes BFuel web platform with dataset hosting.",
    tags: ["Python", "Random Forest", "SVM", "Web Dev"],
    accent: "orange",
    category: "AI/Research",
  },
  {
    title: "QSPR for Posaconazole SEDDS",
    subtitle: "Pharmaceutical Formulation",
    description:
      "QSPR models predicting Posaconazole solubility in SEDDS using quantum descriptors and VIF analysis. Random Forest achieved R² up to 0.926.",
    tags: ["Python", "ML", "QSPR", "Pharma"],
    accent: "violet",
    category: "AI/Research",
  },
  {
    title: "Guazuma ulmifolia Bioethanol",
    subtitle: "Suitability Study",
    description:
      "Evaluated West Indian Elm fruit as bioethanol feedstock via chemical pretreatment, proximate analysis, and fermentable sugar quantification.",
    tags: ["Bioinformatics", "Research", "Bioethanol"],
    accent: "lime",
    category: "Research",
  },
  {
    title: "CJFoods",
    subtitle: "React.js Food Delivery App",
    description:
      "Frontend-only React.js SPA consuming the Swiggy API in real time. Displays live restaurant listings, menus, and filters with a responsive, performance-optimised UI.",
    link: "https://cj-foods.vercel.app/",
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
