import {
  SiPython, SiR, SiJavascript, SiTypescript,
  SiPandas, SiNumpy, SiScikitlearn, SiPytorch, SiTensorflow,
  SiReact, SiRedux, SiNextdotjs, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiFlask, SiFastapi, SiStreamlit, SiSocketdotio,
  SiMongodb, SiOracle, SiAmazondynamodb, SiRedis,
  SiGooglecloud, SiFirebase,
  SiGit, SiGithub, SiPostman, SiJupyter, SiAdobephotoshop, SiLinux, SiVim, SiArduino, SiMacos, SiN8N,
  SiLangchain, SiOpenai,
} from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaDatabase, FaNetworkWired, FaMicroscope, FaGlobe, FaAws, FaFlask, FaAtom, FaMicrochip, FaChartLine } from "react-icons/fa";
import { AiOutlineCloud } from "react-icons/ai";

export const skillCategories = [
  {
    name: "Programming Languages",
    color: "blue",
    skills: [
      { name: "Python",     Icon: SiPython     },
      { name: "R",          Icon: SiR          },
      { name: "SQL",        Icon: FaDatabase   },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "TypeScript", Icon: SiTypescript },
    ],
  },
  {
    name: "Data Science & ML",
    color: "purple",
    skills: [
      { name: "Pandas",      Icon: SiPandas      },
      { name: "NumPy",       Icon: SiNumpy       },
      { name: "Scikit-Learn",Icon: SiScikitlearn },
      { name: "PyTorch",     Icon: SiPytorch     },
      { name: "TensorFlow",  Icon: SiTensorflow  },
      { name: "SHAP",        Icon: FaChartLine   },
    ],
  },
  {
    name: "Frontend Development",
    color: "sky",
    skills: [
      { name: "React.js",    Icon: SiReact      },
      { name: "Next.js",     Icon: SiNextdotjs  },
      { name: "Redux",       Icon: SiRedux      },
      { name: "HTML5",       Icon: SiHtml5      },
      { name: "CSS3",        Icon: SiCss3       },
      { name: "Tailwind CSS",Icon: SiTailwindcss},
      { name: "Bootstrap",   Icon: SiBootstrap  },
    ],
  },
  {
    name: "Backend Development",
    color: "green",
    skills: [
      { name: "Node.js",    Icon: SiNodedotjs   },
      { name: "Express.js", Icon: SiExpress     },
      { name: "Flask",      Icon: SiFlask       },
      { name: "FastAPI",    Icon: SiFastapi     },
      { name: "Streamlit",  Icon: SiStreamlit   },
      { name: "Socket.IO",  Icon: SiSocketdotio },
      { name: "BullMQ",     Icon: FaNetworkWired},
    ],
  },
  {
    name: "Databases",
    color: "orange",
    skills: [
      { name: "MongoDB",    Icon: SiMongodb          },
      { name: "PostgreSQL", Icon: BiLogoPostgresql   },
      { name: "DynamoDB",   Icon: SiAmazondynamodb   },
      { name: "Oracle",     Icon: SiOracle           },
      { name: "Redis",      Icon: SiRedis            },
    ],
  },
  {
    name: "Cloud & DevOps",
    color: "amber",
    skills: [
      { name: "AWS",          Icon: FaAws          },
      { name: "Google Cloud", Icon: SiGooglecloud  },
      { name: "Firebase",     Icon: SiFirebase     },
      { name: "Cloud",        Icon: AiOutlineCloud },
    ],
  },
  {
    name: "AI & LLMs",
    color: "violet",
    skills: [
      { name: "GPT-4",      Icon: SiOpenai       },
      { name: "LangChain",  Icon: SiLangchain    },
      { name: "LangGraph",  Icon: FaNetworkWired },
      { name: "Groq",       Icon: FaMicrochip    },
      { name: "Agentic AI", Icon: FaNetworkWired },
    ],
  },
  {
    name: "Bioinformatics & Research",
    color: "pink",
    skills: [
      { name: "RDKit",      Icon: FaFlask        },
      { name: "Mordred",    Icon: FaAtom         },
      { name: "Glycomics",  Icon: FaMicroscope   },
      { name: "Cytoscape",  Icon: FaNetworkWired },
      { name: "Galaxy",     Icon: FaGlobe        },
    ],
  },
  {
    name: "Tools & Others",
    color: "slate",
    skills: [
      { name: "Git",        Icon: SiGit            },
      { name: "GitHub",     Icon: SiGithub         },
      { name: "n8n",        Icon: SiN8N            },
      { name: "Postman",    Icon: SiPostman        },
      { name: "Jupyter",    Icon: SiJupyter        },
      { name: "Linux",      Icon: SiLinux          },
      { name: "Vim",        Icon: SiVim            },
      { name: "Arduino",    Icon: SiArduino        },
      { name: "Photoshop",  Icon: SiAdobephotoshop },
      { name: "macOS",      Icon: SiMacos          },
    ],
  },
];

export const colorMap = {
  blue:   { header: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/40",     badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"     },
  purple: { header: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/40", badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
  sky:    { header: "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/40",           badge: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300"           },
  green:  { header: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/40", badge: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"   },
  orange: { header: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/40", badge: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" },
  amber:  { header: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40",  badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"   },
  violet: { header: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/40", badge: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300" },
  pink:   { header: "bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800/40",     badge: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"     },
  slate:  { header: "bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/40", badge: "bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300"  },
};
