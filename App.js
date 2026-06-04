import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import "./index.css";

import Header from "./src/Components/Header";
import Footer from "./src/Components/Footer";
import Home from "./src/pages/Home";
import About from "./src/pages/About";
import Projects from "./src/pages/Project";
import Skills from "./src/pages/Skills";
import Social from "./src/pages/Social";
import ContactUs from "./src/pages/ContactUs";
import Experience from "./src/pages/Experience";
import PortfolioAssistant from "./src/Components/PortfolioAssistant";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center flex-1 pt-32 pb-20 px-4 text-center">
    <p className="text-8xl font-black text-gray-200 dark:text-gray-800 select-none">404</p>
    <p className="text-xl font-bold text-gray-700 dark:text-gray-300 mt-2 mb-1">Page not found</p>
    <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">This page doesn't exist.</p>
    <Link
      to="/"
      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
    >
      Go home
    </Link>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full text-gray-900 dark:text-gray-100 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/social" element={<Social />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <PortfolioAssistant />
        <Footer />
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
