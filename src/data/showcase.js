export const caseStudies = {
  pocketpet: {
    title: "PocketPet", index: 9, label: "Desktop engineering + agentic AI",
    summary: "One product combining an animated desktop companion, a guarded browser-task agent, and the website where users try it and download the application.",
    problem: "A desktop companion needs to feel present without blocking everyday work, make its AI agent's actions visible and controllable, and give visitors a clear way to understand platform support and download the correct installer.",
    role: "End-to-end development of the Tauri/Rust application, JavaScript pet behaviour, native Windows integration, browser-task agent, React/TypeScript product website, GitHub release integration, and cross-platform packaging.",
    steps: ["Try and personalise the pet on the website", "Download the correct build for the visitor's operating system", "Run desktop companion or browser tasks with approval controls"],
    architecture: ["Tauri 2 + Rust + plain JavaScript/SVG desktop app", "React 19 + TypeScript + Vite download website", "Win32 + UI Automation for Windows interaction", "Tokio + reqwest + Chrome DevTools Protocol for agent tasks", "GitHub Actions, Releases API, and Vercel"],
    decisions: ["Reuse the desktop app's sprites and recolouring rules on the website so the demo represents the downloaded product.", "Report pet hit regions to Rust so the overlay can pass clicks through outside the pet without taking keyboard focus.", "Keep model calls and credential access in Rust and use a separate browser profile with code-level approval checks, secret-field refusal, spend limits, pause, and cancellation controls.", "Match website download buttons to GitHub release assets by platform, with a release-page fallback when the API or an asset is unavailable."],
    result: "Delivered PocketPet as one product: a customisable cross-platform companion with games, reminders and guarded browser tasks, plus an interactive website that explains, demonstrates, and distributes the application.",
    caveat: "Window tricks are Windows-only. macOS uses one display; Linux click-through requires X11/XWayland. Sensitive-action detection is heuristic, and website downloads fall back to the GitHub Releases page when direct asset discovery is unavailable.",
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
