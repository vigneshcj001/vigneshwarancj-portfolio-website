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
  const target = AGENT_TARGETS[action.target];
  return target ? { ...action, resolved: target } : null;
}

export function highlightAgentTarget(selector, attempt = 0) {
  const element = document.querySelector(selector);
  if (!element && attempt < 8) {
    setTimeout(() => highlightAgentTarget(selector, attempt + 1), 90);
    return;
  }
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  element.classList.add("agent-highlight");
  setTimeout(() => element.classList.remove("agent-highlight"), 2600);
}

export function executeAgentAction(action, navigate) {
  const safe = validateAgentAction(action);
  if (!safe || !safe.auto_execute || safe.requires_confirmation) return false;
  navigate(safe.resolved.path);
  setTimeout(() => highlightAgentTarget(safe.resolved.selector), 120);
  return true;
}
