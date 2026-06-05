import { Link, useLocation } from "react-router";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { useState, useEffect } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Publications", "Skills", "Social", "Contact"];

const NavBar = ({ mobile = false }) => {
  const [dark, setDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  const linkClass = (path) =>
    `relative font-medium transition-colors duration-200 ${
      mobile ? "block py-2 text-base" : "text-sm"
    } ${
      isActive(path)
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
    }`;

  const activeDot = (path) =>
    !mobile && isActive(path) ? (
      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
    ) : null;

  return (
    <nav
      className={`${
        mobile
          ? "flex flex-col space-y-1"
          : "flex items-center space-x-6"
      }`}
    >
      <Link to="/" className={linkClass("/")}>
        Home
        {activeDot("/")}
      </Link>

      {NAV_LINKS.map((item) => {
        const path = `/${item.toLowerCase()}`;
        return (
          <Link key={item} to={path} className={linkClass(path)}>
            {item}
            {activeDot(path)}
          </Link>
        );
      })}

      <button
        onClick={() => setDark((prev) => !prev)}
        className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm ${
          mobile ? "mt-2 self-start" : ""
        }`}
        aria-label="Toggle Theme"
      >
        {dark ? (
          <IoIosSunny className="text-yellow-400 w-5 h-5" />
        ) : (
          <IoIosMoon className="w-5 h-5" />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
