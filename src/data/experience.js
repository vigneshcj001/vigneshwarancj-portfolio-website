export const roles = [
  {
    id: "jsd",
    title: "Junior Software Developer",
    company: "Ceiyone Tech Works Pvt. Ltd.",
    period: "Dec 2025 – Present",
    type: "Full-time",
    accent: "blue",
    overview:
      "Designing, developing, and maintaining enterprise-grade applications and AI-powered platforms — including AIORA, a multi-tenant WhatsApp business platform (bookings, storefronts, and n8n-driven AI conversations). Work spans backend APIs, WhatsApp automation, cloud deployments, AI/LLM integration, and internal monitoring systems. Also mentoring 2 engineering interns on the AIORA platform.",
    projects: [
      {
        name: "Bullion Handler",
        subtitle: "AI Document Processing Platform",
        description:
          "Core platform for document ingestion, OCR extraction, AI analysis, validation, report generation, and OpenAI token usage tracking.",
        tech: ["Python", "FastAPI", "PostgreSQL", "OpenAI"],
        accent: "teal",
      },
      {
        name: "Bullion Listener",
        subtitle: "Event-Driven Processing Service",
        description:
          "Event listener service that monitors incoming events, validates payloads, and triggers downstream Bullion Handler processing pipelines asynchronously.",
        tech: ["Python", "FastAPI", "PostgreSQL"],
        accent: "sky",
      },
      {
        name: "Splendor",
        subtitle: "OpenAI Token & Subscription Monitor",
        description:
          "Centralized platform tracking prompt/completion/total token usage per model and API key, managing subscription quotas, and sending WhatsApp alert notifications.",
        tech: ["Python", "FastAPI", "PostgreSQL", "WhatsApp API"],
        accent: "violet",
      },
      {
        name: "Oblion",
        subtitle: "WhatsApp Auth & Session Manager",
        description:
          "Multi-number WhatsApp gateway — one whatsapp-web.js session per business number, BullMQ-queued outbound sends with retries and a dead-letter queue, and HMAC-signed inbound webhooks feeding n8n.",
        tech: ["TypeScript", "Node.js", "Express.js", "BullMQ", "Redis", "PostgreSQL", "WhatsApp Web API", "n8n"],
        accent: "green",
      },
      {
        name: "meridian-api",
        subtitle: "AIORA Booking & Platform Backend",
        description:
          "Shared service layer every AIORA WhatsApp conversation runs through — slot availability, bookings, operator-authored intake questions, per-agent bot configuration, broadcast campaigns, document ingest, and the single outbound /send endpoint that formats every WhatsApp reply.",
        tech: ["Node.js", "Express.js", "PostgreSQL", "Joi", "Winston"],
        accent: "blue",
      },
      {
        name: "Meridian",
        subtitle: "Customer Booking Site (+ Healthora integration)",
        description:
          "Customer-facing appointment booking page — pre-filled from WhatsApp, backed by meridian-api for slots and intake questions. Recently integrated Healthora's dietician-appointment booking flow into Meridian, consolidating both products onto one booking experience.",
        tech: ["React 19", "Vite", "Tailwind CSS"],
        accent: "indigo",
      },
      {
        name: "polaris-ui",
        subtitle: "AIORA Operator Dashboard",
        description:
          "Business-owner dashboard for bookings, orders, inventory, bot settings, document uploads, broadcast campaigns, and WhatsApp session status — fans out to meridian-api, Oblion, and ecomm-api, proxying e-commerce calls server-side so the API key never reaches the browser.",
        tech: ["React 19", "Vite", "Tailwind CSS", "Node.js"],
        accent: "pink",
      },
      {
        name: "AIORA E-Commerce",
        subtitle: "Multi-Store WhatsApp Commerce Platform",
        description:
          "Next.js storefront platform where several shops can share one WhatsApp number — catalogue, orders with idempotency keys, storefront config, and a customer directory upserted from inbound WhatsApp messages, with order confirmations dispatched via Oblion.",
        tech: ["Next.js", "React", "TypeScript", "PostgreSQL"],
        accent: "slate",
      },
      {
        name: "Client Onboarding Portal",
        subtitle: "Internal Client & Agent Provisioning Tool",
        description:
          "Operator tool that provisions a client and all of its WhatsApp agents (booking, storefront, or both) in a single all-or-nothing transaction — client, agents, subscription limits, WhatsApp status, intake questions, and seeded slots either all land or none do.",
        tech: ["React", "Vite", "Node.js", "Express.js", "PostgreSQL", "Zod"],
        accent: "teal",
      },
      {
        name: "AIORA Agent Router (n8n)",
        subtitle: "Multi-Agent WhatsApp Conversation Orchestration",
        description:
          "n8n-driven conversation layer letting one WhatsApp number serve multiple bots — a Redis-backed router greets the customer, offers a menu when a business runs more than one bot, and hands off to AI-agent workflows (OpenAI chat model, per-agent Redis memory) that run the booking or shopping conversation end to end.",
        tech: ["n8n", "OpenAI", "Redis", "WhatsApp"],
        accent: "violet",
      },
      {
        name: "Orbit",
        subtitle: "Centralized Service Health Monitor",
        description:
          "Internal monitoring and management dashboard aggregating health checks, system diagnostics, API status, and incident detection across all services.",
        tech: ["Python", "FastAPI", "ReactJS"],
        accent: "orange",
      },
      {
        name: "Gluzo",
        subtitle: "AWS Serverless Cloud Application",
        description:
          "Cloud-native application built on AWS Lambda, API Gateway, DynamoDB, IAM, CloudWatch, Secrets Manager, and EC2 for scalable serverless backend operations.",
        tech: ["AWS Lambda", "API Gateway", "DynamoDB", "IAM", "CloudWatch", "Python"],
        accent: "amber",
      },
    ],
    additionalSkills: [
      "WhatsApp Automation (booking, onboarding, notifications)",
      "REST API design with FastAPI & Express.js",
      "PostgreSQL & MongoDB management, query optimisation",
      "Multi-tenant platform design (shared WhatsApp numbers, multi-agent routing)",
      "Server deployment & production maintenance",
      "IAM, Secrets Manager, CloudWatch on AWS",
      "Mentoring interns (code review, architecture guidance)",
    ],
    techStack: {
      Backend: ["Python", "FastAPI", "Node.js", "Express.js", "TypeScript"],
      Frontend: ["ReactJS", "Next.js", "Streamlit"],
      Databases: ["PostgreSQL", "MongoDB", "DynamoDB"],
      "AI & LLMs": ["OpenAI GPT-4o", "Groq LLaMA"],
      Automation: ["n8n", "WhatsApp Web API"],
      "Messaging & Queues": ["Redis", "BullMQ"],
      Cloud: ["AWS Lambda", "API Gateway", "EC2", "CloudWatch", "Secrets Manager"],
    },
  },
  {
    id: "intern",
    title: "AI Engineer Intern",
    company: "Ceiyone Tech Works Pvt. Ltd.",
    period: "Oct 2025 – Dec 2025",
    type: "Internship",
    accent: "violet",
    overview:
      "Built AI-powered automation solutions, OCR-based document processing, LinkedIn automation tools, and multi-agent LLM systems. Integrated AI services, external APIs, and workflow automation platforms.",
    projects: [
      {
        name: "AI Weather Agent",
        subtitle: "Conversational Telegram Bot",
        description:
          "Telegram bot that handles weather queries via text and voice. Integrated OpenAI for NLU, real-time weather APIs for data, and voice-to-text / text-to-speech pipelines.",
        tech: ["Python", "Telegram Bot API", "OpenAI", "Weather APIs"],
        accent: "sky",
      },
      {
        name: "LinkedIn Automation Platform",
        subtitle: "Profile Analytics & Content Automation",
        description:
          "Automated LinkedIn profile analytics, post scraping, engagement tracking, competitor research, and AI-powered content generation using n8n and Apify.",
        tech: ["Apify", "n8n", "Gemini", "Python"],
        accent: "blue",
      },
      {
        name: "LinkedIn Content Creation Agent",
        subtitle: "End-to-End Post Generation Workflow",
        description:
          "AI agent pipeline: topic research → content drafting → SEO optimisation → hashtag generation → publishing workflow, fully automated for LinkedIn creators.",
        tech: ["n8n", "Gemini", "Python"],
        accent: "indigo",
      },
      {
        name: "SEO DeepAgent",
        subtitle: "Automated SEO Auditing & Analysis",
        description:
          "Automated SEO audit pipelines covering competitor analysis, keyword research, traffic insights, and AI-generated recommendations using Serpstat integration.",
        tech: ["DeepAgent", "Serpstat", "OpenAI", "Python"],
        accent: "green",
      },
      {
        name: "Multi-Agent Financial AI",
        subtitle: "Financial Analysis via LLM Agents",
        description:
          "Multi-agent system for financial analysis, report generation, and real-time query handling, orchestrated using the Phi Framework with Groq LLaMA models.",
        tech: ["Groq LLaMA", "Phi Framework", "Python"],
        accent: "orange",
      },
      {
        name: "Business Card OCR System",
        subtitle: "Contact Extraction & Management",
        description:
          "Automated pipeline for business card OCR extraction, contact validation, data editing, MongoDB storage, and CSV export — served via FastAPI with a Streamlit UI.",
        tech: ["FastAPI", "MongoDB", "Streamlit", "Tesseract OCR"],
        accent: "pink",
      },
    ],
    additionalSkills: [],
    techStack: {
      Backend: ["Python", "FastAPI"],
      Frontend: ["Streamlit"],
      Databases: ["MongoDB"],
      "AI & LLMs": ["OpenAI GPT-4o", "Gemini", "Groq LLaMA", "Phi Framework"],
      Automation: ["n8n", "Apify"],
      OCR: ["Tesseract OCR"],
    },
  },
  {
    id: "mit",
    title: "Research Intern",
    company: "Manipal Institute of Technology",
    period: "Jun 2024 – Jul 2024",
    duration: "2 mos",
    type: "Internship",
    location: "Karnataka, India · On-site",
    accent: "teal",
    overview:
      "Developed ML-based Quantitative Structure-Property Relationship (QSPR) models to predict Posaconazole solubility in Self-Emulsifying Drug Delivery Systems (SEDDS), reducing dependence on costly laboratory screening. Used RDKit cheminformatics, molecular descriptor generation, and VIF-based feature selection across 50+ descriptors. Supervised by Dr. Neha Sureshchandra Gandhi.",
    researchArea: "Quantitative Structure Activity Relationship (QSAR) & Quantitative Structure Property Relationship (QSPR)",
    projects: [
      {
        name: "QSPR Models for Posaconazole SEDDS",
        subtitle: "Drug Solubility Prediction · Pharmaceutical Formulation",
        description:
          "Built ML models predicting drug solubility in SEDDS formulations. Random Forest achieved R²=0.865, PLS R²=0.733, Linear Regression R²=0.740, SVM R²=0.630, KNN R²=0.590. Key descriptors: ELUMO, EHOMO, MaxQ-, FpDensityMorgan2, HallKierAlpha.",
        tech: ["Python", "RDKit", "Random Forest", "PLS", "Linear Regression", "SVM", "KNN"],
        accent: "teal",
      },
    ],
    additionalSkillsLabel: "Impact",
    additionalSkills: [
      "Reduced dependence on costly and time-consuming laboratory formulation screening",
      "Applied cheminformatics (RDKit) to generate 50+ molecular descriptors",
      "Performed VIF analysis for feature selection — 10 key descriptors identified",
      "Proposed future web-based recommendation system for drug formulation",
    ],
    techStack: {
      Languages: ["Python"],
      "ML Models": ["Random Forest", "Linear Regression", "PLS", "KNN", "SVM"],
      Cheminformatics: ["RDKit", "Mordred"],
      Frameworks: ["Scikit-Learn"],
    },
    hasImage: true,
    hasCert: true,
  },
  {
    id: "tutor",
    title: "Tutor",
    company: "Kamakshi Tuition Centre",
    period: "Jan 2023 – Jun 2023",
    duration: "6 mos",
    type: "Part-time",
    location: "Mugalivakkam, Chennai · On-site",
    accent: "amber",
    overview:
      "Taught mathematics to 9th grade students and Python programming to 12th grade students at Kamakshi Tuition Centre, Mugalivakkam Arasa Maram.",
    projects: [],
    additionalSkills: [],
    techStack: {},
  },
];

