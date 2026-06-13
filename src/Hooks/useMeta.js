import { useEffect } from "react";

const BASE_TITLE = "Vigneshwaran C.J. — AI/ML Engineer & Full-Stack Developer";
const BASE_DESC  = "Portfolio of Vigneshwaran C.J. — AI/ML Engineer, Full-Stack Developer, and Bioinformatics Researcher specialising in glycomics, agentic AI, and production-grade web platforms.";

export default function useMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Vigneshwaran C.J.` : BASE_TITLE;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", description || BASE_DESC);
    return () => {
      document.title = BASE_TITLE;
      if (descEl) descEl.setAttribute("content", BASE_DESC);
    };
  }, [title, description]);
}
