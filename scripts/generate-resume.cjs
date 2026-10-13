const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
    await page.addInitScript(() => { localStorage.setItem("theme", "light"); localStorage.setItem("language", "en"); });
    await page.route("https://vigneshwarancj-portfolio-backend.onrender.com/**", (route) => route.abort());
    const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173";
    await page.goto(`${base}/resume`, { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: "Resume", exact: true }).waitFor();
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: path.resolve(__dirname, "../resume.pdf"),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });
    console.log("Generated resume.pdf from /resume.");
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
