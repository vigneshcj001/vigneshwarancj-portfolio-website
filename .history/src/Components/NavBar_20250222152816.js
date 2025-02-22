import { Link } from "react-router";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [dark, setDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <nav className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex justify-between items-center border-b border-gray-300 dark:border-gray-700 shadow-md transition-all">
      <div className="flex space-x-6">
        <Link
          to="/"
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300"
        >
          About
        </Link>
        <Link
          to="/projects"
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300"
        >
          Projects
        </Link>
        <Link
          to="/social"
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300"
        >
          Social
        </Link>
        <Link
          to="/contact"
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300"
        >
          Contact
        </Link>
      </div>

      <button
        onClick={() => setDark((prev) => !prev)}
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
