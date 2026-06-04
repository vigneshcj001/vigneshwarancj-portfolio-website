import { FaUniversity, FaGraduationCap } from "react-icons/fa";

export const education = [
  {
    degree: "Master of Technology in Big Data Biology",
    institution: "SASTRA Deemed University",
    location: "Thanjavur, Tamil Nadu, India",
    period: "Aug 2023 – Jun 2025",
    percentage: "79.67%",
    Icon: FaGraduationCap,
    accent: "blue",
  },
  {
    degree: "Bachelor of Technology",
    institution: "Prathyusha Engineering College",
    location: "Tiruvallur, Tamil Nadu, India",
    period: "Aug 2019 – Apr 2023",
    percentage: "84.4%",
    Icon: FaUniversity,
    accent: "emerald",
  },
];

export const certifications = [
  {
    title: "Namaste ReactJS",
    issuer: "NamasteDev · Akshay Saini",
    accent: "cyan",
    topics: [
      "React Hooks", "State Management", "Config Driven UI", "Redux",
      "Reusable Components", "Props & State", "Class & Functional Components",
      "React Router", "Code Splitting", "HOCs", "Custom Hooks",
      "Tailwind CSS", "Jest", "React Testing Library", "Bundlers & Babel",
      "Optimizations", "Interview Prep",
    ],
    imageKey: "react",
  },
  {
    title: "Namaste Node.js",
    issuer: "NamasteDev · Akshay Saini",
    accent: "green",
    topics: [
      "Event Loop", "libuv", "V8 Engine", "Async Programming", "Modules",
      "REST APIs", "Express.js", "MongoDB & Mongoose", "JWT",
      "Security Best Practices", "Error Handling", "WebSockets",
      "AWS Deployment", "Nginx", "Scaling & Performance",
    ],
    imageKey: "node",
  },
];

export const accentMap = {
  blue: {
    icon:   "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    badge:  "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800/50",
    tag:    "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40",
  },
  emerald: {
    icon:   "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    badge:  "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800/50",
    tag:    "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40",
  },
  cyan: {
    icon:   "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
    badge:  "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-200 dark:border-cyan-800/50",
    tag:    "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/40",
  },
  green: {
    icon:   "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    badge:  "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800/50",
    tag:    "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/40",
  },
};

export const researchInterests = [
  "Graph Neural Networks",
  "Computational Glycobiology",
  "Agentic AI Systems",
  "Drug Discovery ML",
];
