import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router";
import { m as motion, AnimatePresence, MotionConfig, LazyMotion } from "framer-motion";
import { IconContext } from "react-icons";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";

import Header from "./src/Components/Header";
import Footer from "./src/Components/Footer";
import PortfolioAssistant from "./src/Components/PortfolioAssistant";
import ErrorBoundary from "./src/Components/ErrorBoundary";
import BackToTop from "./src/Components/BackToTop";
import { LanguageProvider } from "./src/Contexts/LanguageContext";
import usePageTranslation from "./src/Hooks/usePageTranslation";
import { recordEvent } from "./src/Utils/analytics";
import { installErrorReporter } from "./src/Utils/errorReporter";

const CaseStudy = lazy(() => import("./src/pages/CaseStudy"));
const AssistantArchitecture = lazy(() => import("./src/pages/AssistantArchitecture"));
const Writing = lazy(() => import("./src/pages/Writing"));
const Home         = lazy(() => import("./src/pages/Home"));
const About        = lazy(() => import("./src/pages/About"));
const Projects     = lazy(() => import("./src/pages/Project"));
const Publications = lazy(() => import("./src/pages/Publications"));
const Skills       = lazy(() => import("./src/pages/Skills"));
const Social       = lazy(() => import("./src/pages/Social"));
const ContactUs    = lazy(() => import("./src/pages/ContactUs"));
const Experience   = lazy(() => import("./src/pages/Experience"));
const Resume       = lazy(() => import("./src/pages/Resume"));
const Admin        = lazy(() => import("./src/pages/Admin"));
const JobMatch     = lazy(() => import("./src/pages/JobMatch"));
const Compare      = lazy(() => import("./src/pages/Compare"));
const RecruiterBrief = lazy(() => import("./src/pages/RecruiterBrief"));
const Status       = lazy(() => import("./src/pages/Status"));
const Recommend    = lazy(() => import("./src/pages/Recommend"));

const NAV_LINKS = [
  { label: "Home",         to: "/" },
  { label: "About",        to: "/about" },
  { label: "Experience",   to: "/experience" },
  { label: "Projects",     to: "/projects" },
  { label: "Publications", to: "/publications" },
  { label: "Skills",       to: "/skills" },
  { label: "Social",       to: "/social" },
  { label: "Contact",      to: "/contact" },
  { label: "Resume",       to: "/resume" },
];

const KNOWN_PATHS = [
  ...NAV_LINKS.map(({ label, to }) => ({ label, to })),
  ...["aiora", "pocketpet", "syncly", "glycanbench"].map((slug) => ({ label: `${slug[0].toUpperCase()}${slug.slice(1)} case study`, to: `/projects/${slug}` })),
  { label: "Job match", to: "/match" }, { label: "Compare projects", to: "/compare" },
  { label: "Recruiter brief", to: "/brief" }, { label: "Writing", to: "/writing" }, { label: "Status", to: "/status" },
];

