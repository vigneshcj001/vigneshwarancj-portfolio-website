// Header Component
import { Link } from "react-router";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex justify-between items-center p-4 shadow-md">
      <Link
        to="/"
        className="hover:text-gray-700 dark:hover:text-gray-300 transition"
      >
        <h3 className="font-sans text-xl font-bold">vigneshwarancj</h3>
      </Link>
      <NavBar />
    </header>
  );
};

export default Header;
