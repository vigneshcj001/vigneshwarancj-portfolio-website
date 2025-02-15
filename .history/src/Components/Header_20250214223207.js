import NavBar from "./NavBar";
import { Link } from "react-router";
const Header = () => {
  return (
    <header className="text-white bg-white dark:bg-black flex justify-between items-center p-4">
      <Link to="/" className="hover:text-white transition">
        <h3 className="font-sans text-xl font-bold">vigneshwarancj</h3>
      </Link>
      <NavBar />
    </header>
  );
};

export default Header;
