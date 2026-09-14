import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import NavBar from "./NavBar";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && matchMedia("(prefers-color-scheme: dark)").matches));
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); localStorage.setItem("theme", dark ? "dark" : "light"); }, [dark]);
  useEffect(() => { setIsOpen(false); }, [location.pathname]);
  useEffect(() => { const close = e => { if (e.key === "Escape") { setIsOpen(false); document.getElementById("menu-toggle")?.focus(); } }; if (isOpen) document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, [isOpen]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-black tracking-tight bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
      >
        vigneshwaran<span className="text-blue-500">.</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex">
        <NavBar dark={dark} setDark={setDark} />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
        id="menu-toggle" aria-label="Toggle Menu" aria-expanded={isOpen} aria-controls="mobile-navigation"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-xl lg:hidden">
          <div className="px-6 py-4" onClick={e => { if (e.target.closest("a")) setIsOpen(false); }}>
            <NavBar mobile dark={dark} setDark={setDark} />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
