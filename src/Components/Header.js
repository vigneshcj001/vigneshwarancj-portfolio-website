import { Link } from "react-router";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="text-gray-900 dark:text-white bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 flex justify-between items-center p-5 shadow-md transition-all border-b border-gray-300 dark:border-gray-700">
      {/* Brand Logo / Name */}
      <Link
        to="/"
        className="text-2xl font-bold font-sans hover:text-gray-700 dark:hover:text-gray-400 transition-all"
      >
        vigneshwarancj
      </Link>

      {/* Navigation Bar */}
      <NavBar />
    </header>
  );
};

export default Header;
