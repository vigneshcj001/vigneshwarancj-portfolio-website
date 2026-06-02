import { FaUniversity, FaGraduationCap } from "react-icons/fa";

export const education = [
  {
    degree: "Master of Technology in Big Data Biology",
    institution: "SASTRA Deemed University",
    location: "Thanjavur, Tamil Nadu, India",
    period: "Aug 2023 – Present",
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

export const accentMap = {
  blue: {
    icon:   "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    badge:  "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800/50",
  },
  emerald: {
    icon:   "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    badge:  "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800/50",
  },
};

export const researchInterests = [
  "Graph Neural Networks",
  "Computational Glycobiology",
  "Agentic AI Systems",
  "Drug Discovery ML",
];
