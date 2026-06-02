import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";

const SKILL_BUBBLES = [
  { name: "Python",       abbr: "PY", cat: "Language" },
  { name: "JavaScript",  abbr: "JS", cat: "Language"  },
  { name: "R",            abbr: "R",  cat: "Language"  },
  { name: "C++",          abbr: "C+", cat: "Language"  },
  { name: "SQL",          abbr: "SQ", cat: "Database"  },
  { name: "React.js",     abbr: "RE", cat: "Frontend"  },
  { name: "Redux",        abbr: "RX", cat: "Frontend"  },
  { name: "HTML5",        abbr: "HT", cat: "Frontend"  },
  { name: "CSS3",         abbr: "CS", cat: "Frontend"  },
  { name: "Tailwind CSS", abbr: "TW", cat: "Frontend"  },
  { name: "Bootstrap",    abbr: "BS", cat: "Frontend"  },
  { name: "Node.js",      abbr: "NO", cat: "Backend"   },
  { name: "Express.js",   abbr: "EX", cat: "Backend"   },
  { name: "Flask",        abbr: "FL", cat: "Backend"   },
  { name: "FastAPI",      abbr: "FA", cat: "Backend"   },
  { name: "PyTorch",      abbr: "PT", cat: "ML/AI"     },
  { name: "TensorFlow",   abbr: "TF", cat: "ML/AI"     },
  { name: "Scikit-Learn", abbr: "SL", cat: "ML/AI"     },
  { name: "Pandas",       abbr: "PA", cat: "ML/AI"     },
  { name: "NumPy",        abbr: "NU", cat: "ML/AI"     },
  { name: "GNN",          abbr: "GN", cat: "ML/AI"     },
  { name: "LangChain",    abbr: "LC", cat: "AI/LLM"    },
  { name: "LangGraph",    abbr: "LG", cat: "AI/LLM"    },
  { name: "Agentic AI",   abbr: "AA", cat: "AI/LLM"    },
  { name: "GPT-4",        abbr: "GP", cat: "AI/LLM"    },
  { name: "NLP",          abbr: "NL", cat: "AI/LLM"    },
  { name: "MongoDB",      abbr: "MO", cat: "Database"   },
  { name: "PostgreSQL",   abbr: "PG", cat: "Database"   },
  { name: "Oracle",       abbr: "OR", cat: "Database"   },
  { name: "AWS",          abbr: "AW", cat: "Cloud"      },
  { name: "Google Cloud", abbr: "GC", cat: "Cloud"      },
  { name: "Firebase",     abbr: "FB", cat: "Cloud"      },
  { name: "Git",          abbr: "GI", cat: "Tools"      },
  { name: "GitHub",       abbr: "GH", cat: "Tools"      },
  { name: "Postman",      abbr: "PO", cat: "Tools"      },
  { name: "Jupyter",      abbr: "JU", cat: "Tools"      },
  { name: "Linux",        abbr: "LX", cat: "Tools"      },
  { name: "Vim",          abbr: "VI", cat: "Tools"      },
  { name: "Arduino",      abbr: "AR", cat: "Tools"      },
  { name: "macOS",        abbr: "MA", cat: "Tools"      },
  { name: "Glycomics",    abbr: "GL", cat: "Research"   },
  { name: "Galaxy",       abbr: "GA", cat: "Research"   },
  { name: "Cytoscape",    abbr: "CY", cat: "Research"   },
  { name: "Photoshop",    abbr: "PS", cat: "Tools"      },
];

const CAT_COLORS = {
  Language: { bg: "from-blue-600 to-indigo-900",  label: "text-blue-300"    },
  Frontend: { bg: "from-sky-500 to-blue-800",      label: "text-sky-300"     },
  Backend:  { bg: "from-emerald-600 to-green-900", label: "text-emerald-300" },
  "ML/AI":  { bg: "from-violet-600 to-purple-900", label: "text-violet-300"  },
  "AI/LLM": { bg: "from-fuchsia-600 to-pink-900",  label: "text-fuchsia-300" },
  Database: { bg: "from-orange-500 to-amber-900",  label: "text-orange-300"  },
  Cloud:    { bg: "from-teal-500 to-cyan-900",      label: "text-teal-300"    },
  Research: { bg: "from-rose-600 to-pink-900",      label: "text-rose-300"    },
  Tools:    { bg: "from-slate-500 to-gray-800",     label: "text-slate-300"   },
};

