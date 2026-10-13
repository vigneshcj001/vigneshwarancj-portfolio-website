import { Link, useLocation } from "react-router";
import { IoIosSunny, IoIosMoon, IoIosLaptop } from "react-icons/io";
import { useLanguage } from "../Contexts/LanguageContext";

const NAV_LINKS = ["Projects", "Experience", "About", "Contact"];

const NavBar = ({ mobile = false, dark, theme, setTheme }) => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

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
    <div
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
          <Link key={item} to={path} aria-current={isActive(path) ? "page" : undefined} className={linkClass(path)}>
            {item}
            {activeDot(path)}
          </Link>
        );
      })}

      <Link to="/resume" className="primary-action">Résumé</Link>
      <button onClick={() => setLanguage(language === "en" ? "ta" : "en")} className="text-xs font-bold px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600" aria-label={`Switch language to ${language === "en" ? "Tamil" : "English"}`}>
        {language === "en" ? "தமிழ்" : "EN"}
      </button>
      <button
        onClick={() => setTheme(theme === "system" ? "light" : theme === "light" ? "dark" : "system")}
        className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm ${
          mobile ? "mt-2 self-start" : ""
        }`}
        aria-label={`Theme: ${theme}. Switch theme`}
        title={`Theme: ${theme}`}
      >
        {theme === "system" ? (
          <IoIosLaptop className="w-5 h-5" />
        ) : dark ? (
          <IoIosSunny className="text-yellow-400 w-5 h-5" />
        ) : (
          <IoIosMoon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default NavBar;
