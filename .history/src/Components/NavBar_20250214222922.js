import { Link } from "react-router-dom";
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
    <nav className="p-4 bg-black text-gray-300 flex justify-center space-x-8 border-b border-gray-700">
      <Link to="/" className="hover:text-white transition">
        Home
      </Link>
      <Link to="/about" className="hover:text-white transition">
        About
      </Link>
      <Link to="/projects" className="hover:text-white transition">
        Projects
      </Link>
      <Link to="/social" className="hover:text-white transition">
        Social
      </Link>
      <Link to="/contact" className="hover:text-white transition">
        Contact
      </Link>
      <button onClick={darkModeHandler} className="ml-4 p-2 rounded-full bg-gray-800">
        {dark ? <IoSunny className="text-yellow-400" /> : <IoMoon />}
      </button>
    </nav>
  );
};

export default NavBar;
