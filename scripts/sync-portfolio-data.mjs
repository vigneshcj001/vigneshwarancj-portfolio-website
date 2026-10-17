import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const root = path.resolve(import.meta.dirname, "..");
const contentRoot = path.resolve(
  process.env.PORTFOLIO_CONTENT_ROOT || path.join(root, "../vigneshwarancj_portfolio_backend/knowledge"),
);
const indexPath = path.join(contentRoot, "index.md");
const target = path.join(root, "src/data/portfolio.generated.js");

if (!fs.existsSync(indexPath)) {
  if (fs.existsSync(target)) {
    console.warn(`Structured Markdown unavailable at ${contentRoot}; using committed generated module.`);
    process.exit(0);
  }
  throw new Error(`Missing structured portfolio content: ${indexPath}`);
}

function markdown(pathname) {
  const normalized = fs.readFileSync(pathname, "utf8").replaceAll("\r\n", "\n");
  if (!normalized.startsWith("---\n")) throw new Error(`Missing frontmatter: ${pathname}`);
  const end = normalized.indexOf("\n---\n", 4);
  if (end < 0) throw new Error(`Unclosed frontmatter: ${pathname}`);
  return { metadata: parse(normalized.slice(4, end)), body: normalized.slice(end + 5).trim() };
}

const { metadata: index } = markdown(indexPath);
if (index.schema !== "portfolio-okf-v1" || !Array.isArray(index.entries) || !index.entries.length) {
  throw new Error("knowledge/index.md must use portfolio-okf-v1 and list entries");
}

const data = {
  personal: {}, education: [], certifications: [], research_interests: [],
  publications: [], skills: {}, projects: {}, employer: {}, work_experience: [], stats: {},
};
const ordered = { education: [], certifications: [], publications: [], work_experience: [] };
const seen = new Set();

for (const relative of index.entries) {
  if (typeof relative !== "string" || seen.has(relative)) throw new Error(`Invalid or duplicate entry: ${relative}`);
  seen.add(relative);
  const pathname = path.resolve(contentRoot, relative);
  if (!pathname.startsWith(`${contentRoot}${path.sep}`) || path.extname(pathname) !== ".md") {
    throw new Error(`Unsafe structured content path: ${relative}`);
  }
  const { metadata: document } = markdown(pathname);
  const order = Number.isInteger(document.order) ? document.order : 0;
  if (!document.type || !document.title || document.data === undefined) {
    throw new Error(`Entry needs type, title, and data: ${relative}`);
  }
  switch (document.type) {
    case "profile":
      data.personal = document.data.personal || {};
      data.employer = document.data.employer || {};
      data.stats = document.data.stats || {};
      break;
    case "education": ordered.education.push([order, document.data]); break;
    case "certification": ordered.certifications.push([order, document.data]); break;
    case "research_interests": data.research_interests = document.data; break;
    case "publication": ordered.publications.push([order, document.data]); break;
    case "skills": data.skills = document.data; break;
    case "project": data.projects[document.title] = document.data; break;
    case "experience": ordered.work_experience.push([order, document.data]); break;
    default: throw new Error(`Unsupported structured content type: ${document.type}`);
  }
}

for (const [key, values] of Object.entries(ordered)) {
  data[key] = values.sort((a, b) => a[0] - b[0]).map(([, value]) => value);
}
for (const required of ["personal", "education", "skills", "projects", "work_experience"]) {
  if (!data[required] || !Object.keys(data[required]).length) throw new Error(`Missing required content: ${required}`);
}

fs.writeFileSync(target, `// Generated from structured Markdown. Do not edit.\nexport default ${JSON.stringify(data, null, 2)};\n`);
console.log(`Compiled ${index.entries.length} Markdown documents into ${path.basename(target)}.`);
