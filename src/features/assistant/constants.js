export const MAX_HISTORY = 20;

export const STARTER_QUESTIONS = [
  {
    title: "Find my best match",
    text: "Find Vigneshwaran's strongest Agentic AI project, explain why, and show it.",
    capability: "Compare project evidence",
    icon: "⌕",
  },
  {
    title: "Inspect safety",
    text: "Show me PocketPet and explain its approval gates and safety controls.",
    capability: "Approval gates and limitations",
    icon: "◇",
  },
  {
    title: "Start a walkthrough",
    text: "Give me a step-by-step walkthrough of AIORA architecture.",
    capability: "WhatsApp → queues → services",
    icon: "→",
  },
  {
    title: "Review research",
    text: "Show GlycanBench and explain its scientific evidence and limitations.",
    capability: "Dataset curation and model limits",
    icon: "∿",
  },
  {
    title: "Evaluate experience",
    text: "Summarize Vigneshwaran's production AI experience and open his résumé.",
    capability: "Ceiyone roles and résumé",
    icon: "▤",
  },
  {
    title: "Prepare contact",
    text: "I want to hire Vigneshwaran for an AI engineering role. Prepare a contact action.",
    capability: "Draft only; you review and send",
    icon: "+",
  },
];

export const createId = () => Date.now() + Math.random();

export const createInitialMessage = () => ({
  id: 1,
  from: "bot",
  text: "Ask me what CJ built, how a project works, or which work fits your role. I can explain PocketPet's approval gates, trace AIORA's WhatsApp workflows, check GlycanBench's research evidence, or prepare a contact draft for you to review.",
  ts: Date.now(),
  done: true,
});
