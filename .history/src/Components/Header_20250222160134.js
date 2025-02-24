import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavBar from "./NavBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md border-b border-gray-300 dark:border-gray-700 transition-all z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold hover:text-gray-700 dark:hover:text-gray-400 transition-all"
      >
        vigneshwarancj
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex">
        <NavBar />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 right-5 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:hidden">
          <NavBar />
        </div>
      )}
    </header>
  );
};

export default Header;
