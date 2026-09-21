export const caseStudies = {
  pocketpet: {
    title: "PocketPet", index: 9, label: "Desktop engineering + agentic AI",
    summary: "An animated desktop companion that combines native window interaction with a browser-task agent.",
    problem: "A desktop companion needs to feel present without blocking everyday work, while making an AI agent's actions visible and controllable.",
    role: "Development of the Tauri/Rust application, JavaScript pet behaviour and settings, native Windows integration, browser-task agent, and cross-platform packaging.",
    steps: ["Choose a pet and personalise its behaviour", "Give it a task and follow its browser progress", "Review approval requests and read the result"],
    architecture: ["Tauri 2 + Rust + plain JavaScript/SVG", "Win32 + UI Automation for Windows interaction", "Tokio + reqwest for streamed model calls", "Chrome DevTools Protocol + dedicated Chromium profile", "GitHub Actions platform builds and releases"],
    decisions: ["Report pet hit regions to Rust so the overlay can pass clicks through outside the pet without taking keyboard focus.", "Keep model calls and credential access in Rust; support Anthropic and OpenAI-compatible protocols, including local servers.", "Use a separate browser profile with code-level approval checks, secret-field refusal, spend limits, pause, and cancellation controls.", "Separate platform modules: native window tricks run on Windows while macOS and Linux retain companion and task features."],
    result: "Built a customisable companion with games, reminders, streamed browser tasks, follow-ups, scheduling, and release packaging for three desktop platforms.",
    caveat: "Window tricks are Windows-only. macOS uses one display; Linux click-through requires X11/XWayland. Sensitive-action detection is heuristic and cannot guarantee detection of every risky action.",
  },
  "pocketpet-web": {
    title: "PocketPet Website", index: 10, label: "Interactive frontend engineering",
    summary: "A hands-on pet demo and download site that connects the desktop experience to GitHub releases.",
    problem: "Visitors need to try the companion's personality, understand platform differences, and find the right installer without manually browsing release assets.",
    role: "React/TypeScript website development, shared pet state, sprite animation, GitHub release integration, responsive UI, and Vercel deployment configuration.",
    steps: ["Play with and personalise the demo pet", "Compare desktop platform capabilities", "Find a matching GitHub release download"],
    architecture: ["React 19 + TypeScript + Vite", "Tailwind CSS 4 + SVG/CSS animation", "React context + requestAnimationFrame", "GitHub repository and release APIs", "Static hosting on Vercel"],
    decisions: ["Reuse the desktop app's sprites and recolouring rules so the web demo reflects the product.", "Keep animation positions in mutable refs and update transforms directly, while React manages controls and shared appearance.", "Match release assets by platform suffix and fall back to GitHub Releases when an asset or API response is unavailable.", "Include keyboard actions, reduced-motion handling, persisted theme choice, and explicit platform capability comparisons."],
    result: "Delivered a static product site with an interactive demo, a scrolling pet companion, live repository data, release notes, and OS-aware download links.",
    caveat: "The website has no application backend. Its agent sequence is an illustrative demo; the actual browser-task agent runs in the desktop app. GitHub API limits or missing release assets can trigger fallback links.",
  },
  syncly: {
    title: "Syncly", index: 0, label: "Full-stack engineering",
    summary: "A developer network connecting swipe-based discovery, mutual matching, real-time conversation, and a personal portfolio.",
    problem: "Developers looking for mentors, learners, and collaborators need a low-friction way to discover relevant people and turn an introduction into a working relationship.",
    role: "Independent full-stack development across the React frontend, Express REST API, Socket.IO messaging, MongoDB data model, and AWS deployment.",
    steps: ["Discover developers with Vibe / Ghost swipes; the recipient answers Link or Noped", "Chat in real time once both sides Link, with persisted history", "Build a portfolio page without writing code"],
    architecture: ["React 19 + Redux Toolkit + Vite", "Node.js + Express 5 + Socket.IO", "MongoDB + Mongoose", "AWS EC2 + SES + node-cron"],
    decisions: ["Use REST for application data and Socket.IO for live chat, with rooms keyed by a hash of the sorted user pair.", "Store credentials and profile as separate documents; auth via an httpOnly, sameSite=Strict JWT cookie.", "Send an email on every swipe and a daily 08:00 reminder so pending Vibes surface outside the app."],
    result: "Delivered swipe matching, mutual Links, real-time chat, a no-code portfolio page, and email reminders in a deployed platform.",
    caveat: "Usage, latency, and conversion measurements are not published here.",
  },
  glycanbench: {
    title: "GlycanBench", index: 1, label: "AI + computational biology",
    summary: "A unified web server and Python package for creating, visualising, comparing, aligning, clustering, and modelling glycans.",
    problem: "Answering routine questions about a glycan meant stitching together glycowork, glypy, RDKit, BioPython, and databases such as GlyTouCan, KEGG, and PubMed. One interface and one API bring those workflows together.",
    role: "Developed under the guidance of Ashok Palaniappan at SASTRA University’s Systems Computational Biology Lab; full-stack build, ML integration, and the Python package.",
    steps: ["Create and visualise glycans in 2D (SNFG) and 3D (ETKDGv3 → MMFF94s conformers)", "Compare fingerprints, align with GLYSUM, cluster and detect outliers", "Predict immunogenicity with an MPNN and ask GlycomicsChat, which cites live PubMed, ArXiv, and GlyTouCan results"],
    architecture: ["React 19 + TypeScript + Vite", "FastAPI + Pydantic", "RDKit + glycowork + glypy + BioPython", "PyTorch Geometric MPNN", "Groq LLM + LangChain tools"],
    decisions: ["Keep scientific logic framework-free in core/ so the same code serves the API, the SDK, and the CLI.", "Surface unsupported conversion paths as explicit notices instead of silent failures.", "Route chat questions through an LLM tool selector with a keyword fallback so external tools degrade gracefully."],
    result: "Made glycan creation, visualisation, analysis, comparison, alignment, clustering, prediction, and literature chat available through one web server and one Python package, deployed at glycanbench.sastra.edu.",
    caveat: "Model evaluation metrics are not reproduced on this page; consult the project materials for methodology and limitations.",
  },
};

