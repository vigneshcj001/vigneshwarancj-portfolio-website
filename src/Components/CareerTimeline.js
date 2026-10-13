import { roles } from "../data/experience";
import { education } from "../data/education";
import { publications } from "../data/publications";

const yearOf = (period = "") => Number(period.match(/20\d{2}/)?.[0] || 0);

export default function CareerTimeline() {
  const entries = [
    ...roles.map((role) => ({ year: yearOf(role.period), title: role.title, detail: role.company, type: "Work" })),
    ...education.map((item) => ({ year: yearOf(item.period), title: item.degree, detail: item.institution, type: "Education" })),
    ...publications.slice(0, 2).map((item) => ({ year: Number(item.year), title: item.title, detail: item.status, type: "Research" })),
  ].filter((item) => item.year).sort((a, b) => b.year - a.year);
  return <ol className="career-timeline">{entries.map((item, index) => <li key={`${item.year}-${item.title}-${index}`}><time>{item.year}</time><div><span>{item.type}</span><strong>{item.title}</strong><p>{item.detail}</p></div></li>)}</ol>;
}
