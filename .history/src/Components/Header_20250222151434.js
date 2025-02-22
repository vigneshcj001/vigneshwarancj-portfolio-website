import { Link } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavBar from "./NavBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="text-gray-900 dark:text-white bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 flex justify-between items-center p-5 shadow-md transition-all border-b border-gray-300 dark:border-gray-700">
      {/* Brand Logo / Name */}
      <Link
        to="/"
        className="text-2xl font-bold font-sans hover:text-gray-700 dark:hover:text-gray-400 transition-all"
      >
        vigneshwarancj
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <NavBar />
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
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
