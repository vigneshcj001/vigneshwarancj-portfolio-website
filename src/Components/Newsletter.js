import { useState } from "react";
import { portfolioApi } from "../services/portfolioApi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ status: "idle", message: "" });
  const saving = state.status === "saving";

  const submit = async (event) => {
    event.preventDefault();
    if (saving) return;
    setState({ status: "saving", message: "Saving…" });
    try {
      await portfolioApi.newsletter(email.trim());
      setEmail("");
      setState({ status: "success", message: "Subscribed — new project notes will arrive by email." });
    } catch (error) {
      const message = error?.status === 429
        ? error.message
        : "Subscription is unavailable right now. Follow GitHub for project updates.";
      setState({ status: "error", message });
    }
  };

  return (
    <form className="newsletter" onSubmit={submit} aria-busy={saving}>
      <label htmlFor="newsletter-email">Project updates</label>
      <div>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => { setEmail(event.target.value); if (state.status !== "saving") setState({ status: "idle", message: "" }); }}
          placeholder="you@example.com"
          disabled={saving}
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={state.message ? "newsletter-status" : undefined}
        />
        <button type="submit" disabled={saving}>{saving ? "Saving…" : "Subscribe"}</button>
      </div>
      {state.message && <span id="newsletter-status" role="status" data-status={state.status}>{state.message}</span>}
    </form>
  );
}
