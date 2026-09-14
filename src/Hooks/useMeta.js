import { useEffect } from "react";
import { useLocation } from "react-router";
const BASE = "https://vigneshwarancj-portfolio-website.vercel.app";
const BASE_TITLE = "Vigneshwaran C.J. — AI/ML Engineer & Full-Stack Developer";
const BASE_DESC = "Portfolio of Vigneshwaran C.J. — AI/ML Engineer, Full-Stack Developer, and Bioinformatics Researcher.";
export default function useMeta(title, description) {
  const { pathname } = useLocation();
  useEffect(() => {
    const pageTitle = title ? `${title} | Vigneshwaran C.J.` : BASE_TITLE;
    const desc = description || BASE_DESC;
    document.title = pageTitle;
    const image = ["/projects/syncly", "/projects/glycanbench"].includes(pathname) ? `${BASE}/images/sharing/${pathname.split("/").pop()}.png` : `${BASE}/og-image.jpg`;
    for (const [key, value] of Object.entries({ description: desc, "og:title": pageTitle, "og:description": desc, "og:url": BASE + pathname, "og:image": image, "twitter:title": pageTitle, "twitter:description": desc, "twitter:image": image })) {
      const attr = key.startsWith("og:") ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", value);
    }
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", BASE + pathname);
  }, [title, description, pathname]);
}
