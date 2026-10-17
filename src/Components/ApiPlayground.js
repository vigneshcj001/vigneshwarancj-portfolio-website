import { useState } from "react";
import { portfolioApi } from "../services/portfolioApi";
const examples = { aiora: "I want to book an appointment", pocketpet: "Buy a product from this page", glycanbench: "Man(a1-3)Man" };

export default function ApiPlayground({ slug }) {
  const [input, setInput] = useState(examples[slug] || "Show project flow");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const run = async () => {
    setLoading(true);
    try {
      setResult(await portfolioApi.demo(slug, input));
    } catch { setResult({ unavailable: "Demo API unavailable. Architecture and live-project links remain available." }); }
    finally { setLoading(false); }
  };
  return <section className="api-playground"><p className="eyebrow">Rate-limited API playground</p><h2>Try a safe simulation</h2><p>Uses representative routing logic. Never reaches employer systems or performs real purchases, submissions, or scientific predictions.</p><div><input value={input} onChange={event => setInput(event.target.value)} aria-label="Demo input" /><button className="primary-action" onClick={run} disabled={loading}>{loading ? "Running…" : "Run demo"}</button></div>{result && <pre aria-live="polite"><code>{JSON.stringify(result, null, 2)}</code></pre>}</section>;
}
