const projectCatalog = [
  {
    title: "AIORA",
    subtitle: "Multi-Tenant WhatsApp Commerce Platform · Ceiyone Tech Works",
    description:
      "Production platform spanning 13 microservices for WhatsApp messaging, bookings, storefronts, document validation, payments, logistics, AI conversations, usage metering, onboarding, and operations. Built across Node.js, TypeScript, Python, React, Next.js, PostgreSQL, Redis, BullMQ, n8n, Razorpay, Shiprocket, and GPT-4o Vision, then deployed to Ubuntu VPS and Railway environments.",
    link: null,
    github: null,
    tags: ["Node.js", "TypeScript", "FastAPI", "React.js", "PostgreSQL", "Redis", "BullMQ", "n8n", "Razorpay", "Shiprocket", "GPT-4o Vision", "Docker"],
    accent: "indigo",
    category: "Full-Stack",
  },
  {
    title: "Syncly",
    subtitle: "Developer Networking Platform",
    description:
      "Developer-to-developer networking platform built solo end to end. Members pick a mentorship role (mentor, learner, both) and swipe a paginated feed of developers they have not met — Vibe to connect, Ghost to pass; the recipient replies Link or Noped, and a mutual Link unlocks real-time 1:1 chat over Socket.IO with persisted history. Every member gets a shareable portfolio page at their profile slug (projects, experience, education, certifications, theme, SEO, visibility). httpOnly JWT cookie auth with bcrypt, AWS SES email on every swipe, and a daily 08:00 node-cron reminder for pending Vibes. Loop: Discover → Vibe → Link → Chat → Showcase.",
    link: "https://syncly.co.in",
    github: "https://github.com/vigneshcj001/Syncly_fronend",
    githubBackend: null, // backend repository is private
    tags: ["React.js", "Vite", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Mongoose", "Socket.IO", "JWT", "AWS SES", "AWS EC2", "Tailwind CSS"],
    accent: "teal",
    category: "Full-Stack",
  },
  {
    title: "GlycanBench: a unified resource for working with glycans",
    subtitle: "Glycoinformatics Web Server + Python Package · SASTRA University",
    description:
      "Full-stack glycoinformatics platform and installable Python package with 20 tools behind one React 19 UI and FastAPI API. Its PyTorch Geometric MPNN uses 1,344 curated glycans after correcting 12 contradictory labels across two datasets. Workflows cover SNFG 2D and on-demand 3D conformers, Cytoscape biosynthetic networks, format conversion, descriptors, fingerprints, motif mutation, GLYSUM Needleman-Wunsch alignment, clustering, immunogenicity prediction, and GlycomicsChat with PubMed, ArXiv, and GlyTouCan tools. Developed with Ashok Palaniappan at SASTRA's Systems Computational Biology Lab; available as web app, Python SDK, CLI, and server.",
    link: "https://glycanbench.sastra.edu/",
    github: "https://github.com/APalaniaLab/GlycanBench",
    pypi: "https://pypi.org/project/glycanbench/",
    doi: "https://doi.org/10.5281/zenodo.22756268",
    tags: ["Python", "FastAPI", "React.js", "TypeScript", "PyTorch", "PyTorch Geometric", "MPNN", "RDKit", "glycowork", "LangChain", "Groq", "Tailwind CSS"],
    accent: "blue",
    category: "AI/Research",
  },
  {
    title: "Explainable Machine Learning-Based Approach to Developing Potent EGFR Inhibitors for Ovarian Cancer",
    subtitle: "M.Tech Thesis · Explainable AI · Drug Discovery",
    description:
      "M.Tech thesis developing an explainable ML framework to identify potent EGFR inhibitors for ovarian cancer. 310 compounds from ChEMBL encoded with more than 1,800 RDKit and Mordred descriptors, then reduced through LASSO selection. Six classifiers were tuned with GridSearchCV and four-fold cross-validation. Random Forest reached 93% accuracy; tuned Gradient Boosting reached 98.28%. SHAP force and waterfall plots explained activity-driving descriptors.",
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
      "Developed QSPR models for Posaconazole solubility in Self-Emulsifying Drug Delivery Systems at Manipal Institute of Technology under Dr. Neha Sureshchandra Gandhi. Generated molecular descriptors with RDKit, reduced multicollinearity through VIF analysis, and compared regression models. Reported model performance reached R²=0.926.",
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
  {
    title: "PocketPet",
    subtitle: "Desktop Companion, AI Browser Agent + Download Website",
    description:
      "One cross-platform product comprising a Tauri 2/Rust desktop companion and its React/TypeScript download website. Four animated pets follow the cursor, play fetch, support custom appearances, and offer break reminders. A Rust task agent searches the web, reads pages, and drives a dedicated Chromium profile through the Chrome DevTools Protocol, with streamed progress, follow-ups, scheduled tasks, approval gates, and spend limits. The website reuses the app's sprites as an interactive demo, explains platform support, reads GitHub Releases, and directs each visitor to the correct Windows, macOS, or Linux download. Windows adds titlebar perching and caption-button actions through Win32 and UI Automation; macOS and Linux have a reduced feature set.",
    link: "https://pocketpet-web.vercel.app/",
    github: "https://github.com/vigneshcj001/Pocketpet",
    githubWebsite: "https://github.com/vigneshcj001/Pocketpet-web",
    tags: ["Rust", "Tauri", "JavaScript", "React.js", "TypeScript", "Tokio", "Win32", "Chrome DevTools Protocol", "Agentic AI", "GitHub API", "GitHub Actions", "Vercel"],
    accent: "violet",
    category: "Desktop/AI",
  },
];

const projectMeta = {
  "AIORA": { date: "2025–Present", status: "Production", sourceAvailability: "Private", contribution: "Backend APIs, messaging gateway, AI/OCR workflows, commerce integrations, cloud deployment, and platform operations." },
  "PocketPet": { date: "2026", status: "Maintained", sourceAvailability: "Public", contribution: "Independent end-to-end product engineering across desktop, native Windows integration, browser automation, and download website." },
  "GlycanBench: a unified resource for working with glycans": { date: "2025–2026", status: "Research", sourceAvailability: "Public", contribution: "Full-stack development, ML integration, glycoinformatics pipelines, package SDK/CLI, tests, and deployment." },
  "Syncly": { date: "2025", status: "Live", sourceAvailability: "Frontend public · Backend private", contribution: "Independent MERN development, real-time messaging, AWS deployment, email automation, and portfolio builder." },
  "Explainable Machine Learning-Based Approach to Developing Potent EGFR Inhibitors for Ovarian Cancer": { date: "2025", status: "Research", sourceAvailability: "Private", contribution: "Data preparation, descriptor generation, feature selection, model tuning, validation, and SHAP analysis." },
  "Prediction of lignocellulosic components and fermentable sugars for bioethanol production by machine learning approach": { date: "2024", status: "Research", sourceAvailability: "Private", contribution: "Experimental data preparation, model comparison, evaluation, and web database development." },
  "QSPR for Posaconazole SEDDS": { date: "2024", status: "Research", sourceAvailability: "Private", contribution: "Descriptor generation, VIF analysis, regression modelling, and result interpretation." },
  "Suitability Studies Of Fruits Of West Indian elm Plant (Guazuma ulmifolia) As Feedstock For Biofuel production": { date: "2023", status: "Completed", sourceAvailability: "Private", contribution: "Experimental design, extraction, confirmatory assays, hydrolysis, and research reporting." },
  "CJFoods": { date: "2023", status: "Archived", sourceAvailability: "Public", contribution: "Independent frontend development and responsive API-driven interface." },
  "TinDog": { date: "2023", status: "Archived", sourceAvailability: "Public", contribution: "Independent responsive landing-page development." },
  "CJBoT — Cookie": { date: "2023", status: "Completed", sourceAvailability: "Demo", contribution: "Robot assembly, Arduino programming, sensors, and motion behaviour." },
};

const priority = [
  "AIORA",
  "PocketPet",
  "GlycanBench: a unified resource for working with glycans",
  "Syncly",
];

export const projects = [...projectCatalog]
  .sort((a, b) => {
    const ai = priority.indexOf(a.title);
    const bi = priority.indexOf(b.title);
    return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
  })
  .map((project) => ({ ...project, ...projectMeta[project.title] }));

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
  indigo: "from-indigo-500/15 to-indigo-600/5 border-indigo-500/20 hover:border-indigo-400/50",
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
  indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
};

export const categoryFilters = ["All", "AI", "Full-Stack", "Research", "Desktop", "Cloud", "Frontend", "Hardware"];
