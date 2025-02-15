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
    <nav className="p-4 bg-white dark:bg-black text-black dark:text-white flex justify-center space-x-8 border-b border-gray-700">
      <Link to="/" className="hover:text-gray-700 transition">
        Home
      </Link>
      <Link to="/about" className="hover:text-gray-700 transition">
        About
      </Link>
      <Link to="/projects" className="hover:text-gray-700 transition">
        Projects
      </Link>
      <Link to="/social" className="hover:text-gray-700 transition">
        Social
      </Link>
      <Link to="/contact" className="hover:text-gray-700 transition">
        Contact
      </Link>
      <button
        onClick={darkModeHandler}
        className="ml-4 p-2 rounded-full bg-gray-800"
      >
        {dark ? <IoSunny className="text-yellow-400" /> : <IoMoon />}
      </button>
    </nav>
  );
};

export default NavBar;
