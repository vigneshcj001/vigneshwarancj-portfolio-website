export const caseStudies = {
  aiora: {
    title: "AIORA", index: 0, label: "Production platform engineering",
    summary: "A 13-microservice WhatsApp commerce platform connecting messaging, AI agents, booking, storefront, payments, shipping, document validation, onboarding, and operations.",
    problem: "Businesses needed one WhatsApp entry point for booking and shopping workflows while keeping client data, agent configuration, quotas, payments, shipping, and operational health isolated across tenants.",
    role: "Backend APIs, TypeScript messaging gateway, GPT-4o Vision document validation, Redis job orchestration, usage and subscription metering, Razorpay and Shiprocket integration, React/Next.js interfaces, n8n agent workflows, and Ubuntu/Railway deployment. Client names, credentials, traffic, revenue, and private implementation details are intentionally omitted.",
    steps: ["Receive WhatsApp message through a concurrent, rate-limited gateway", "Route customer to booking, storefront, document, or AI workflow", "Persist business state, queue work, call payment/logistics services, and return status updates"],
    architecture: ["WhatsApp gateway: Node.js + TypeScript + Puppeteer", "Routing and background work: Redis + BullMQ + Redis Streams + n8n", "Business APIs: Express + FastAPI + PostgreSQL", "Interfaces: React + Next.js", "Integrations: GPT-4o Vision + Razorpay + Shiprocket", "Runtime: Ubuntu VPS + Railway + PM2/systemd + nginx"],
    diagram: [
      { label: "WhatsApp", detail: "Customer messages" },
      { label: "Oblion Gateway", detail: "Sessions · limits · retries" },
      { label: "Agent Router", detail: "Redis · BullMQ · n8n" },
      { label: "Business Services", detail: "Booking · store · OCR · usage" },
      { label: "External Systems", detail: "Razorpay · Shiprocket · AI" },
    ],
    decisions: ["Use HMAC-SHA256 signatures on inbound webhooks so downstream services can verify message origin.", "Encrypt tenant integration credentials with AES-256-GCM before storage.", "Queue outbound messages with retry and dead-letter handling to isolate provider or session failures.", "Track token use, quotas, subscription limits, and low-balance notifications in PostgreSQL and Redis.", "Split SIT and production services behind nginx with isolated process supervision and data stores."],
    result: "Delivered one operational platform covering messaging, conversational AI, bookings, commerce, document checks, payments, logistics, onboarding, monitoring, and deployment across 13 services.",
    metrics: [{ label: "13", value: "microservices" }, { label: "HMAC-SHA256", value: "webhook verification" }, { label: "AES-256-GCM", value: "credential encryption" }, { label: "SIT + production", value: "deployment environments" }],
    caveat: "Case study documents architecture and personal contribution without publishing employer source code, customer data, credentials, usage, revenue, or infrastructure identifiers.",
  },
  pocketpet: {
    title: "PocketPet", index: 1, label: "Desktop engineering + agentic AI",
    summary: "One product combining an animated desktop companion, a guarded browser-task agent, and the website where users try it and download the application.",
    problem: "A desktop companion needs to feel present without blocking everyday work, make its AI agent's actions visible and controllable, and give visitors a clear way to understand platform support and download the correct installer.",
    role: "End-to-end development of the Tauri/Rust application, JavaScript pet behaviour, native Windows integration, browser-task agent, React/TypeScript product website, GitHub release integration, and cross-platform packaging.",
    steps: ["Try and personalise the pet on the website", "Download the correct build for the visitor's operating system", "Run desktop companion or browser tasks with approval controls"],
    architecture: ["Tauri 2 + Rust + plain JavaScript/SVG desktop app", "React 19 + TypeScript + Vite download website", "Win32 + UI Automation for Windows interaction", "Tokio + reqwest + Chrome DevTools Protocol for agent tasks", "GitHub Actions, Releases API, and Vercel"],
    decisions: ["Reuse the desktop app's sprites and recolouring rules on the website so the demo represents the downloaded product.", "Report pet hit regions to Rust so the overlay can pass clicks through outside the pet without taking keyboard focus.", "Keep model calls and credential access in Rust and use a separate browser profile with code-level approval checks, secret-field refusal, spend limits, pause, and cancellation controls.", "Match website download buttons to GitHub release assets by platform, with a release-page fallback when the API or an asset is unavailable."],
    result: "Delivered PocketPet as one product: a customisable cross-platform companion with games, reminders and guarded browser tasks, plus an interactive website that explains, demonstrates, and distributes the application.",
    metrics: [{ label: "4", value: "animated pets" }, { label: "3", value: "desktop platforms" }, { label: "CDP", value: "browser control" }, { label: "Human approval", value: "sensitive actions" }],
    caveat: "Window tricks are Windows-only. macOS uses one display; Linux click-through requires X11/XWayland. Sensitive-action detection is heuristic, and website downloads fall back to the GitHub Releases page when direct asset discovery is unavailable.",
  },
  syncly: {
    title: "Syncly", index: 3, label: "Full-stack engineering",
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
    title: "GlycanBench", index: 2, label: "AI + computational biology",
    summary: "A unified web server and Python package for creating, visualising, comparing, aligning, clustering, and modelling glycans.",
    problem: "Answering routine questions about a glycan meant stitching together glycowork, glypy, RDKit, BioPython, and databases such as GlyTouCan, KEGG, and PubMed. One interface and one API bring those workflows together.",
    role: "Developed under the guidance of Ashok Palaniappan at SASTRA University’s Systems Computational Biology Lab; full-stack build, ML integration, and the Python package.",
    steps: ["Create and visualise glycans in 2D (SNFG) and 3D (ETKDGv3 → MMFF94s conformers)", "Compare fingerprints, align with GLYSUM, cluster and detect outliers", "Predict immunogenicity with an MPNN and ask GlycomicsChat, which cites live PubMed, ArXiv, and GlyTouCan results"],
    architecture: ["React 19 + TypeScript + Vite", "FastAPI + Pydantic", "RDKit + glycowork + glypy + BioPython", "PyTorch Geometric MPNN", "Groq LLM + LangChain tools"],
    decisions: ["Curate 1,344 glycans and correct 12 contradictory labels found across two source datasets before model training.", "Keep scientific logic framework-free in core/ so the same code serves the API, SDK, CLI, and FastAPI server.", "Generate conformers on demand with ETKDGv3, MMFF94s, and UFF fallback instead of storing a fixed 3D library.", "Surface unsupported conversion paths as explicit notices instead of silent failures.", "Route chat questions through an LLM tool selector with a keyword fallback so external tools degrade gracefully."],
    diagram: [{ label: "Glycan input", detail: "Sequence · builder · conversion" }, { label: "Scientific core", detail: "RDKit · glycowork · glypy" }, { label: "Analysis", detail: "Descriptors · GLYSUM · clustering" }, { label: "MPNN", detail: "1,344 curated glycans" }, { label: "Delivery", detail: "Web · SDK · CLI · API" }],
    result: "Delivered 20 glycoinformatics tools through one web server and Python package, deployed at glycanbench.sastra.edu with SDK, CLI, server, tests, and notebooks.",
    metrics: [{ label: "20", value: "scientific tools" }, { label: "1,344", value: "curated glycans" }, { label: "12", value: "labels corrected" }, { label: "4", value: "delivery modes" }],
    pypi: "https://pypi.org/project/glycanbench/",
    doi: "https://doi.org/10.5281/zenodo.22756268",
    install: "pip install glycanbench",
    limitations: ["Predictions apply to represented glycan chemistry and training labels; confidence does not establish biological causality.", "Contradictory source labels were corrected during curation, but remaining annotation bias can affect generalisation.", "External literature and registry tools depend on PubMed, ArXiv, GlyTouCan, and network availability.", "Generated conformers are computational candidates, not experimental structures."],
    validation: "Model workflow documents curated labels, graph representation, held-out evaluation, confidence output, and motif-based flags. Publication and repository remain authoritative sources for exact protocol and results.",
    caveat: "Research software supports exploration and reproducible analysis; outputs require domain review before biological or clinical interpretation.",
  },
};

