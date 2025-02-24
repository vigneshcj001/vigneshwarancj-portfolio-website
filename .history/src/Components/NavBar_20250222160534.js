import { Link } from "react-router-dom";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
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
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 text-center mt-4 mb-4 mx-auto">
      <Link
        to="/"
        className="font-medium hover:text-gray-600 dark:hover:text-gray-300"
      >
        Home
      </Link>
      {["About", "Projects", "Social", "Contact"].map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase()}`}
          className="font-medium hover:text-gray-600 dark:hover:text-gray-300"
        >
          {item}
        </Link>
      ))}

      {/* Theme Toggle Button */}
      <button
        onClick={() => setDark((prev) => !prev)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-all shadow-md mx-auto md:mx-0"
        aria-label="Toggle Theme"
      >
        {dark ? (
          <IoIosSunny className="text-yellow-400 w-6 h-6" />
        ) : (
          <IoIosMoon className="w-6 h-6" />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
