import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const source = path.resolve(root, "../vigneshwarancj_portfolio_backend/portfolio_data.json");
const target = path.join(root, "src/data/portfolio.generated.json");
const data = JSON.parse(fs.readFileSync(source, "utf8"));
fs.writeFileSync(target, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Synced résumé content from ${path.basename(source)}.`);