export const tagColors = {
  teal:   "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
  sky:    "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
  violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  green:  "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  amber:  "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  blue:   "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
  pink:   "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
  slate:  "bg-slate-100 dark:bg-slate-700/40 text-slate-700 dark:text-slate-300",
};

export const roleAccents = {
  blue: {
    badge:  "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800/50",
    dot:    "bg-blue-500",
    line:   "bg-blue-200 dark:bg-blue-800/50",
    header: "from-blue-600 to-blue-700",
    type:   "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40",
  },
  violet: {
    badge:  "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
    border: "border-violet-200 dark:border-violet-800/50",
    dot:    "bg-violet-500",
    line:   "bg-violet-200 dark:bg-violet-800/50",
    header: "from-violet-600 to-violet-700",
    type:   "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/40",
  },
  teal: {
    badge:  "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
    border: "border-teal-200 dark:border-teal-800/50",
    dot:    "bg-teal-500",
    line:   "bg-teal-200 dark:bg-teal-800/50",
    header: "from-teal-600 to-teal-700",
    type:   "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/40",
  },
  amber: {
    badge:  "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800/50",
    dot:    "bg-amber-500",
    line:   "bg-amber-200 dark:bg-amber-800/50",
    header: "from-amber-500 to-amber-600",
    type:   "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40",
  },
};
