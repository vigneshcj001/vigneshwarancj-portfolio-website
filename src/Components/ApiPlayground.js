import { useState } from "react";
import { portfolioApi } from "../services/portfolioApi";

const examples = { aiora: "I want to book an appointment", pocketpet: "Buy a product from this page", glycanbench: "Man(a1-3)Man" };

export default function ApiPlayground({ slug }) {
  const [input, setInput] = useState(examples[slug] || "Show project flow");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async (event) => {
    event.preventDefault();
    const value = input.trim();
    if (!value || loading) return;
    setLoading(true);
    setError("");
    try {
      setResult(await portfolioApi.demo(slug, value));
    } catch (requestError) {
      setResult(null);
      setError(requestError?.status === 429
        ? requestError.message
        : "Demo API unavailable right now. The architecture and live-project links above still work.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="api-playground" aria-busy={loading}>
      <p className="eyebrow">Rate-limited API playground</p>
      <h2>Try a safe simulation</h2>
      <p>Uses representative routing logic. Never reaches employer systems or performs real purchases, submissions, or scientific predictions.</p>
      <form onSubmit={run}>
        <input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Demo input" maxLength={160} />
        <button type="submit" className="primary-action" disabled={loading || !input.trim()}>{loading ? "Running…" : "Run demo"}</button>
      </form>
      <div aria-live="polite">
        {error && <p className="api-playground-error" role="alert">{error}</p>}
        {result && <pre><code>{JSON.stringify(result, null, 2)}</code></pre>}
      </div>
    </section>
  );
}
