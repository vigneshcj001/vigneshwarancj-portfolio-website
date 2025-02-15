import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Social from "./pages/Social";
import ContactUs from "./pages/ContactUs";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/social" element={<Social />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
