import { useEffect, useState } from "react";
import { Link } from "react-router";
import { portfolioApi } from "../services/portfolioApi";
import { testimonials as staticTestimonials } from "../data/showcase";

// Approved recommendations only (moderated in the admin page). Renders nothing
// until at least one exists, so the home page never shows an empty section.
export default function Testimonials() {
  const [items, setItems] = useState(() => staticTestimonials.filter((item) => item.approved));

  useEffect(() => {
    const controller = new AbortController();
    portfolioApi.testimonials(controller.signal)
      .then((data) => { if (data?.testimonials?.length) setItems(data.testimonials); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (!items.length) return null;
  return (
    <section className="portfolio-section section-spacing testimonials-section" aria-labelledby="testimonials-title">
      <div className="section-heading">
        <div><p className="eyebrow">Recommendations</p><h2 id="testimonials-title">From people who worked with him.</h2></div>
        <Link className="text-link" to="/recommend">Write a recommendation ↗</Link>
      </div>
      <ul className="testimonial-grid">
        {items.slice(0, 6).map((item, index) => (
          <li key={`${item.name}-${index}`}>
            <blockquote>“{item.quote}”</blockquote>
            <p><strong>{item.name}</strong><span>{item.role}{item.relationship ? ` · ${item.relationship}` : ""}</span></p>
          </li>
        ))}
      </ul>
    </section>
  );
}
