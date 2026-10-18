export const MAX_HISTORY = 20;

export const STARTER_QUESTIONS = [
  {
    title: "Find my best match",
    text: "Find Vigneshwaran's strongest Agentic AI project, explain why, and show it.",
    capability: "Search · reason · navigate",
    icon: "⌕",
  },
  {
    title: "Inspect safety",
    text: "Show me PocketPet and explain its approval gates and safety controls.",
    capability: "Retrieve · highlight",
    icon: "◇",
  },
  {
    title: "Start a walkthrough",
    text: "Give me a step-by-step walkthrough of AIORA architecture.",
    capability: "Plan · interactive tour",
    icon: "→",
  },
  {
    title: "Review research",
    text: "Show GlycanBench and explain its scientific evidence and limitations.",
    capability: "Grounded project search",
    icon: "∿",
  },
  {
    title: "Evaluate experience",
    text: "Summarize Vigneshwaran's production AI experience and open his résumé.",
    capability: "Multi-source answer",
    icon: "▤",
  },
  {
    title: "Prepare contact",
    text: "I want to hire Vigneshwaran for an AI engineering role. Prepare a contact action.",
    capability: "Confirmed action",
    icon: "+",
  },
];

export const createId = () => Date.now() + Math.random();

export const createInitialMessage = () => ({
  id: 1,
  from: "bot",
  text: "I'm CJ's portfolio agent. I can search verified work, choose approved tools, guide you through projects, and prepare safe portfolio actions. Try a live capability below.",
  ts: Date.now(),
  done: true,
});
