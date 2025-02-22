import { Link } from "react-router";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [dark, setDark] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  const darkModeHandler = () => {
    setDark((prev) => !prev);
  };

  return (
    <nav className="p-4 bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white flex justify-between items-center border-b border-gray-300 dark:border-gray-700 shadow-md transition-all">
      <div className="flex space-x-6">
        <Link
          to="/"
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300 transition duration-200"
        >
          About
        </Link>
        <Link
          to="/projects"
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300 transition duration-200"
        >
          Projects
        </Link>
        <Link
          to="/social"
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300 transition duration-200"
        >
          Social
        </Link>
        <Link
          to="/contact"
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300 transition duration-200"
        >
          Contact
        </Link>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={darkModeHandler}
        className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-all shadow-md"
      >
        {dark ? (
          <IoSunny className="text-yellow-400 w-6 h-6" />
        ) : (
          <IoMoon className="w-6 h-6" />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
