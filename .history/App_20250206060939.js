import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./index.css";

import Header from "./src/Components/Header";
import Footer from "./src/Components/Footer";
import Home from "./src/pages/Home";
import About from "./src/pages/About";
import Projects from "./src/pages/Project";
import Social from "./src/pages/Social";
import ContactUs from "./src/pages/ContactUs";

const App = () => {
  return (
    <Router>
      <div className=" bg-black min-h-screen w-full">
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
