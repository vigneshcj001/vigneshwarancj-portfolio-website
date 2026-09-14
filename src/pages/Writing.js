import { Link, useParams } from "react-router";
import { articles } from "../data/showcase";
import useMeta from "../Hooks/useMeta";
export default function Writing() {
  const { slug } = useParams();
  const article = articles.find(item => item.slug === slug);
  useMeta(article?.title || "Technical notes", article?.intro || "Notes on full-stack systems and interpreting research models.");
  return <article className="portfolio-section case-study"><p className="eyebrow">Engineering + research</p><h1>{slug ? article?.title || "Article not found" : "Technical notes"}</h1>
    {article ? <><p className="lead">{article.intro}</p>{article.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}<Link className="text-link" to={`/projects/${article.project}`}>Explore the related case study →</Link><p className="mt-8"><Link to="/writing">← All notes</Link></p></> : <div className="editorial-grid">{articles.map(item => <Link className="surface-card" key={item.slug} to={`/writing/${item.slug}`}><h2>{item.title}</h2><p>{item.intro}</p><span className="text-link">Read note →</span></Link>)}</div>}
  </article>;
}
