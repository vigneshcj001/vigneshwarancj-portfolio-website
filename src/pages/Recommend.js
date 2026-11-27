import { useState } from "react";
import { Link } from "react-router";
import useMeta from "../Hooks/useMeta";
import PageHeader from "../Components/ui/PageHeader";
import { portfolioApi } from "../services/portfolioApi";

const EMPTY = { name: "", role: "", relationship: "", quote: "", consent: false, website: "" };

export default function Recommend() {
  useMeta("Write a recommendation", "Share a short recommendation for Vigneshwaran C. J. Every submission is reviewed before it appears.");
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState({ status: "idle", message: "" });
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.type === "checkbox" ? event.target.checked : event.target.value }));
  const sending = state.status === "sending";

  const submit = async (event) => {
    event.preventDefault();
    if (sending) return;
    setState({ status: "sending", message: "Sending…" });
    try {
      await portfolioApi.submitTestimonial({ ...form, name: form.name.trim(), role: form.role.trim(), relationship: form.relationship.trim(), quote: form.quote.trim() });
      setForm(EMPTY);
      setState({ status: "done", message: "Thank you. Your recommendation will appear after Vigneshwaran reviews it." });
    } catch (error) {
      const message = error?.status === 422
        ? "Please complete every field. The recommendation needs at least 30 characters, and permission to publish."
        : error?.status === 503 ? "Recommendations are offline right now. Please try again later."
          : error?.message || "Could not send the recommendation.";
      setState({ status: "error", message });
    }
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-20">
      <div className="max-w-2xl mx-auto">
        <PageHeader badge="Recommendations" title="Write a recommendation" subtitle="Worked with Vigneshwaran? A few honest sentences help hiring teams. Every submission is reviewed before it appears on the site." />
        {state.status === "done" ? (
          <div className="surface-card" role="status">
            <p>{state.message}</p>
            <Link className="text-link" to="/">Back to the portfolio →</Link>
          </div>
        ) : (
          <form className="surface-card recommend-form" onSubmit={submit} aria-busy={sending}>
            <label>Your name<input required minLength={2} maxLength={80} value={form.name} onChange={update("name")} autoComplete="name" /></label>
            <label>Your role and organisation<input required minLength={2} maxLength={120} value={form.role} onChange={update("role")} placeholder="e.g. Engineering Manager, Ceiyone Tech Works" /></label>
            <label>How you worked together<input required minLength={2} maxLength={120} value={form.relationship} onChange={update("relationship")} placeholder="e.g. Managed him on AIORA" /></label>
            <label>Recommendation<textarea required minLength={30} maxLength={800} rows={6} value={form.quote} onChange={update("quote")} /></label>
            <span className="recommend-count">{form.quote.trim().length} / 800</span>
            {/* Honeypot: hidden from people, filled in by bots. */}
            <label className="sr-only" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} /></label>
            <label className="recommend-consent">
              <input type="checkbox" checked={form.consent} onChange={update("consent")} required />
              I agree that my name, role, and this recommendation may be published on this portfolio.
            </label>
            {state.status === "error" && <p className="api-playground-error" role="alert">{state.message}</p>}
            <button type="submit" className="primary-action" disabled={sending}>{sending ? "Sending…" : "Send recommendation"}</button>
          </form>
        )}
      </div>
    </div>
  );
}