const SKILLS_MARQUEE = [
  "Python", "React.js", "Node.js", "FastAPI", "PyTorch", "TensorFlow",
  "LangChain", "MongoDB", "AWS", "PostgreSQL", "Scikit-Learn", "NLP",
  "Agentic AI", "LangGraph", "GNN", "Glycomics", "SQL", "Flask",
];

const STATS = [
  { label: "Projects",       value: "9+"  },
  { label: "Skills",         value: "40+" },
  { label: "Research Areas", value: "2"   },
];

// Deterministic positions so bubbles don't jump on re-render
function seededLCG(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

const BUBBLE_DATA = SKILL_BUBBLES.map((skill, i) => {
  const rand = seededLCG(i * 137 + 31);
  return {
    ...skill,
    x:     rand() * 86 + 4,              // 4–90 %
    y:     rand() * 58 + 20,             // 20–78 % (keeps tooltips inside viewport)
    size:  Math.round(rand() * 22 + 36), // 36–58 px
    dur:   rand() * 10 + 8,              // 8–18 s float cycle
    phase: rand() * 12,                  // stagger start offset
    dy:    (rand() - 0.5) * 24,
    dx:    (rand() - 0.5) * 16,
  };
});

function SkillBubble({ data }) {
  const c = CAT_COLORS[data.cat] || CAT_COLORS.Tools;
  const showBelow = data.y < 28;

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ left: `${data.x}%`, top: `${data.y}%` }}
      animate={{ y: [0, data.dy, 0], x: [0, data.dx, 0] }}
      transition={{
        duration: data.dur,
        repeat:   Infinity,
        ease:     "easeInOut",
        delay:    data.phase,
        times:    [0, 0.5, 1],
      }}
      whileHover={{ scale: 1.45, zIndex: 20 }}
      aria-label={`${data.name} — ${data.cat}`}
    >
      {/* Sphere */}
      <div
        style={{ width: data.size, height: data.size }}
        className={`rounded-full bg-linear-to-br ${c.bg} flex items-center justify-center shadow-md group-hover:ring-2 group-hover:ring-white/40 group-hover:shadow-xl transition-all duration-200`}
      >
        <span
          className="text-white font-bold select-none leading-none"
          style={{ fontSize: Math.max(9, data.size * 0.27) }}
        >
          {data.abbr}
        </span>
      </div>

      {/* Tooltip */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap ${
          showBelow ? "top-full mt-2" : "bottom-full mb-2"
        }`}
      >
        <div className="bg-gray-950/95 backdrop-blur-sm border border-white/10 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl">
          <div className="font-semibold">{data.name}</div>
          <div className={`text-[10px] mt-0.5 ${c.label}`}>{data.cat}</div>
        </div>
      </div>
    </motion.div>
  );
}

const Home = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#060610] text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-950/60 via-[#060610] to-purple-950/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(99,102,241,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[60px_60px]" />

      {/* Floating skill bubbles — no z-index on container so hovered children can rise above hero */}
      <div className="absolute inset-0">
        {BUBBLE_DATA.map((b) => (
          <SkillBubble key={b.name} data={b} />
        ))}
      </div>

      {/* Center vignette — fades bubbles behind hero text so it stays readable */}
      <div className="absolute inset-0 z-3 pointer-events-none bg-[radial-gradient(ellipse_44%_52%_at_50%_50%,rgba(6,6,16,0.82)_0%,rgba(6,6,16,0.35)_55%,transparent_100%)]" />

      {/* Hero — container pointer-events-none; CTAs restore them */}
      <div className="relative z-4 text-center px-6 max-w-4xl w-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Open to opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-4 leading-tight tracking-tight"
        >
          Vigneshwaran{" "}
          <span className="bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            C. J.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-10 h-8 font-light"
        >
          <span className="text-gray-200 font-medium">
            <Typewriter
              words={[
                "AI / ML Engineer",
                "Full-Stack Developer",
                "Bioinformatics Researcher",
                "Glycomics Scientist",
                "Agentic AI Builder",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={55}
              deleteSpeed={35}
              delaySpeed={1800}
            />
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
        >
          <Link
            to="/projects"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm hover:bg-white/5 hover:scale-105"
          >
            Get in Touch
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-20 flex justify-center gap-12 border-t border-white/8 pt-10"
        >
          {STATS.map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black text-white">{value}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Skills marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 py-3 border-t border-white/5 overflow-hidden z-5 pointer-events-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 w-max"
        >
          {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((skill, i) => (
            <span
              key={i}
              className="text-xs text-gray-600 font-medium uppercase tracking-widest whitespace-nowrap"
            >
              {skill}
              <span className="ml-10 text-blue-900">◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
