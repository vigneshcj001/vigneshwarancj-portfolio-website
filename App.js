import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";

import Header from "./src/Components/Header";
import Footer from "./src/Components/Footer";
import PortfolioAssistant from "./src/Components/PortfolioAssistant";
import ErrorBoundary from "./src/Components/ErrorBoundary";
import BackToTop from "./src/Components/BackToTop";

const Home         = lazy(() => import("./src/pages/Home"));
const About        = lazy(() => import("./src/pages/About"));
const Projects     = lazy(() => import("./src/pages/Project"));
const Publications = lazy(() => import("./src/pages/Publications"));
const Skills       = lazy(() => import("./src/pages/Skills"));
const Social       = lazy(() => import("./src/pages/Social"));
const ContactUs    = lazy(() => import("./src/pages/ContactUs"));
const Experience   = lazy(() => import("./src/pages/Experience"));
const Resume       = lazy(() => import("./src/pages/Resume"));

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

const NotFound = () => (
  <div className="flex flex-col items-center justify-center flex-1 pt-32 pb-20 px-4 text-center">
    <p className="text-8xl font-black text-gray-200 dark:text-gray-800 select-none">404</p>
    <p className="text-xl font-bold text-gray-700 dark:text-gray-300 mt-2 mb-1">Page not found</p>
    <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
      This page doesn't exist or was moved.
    </p>
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

      <main id="main-content" className="flex-1 flex flex-col">
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
                  <Route path="/about"        element={<About />} />
                  <Route path="/experience"   element={<Experience />} />
                  <Route path="/projects"     element={<Projects />} />
                  <Route path="/publications" element={<Publications />} />
                  <Route path="/social"       element={<Social />} />
                  <Route path="/skills"       element={<Skills />} />
                  <Route path="/contact"      element={<ContactUs />} />
                  <Route path="/resume"       element={<Resume />} />
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

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
