// Refresh the committed static résumé fallbacks from the backend's ATS generator.
//
// The backend builds a single-column, ATS-friendly PDF/DOCX/TXT from the same
// structured Markdown as this site. Printing the two-column web page (the old
// approach) produced letter-spaced headings and column order that parsers misread.
//
// Usage: npm run resume:pdf
//   RESUME_API_URL=http://127.0.0.1:8080 npm run resume:pdf   (local backend)
// Offline alternative, from the backend repo: python scripts/export_resume.py ../vigneshwarancj-portfolio-website
const fs = require("node:fs");
const path = require("node:path");

const api = (process.env.RESUME_API_URL || process.env.PORTFOLIO_API_URL || "https://vigneshwarancj-portfolio-backend.onrender.com").replace(/\/$/, "");
const root = path.resolve(__dirname, "..");
const files = [
  ["/api/resume", "resume.pdf", (buffer) => buffer.subarray(0, 5).toString() === "%PDF-"],
  ["/api/resume.docx", "Vigneshwaran_CJ.docx", (buffer) => buffer.subarray(0, 2).toString() === "PK"],
  ["/api/resume.txt", "resume.txt", (buffer) => buffer.toString("utf8").includes("WORK EXPERIENCE")],
];

(async () => {
  for (const [endpoint, name, valid] of files) {
    const response = await fetch(`${api}${endpoint}`, { signal: AbortSignal.timeout(90000) });
    if (!response.ok) throw new Error(`${endpoint} returned ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    if (!valid(buffer)) throw new Error(`${endpoint} did not return a valid ${name}`);
    fs.writeFileSync(path.join(root, name), buffer);
    console.log(`Wrote ${name} (${buffer.length.toLocaleString()} bytes) from ${api}${endpoint}`);
  }
})().catch((error) => { console.error(error.message || error); process.exitCode = 1; });
