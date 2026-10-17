export const MAX_HISTORY = 20;

export const STARTER_QUESTIONS = [
  { text: "Main skills?", icon: "⚡" },
  { text: "Tell me about Syncly", icon: "🚀" },
  { text: "GlycanBench?", icon: "🧬" },
  { text: "Research focus", icon: "🔬" },
  { text: "His tech stack", icon: "💻" },
  { text: "Current job?", icon: "🏢" },
];

export const createId = () => Date.now() + Math.random();

export const createInitialMessage = () => ({
  id: 1,
  from: "bot",
  text: "Hey! I'm CJ's AI — ask me anything about Vigneshwaran's work, projects, or background.",
  ts: Date.now(),
  done: true,
});