// Publish only real media and explicitly approved quotes. Empty sections stay hidden.
export const testimonials = [];
export const projectMedia = {
  syncly: { liveAvailable: false },
  glycanbench: { liveAvailable: false },
};

export const articles = [
  { slug: "rest-and-real-time", title: "Where REST ends and real-time messaging begins", project: "syncly", intro: "A technical note using Syncly’s published stack to explain complementary communication patterns.", sections: [
    ["Two different jobs", "Loading a profile is a request for a resource. A new chat message is an event that matters while another person is looking at a conversation. REST and Socket.IO serve these different needs in Syncly’s stack."],
    ["Delivery is only part of the problem", "Persistence, authorisation, reconnect behaviour, and duplicate handling need explicit design in a chat system. A live connection alone does not guarantee that a message has been stored or read. These are useful questions when evaluating messaging architecture."],
    ["Keep the user informed", "Interfaces should distinguish sending, failure, and confirmed delivery. An honest connection status and retry path help users recover when connectivity drops."],
  ]},
  { slug: "interpreting-research-models", title: "A prediction needs context", project: "glycanbench", intro: "A technical note on communicating model outputs in research software.", sections: [
    ["Start with the representation", "Molecular models depend on how structures are encoded. GlycanBench supports fingerprint comparison and an MPNN prediction workflow. Different representations expose different aspects of a structure; choosing a representation is part of the modelling question."],
    ["Explain the scope", "An explanation can help inspect an output, but it is not proof of causality or generalisation. Reports should make the dataset, evaluation split, and limitations clear before presenting a score as evidence."],
    ["Make exploration reproducible", "A useful research workflow records its input, parameters, and model version. A web interface and Python package can support both exploration and repeatable analysis."],
  ]},
];