// Best guess at the intended page. An exact match on a path's last segment
// ("/project/aiora" → "/projects/aiora") outranks a partial match ("/projects").
export function suggestPath(pathname) {
  const words = pathname.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 2);
  if (!words.length) return null;
  let best = null;
  let bestScore = 0;
  for (const candidate of KNOWN_PATHS) {
    if (candidate.to === "/") continue;
    const last = candidate.to.split("/").pop();
    const score = words.reduce((total, word) => total + (word === last ? 3 : candidate.to.includes(word) || word.includes(last) ? 1 : 0), 0);
    if (score > bestScore || (score === bestScore && score > 0 && candidate.to.length > best.to.length)) {
      best = candidate;
      bestScore = score;
    }
  }
  return best;
}

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const suggestion = suggestPath(location.pathname);
  const search = (event) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim();
    if (query) navigate(`/projects?q=${encodeURIComponent(query)}`);
  };
  return (
  <div className="flex flex-col items-center justify-center flex-1 pt-32 pb-20 px-4 text-center">
    <p className="text-8xl font-black text-gray-200 dark:text-gray-800 select-none">404</p>
    <p className="text-xl font-bold text-gray-700 dark:text-gray-300 mt-2 mb-1">Page not found</p>
    <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
      This page doesn't exist or was moved.
    </p>
    {suggestion && (
      <p className="text-sm mb-6">Did you mean <Link className="text-link" to={suggestion.to}>{suggestion.label}</Link>?</p>
    )}
    <form className="not-found-search" onSubmit={search} role="search">
      <label className="sr-only" htmlFor="not-found-q">Search projects and technologies</label>
      <input id="not-found-q" name="q" placeholder="Search projects or technologies" />
      <button type="submit" className="primary-action">Search</button>
    </form>
    <div className="flex flex-wrap gap-3 justify-center mb-10">
      {NAV_LINKS.map(({ label, to }) => (
        <Link
          key={to}
          to={to}
          className="px-4 py-2 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {label}
        </Link>
      ))}
    </div>
    <Link
      to="/"
      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
    >
      Go home
    </Link>
  </div>
  );
};

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center py-32">
    <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15, ease: "easeIn" } },
};

function AppContent() {
  const location = useLocation();
  usePageTranslation();
  useEffect(() => { window.scrollTo(0, 0); document.getElementById("main-content")?.focus({ preventScroll: true }); }, [location.pathname]);
  // First-party funnel analytics: path only, no query string or visitor identifiers.
  useEffect(() => { if (!location.pathname.startsWith("/admin")) recordEvent("page_view"); }, [location.pathname]);
  useEffect(() => { installErrorReporter(); }, []);
  useEffect(() => { if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") navigator.serviceWorker.register(new URL("sw.js", import.meta.url)).catch(() => {}); }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Skip to main content — visible on focus only */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Header />

      <main tabIndex={-1} id="main-content" className="flex-1 flex flex-col">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col"
              >
                <Routes location={location}>
                  <Route path="/"             element={<Home />} />
                  <Route path="/assistant-architecture" element={<AssistantArchitecture />} />
                  <Route path="/about"        element={<About />} />
                  <Route path="/experience"   element={<Experience />} />
                  <Route path="/projects/:slug" element={<CaseStudy />} />
                  <Route path="/writing" element={<Writing />} />
                  <Route path="/writing/:slug" element={<Writing />} />
                  <Route path="/projects"     element={<Projects />} />
                  <Route path="/publications" element={<Publications />} />
                  <Route path="/social"       element={<Social />} />
                  <Route path="/skills"       element={<Skills />} />
                  <Route path="/contact"      element={<ContactUs />} />
                  <Route path="/resume"       element={<Resume />} />
                  <Route path="/match"        element={<JobMatch />} />
                  <Route path="/match/:shareId" element={<JobMatch />} />
                  <Route path="/compare"      element={<Compare />} />
                  <Route path="/brief"        element={<RecruiterBrief />} />
                  <Route path="/status"       element={<Status />} />
                  <Route path="/recommend"    element={<Recommend />} />
                  <Route path="/admin"        element={<Admin />} />
                  <Route path="*"             element={<NotFound />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>

      <PortfolioAssistant />
      <BackToTop />
      <Footer />
      <Analytics />
    </div>
  );
}

// Animation features load in a separate chunk so the main bundle only ships
// the lightweight `m` components. All icons are decorative; controls that
// show only an icon carry their own aria-label.
const loadMotionFeatures = () => import("./src/Utils/motionFeatures.js").then((mod) => mod.default);
const iconProps = { attr: { "aria-hidden": "true", focusable: "false" } };

const App = () => (
  <Router>
    <LanguageProvider>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <IconContext.Provider value={iconProps}><AppContent /></IconContext.Provider>
        </MotionConfig>
      </LazyMotion>
    </LanguageProvider>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
