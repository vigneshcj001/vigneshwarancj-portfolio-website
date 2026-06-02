import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import NavBar from "./NavBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      <nav className="hidden md:flex">
        <NavBar />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-xl md:hidden">
          <div className="px-6 py-4" onClick={() => setIsOpen(false)}>
            <NavBar mobile />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