// Publish only real media and explicitly approved quotes. Empty sections stay hidden.
export const testimonials = [];
export const projectMedia = {
  syncly: { liveAvailable: false },
};

export const articles = [
  { slug: "aiora-routing", title: "Routing one WhatsApp number across many business workflows", project: "aiora", intro: "Architecture notes on tenant isolation, message routing, queues, agent state, and integration boundaries.", sections: [
    ["Start at the boundary", "Gateway owns WhatsApp sessions, rate limits, retries, and signed delivery into platform. Downstream services should not need browser-session knowledge."],
    ["Route with explicit state", "Redis-backed routing keeps active agent selection and conversation state separate by tenant and customer. Booking, storefront, document, and AI workflows receive only context they need."],
    ["Treat integrations as failure domains", "Payments, shipping, OCR, model calls, and outbound messages fail differently. Queues, idempotency keys, deduplicated webhooks, retries, and dead-letter handling keep one provider failure from corrupting another workflow."],
  ]},
  { slug: "pocketpet-safety", title: "Guardrails for a desktop browser-task agent", project: "pocketpet", intro: "How visible progress, approval checks, secret-field refusal, spend limits, pause, and cancellation shape safer automation.", sections: [
    ["Keep control visible", "Every browser task streams progress and keeps pause or cancellation available. User sees proposed action before agent crosses sensitive boundary."],
    ["Approvals belong in code", "Prompt instructions help behaviour, but sensitive actions need deterministic checks around credentials, payments, submissions, and other irreversible operations."],
    ["Isolate browsing state", "Dedicated Chromium profile separates agent browsing from everyday profile data and makes permissions, storage, and cleanup easier to reason about."],
  ]},
  { slug: "glycanbench-mpnn", title: "Building a reproducible glycan MPNN workflow", project: "glycanbench", intro: "Dataset curation, graph representation, validation, model limits, and delivery through web and Python interfaces.", sections: [
    ["Curate before training", "GlycanBench uses 1,344 curated glycans after correcting 12 contradictory labels across two datasets. Label review is part of model development, not a cleanup step after evaluation."],
    ["Representation shapes prediction", "Glycan graph representation determines which residues, linkages, and neighbourhood patterns model can learn. Motif flags add domain-readable context without claiming causal explanation."],
    ["Ship same logic everywhere", "Shared scientific core powers web interface, SDK, CLI, and FastAPI server. Tests and notebooks make exploration easier to repeat outside deployed interface."],
  ]},
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
