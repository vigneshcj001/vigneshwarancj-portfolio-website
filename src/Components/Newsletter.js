import { useState } from "react";

const BACKEND = "https://vigneshwarancj-portfolio-backend.onrender.com";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const submit = async (event) => {
    event.preventDefault(); setStatus("Saving…");
    try {
      const response = await fetch(`${BACKEND}/api/newsletter`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (!response.ok) throw new Error();
      setEmail(""); setStatus("Subscribed. New project notes will arrive by email.");
    } catch { setStatus("Subscription unavailable. Follow GitHub for project updates."); }
  };
  return <form className="newsletter" onSubmit={submit}><label htmlFor="newsletter-email">Project updates</label><div><input id="newsletter-email" type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" /><button type="submit">Subscribe</button></div>{status && <span role="status">{status}</span>}</form>;
}
