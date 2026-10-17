import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import NavBar from "./NavBar";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");
  const [systemDark, setSystemDark] = useState(() => matchMedia("(prefers-color-scheme: dark)").matches);
  const dark = theme === "dark" || (theme === "system" && systemDark);
  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: dark)");
    const update = (event) => setSystemDark(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); localStorage.setItem("theme", theme); }, [dark, theme]);
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
      className={`site-header fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-transparent"
      }`}
    ><div className="header-inner">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-black tracking-tight bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
      >
        vigneshwaran<span className="text-blue-500">.</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden xl:flex">
        <NavBar dark={dark} theme={theme} setTheme={setTheme} />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="xl:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
        id="menu-toggle" aria-label="Toggle Menu" aria-expanded={isOpen} aria-controls="mobile-navigation"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-xl xl:hidden">
          <div className="px-6 py-4" onClick={e => { if (e.target.closest("a")) setIsOpen(false); }}>
            <NavBar mobile dark={dark} theme={theme} setTheme={setTheme} />
          </div>
        </nav>
      )}
      </div>
    </header>
  );
};

export default Header;
