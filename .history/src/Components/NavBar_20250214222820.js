import { Link } from "react-router";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useState } from "react";

const NavBar = () => {
  const [dark, setDark] = useState(false);

  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  // Whenever the user explicitly chooses light mode
  localStorage.theme = "light";
  // Whenever the user explicitly chooses dark mode
  localStorage.theme = "dark";
  // Whenever the user explicitly chooses to respect the OS preference
  localStorage.removeItem("theme");

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
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
      <button onClick={() => darkModeHandler()}>
        {dark && <IoSunny />}
        {!dark && <IoMoon />}
      </button>
    </nav>
  );
};

export default NavBar;
