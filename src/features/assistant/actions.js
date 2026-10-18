export const AGENT_TARGETS = Object.freeze({
  "home.hero": { path: "/", selector: ".hero-section" },
  "home.projects": { path: "/", selector: ".featured-work-section" },
  "about.profile": { path: "/about", selector: "#portfolio-about" },
  "experience.timeline": { path: "/experience", selector: "#portfolio-experience" },
  "projects.list": { path: "/projects", selector: "#portfolio-projects" },
  "projects.aiora": { path: "/projects/aiora", selector: "#case-study-aiora" },
  "projects.pocketpet": { path: "/projects/pocketpet", selector: "#case-study-pocketpet" },
  "projects.glycanbench": { path: "/projects/glycanbench", selector: "#case-study-glycanbench" },
  "projects.syncly": { path: "/projects/syncly", selector: "#case-study-syncly" },
  "skills.grid": { path: "/skills", selector: "#portfolio-skills" },
  "publications.list": { path: "/publications", selector: "#portfolio-publications" },
  "resume.document": { path: "/resume", selector: "#portfolio-resume" },
  "contact.form": { path: "/contact", selector: "#portfolio-contact" },
});

export function validateAgentAction(action) {
  if (!action || !["navigate", "highlight", "walkthrough", "contact"].includes(action.type)) return null;
  const target = Object.hasOwn(AGENT_TARGETS, action.target) ? AGENT_TARGETS[action.target] : null;
  if (action.type === "walkthrough" && (!Array.isArray(action.data?.steps) || !action.data.steps.length || action.data.steps.some((step) => typeof step !== "string"))) return null;
  return target ? { ...action, resolved: target } : null;
}

export async function highlightAgentTarget(selector, attempt = 0) {
  const element = document.querySelector(selector);
  if (!element && attempt < 8) {
    await new Promise((resolve) => setTimeout(resolve, 90));
    return highlightAgentTarget(selector, attempt + 1);
  }
  if (!element) return false;
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  element.classList.add("agent-highlight");
  setTimeout(() => element.classList.remove("agent-highlight"), 2600);
  return true;
}

export async function executeAgentAction(action, navigate) {
  const safe = validateAgentAction(action);
  if (!safe || !["navigate", "highlight"].includes(safe.type) || !safe.auto_execute || safe.requires_confirmation) return null;
  navigate(safe.resolved.path);
  const found = await highlightAgentTarget(safe.resolved.selector);
  const name = safe.label.replace(/^(Open|Highlight) /, "");
  return {
    status: found ? "completed" : "failed",
    text: found ? `${safe.type === "navigate" ? "Opened" : "Highlighted"} ${name}` : `Could not locate ${name}. Use the project link to try again.`,
  };
}
