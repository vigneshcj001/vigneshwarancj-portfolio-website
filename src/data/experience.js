export const roles = [
  {
    id: "jsd",
    title: "Junior Software Developer",
    company: "iSenseHub",
    period: "Dec 2025 – Present",
    type: "Full-time",
    accent: "blue",
    overview:
      "Designing, developing, and maintaining enterprise-grade applications and AI-powered platforms. Work spans backend APIs, WhatsApp automation, cloud deployments, AI/LLM integration, and internal monitoring systems.",
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
          "QR-based WhatsApp authentication and session lifecycle management platform with webhook integration and n8n connectivity for workflow automation.",
        tech: ["Node.js", "PostgreSQL", "WhatsApp Web API", "n8n"],
        accent: "green",
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
      "REST API design with FastAPI",
      "PostgreSQL & MongoDB management, query optimisation",
      "Server deployment & production maintenance",
      "IAM, Secrets Manager, CloudWatch on AWS",
    ],
    techStack: {
      Backend: ["Python", "FastAPI", "Node.js"],
      Frontend: ["ReactJS", "Streamlit"],
      Databases: ["PostgreSQL", "MongoDB", "DynamoDB"],
      "AI & LLMs": ["OpenAI GPT-4o", "Groq LLaMA"],
      Automation: ["n8n", "WhatsApp Web API"],
      Cloud: ["AWS Lambda", "API Gateway", "EC2", "CloudWatch", "Secrets Manager"],
    },
  },
  {
    id: "intern",
    title: "AI Engineer Intern",
    company: "iSenseHub",
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
};
