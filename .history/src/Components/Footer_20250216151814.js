import { Link } from "react-router"; 
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import {
  GITHUB_LINK,
  LINKEDIN_LINK,
  X_LINK,
  INSTAGRAM_LINK,
  YOUTUBE_LINK,
} from "../Utils/const"; // Import all links

const Footer = () => {
  return (
    <footer className="p-6 bg-gray-200 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300 transition-all border-t border-gray-300 dark:border-gray-700">
      <p className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
        © 2025 Vigneshwaran.C.J | All Rights Reserved
      </p>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 mt-4">
        <Link
          to={{ pathname: GITHUB_LINK }}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all text-xl"
        >
          <FaGithub />
        </Link>
        <Link
          to={{ pathname: LINKEDIN_LINK }}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-all text-xl"
        >
          <FaLinkedin />
        </Link>
        <Link
          to={{ pathname: X_LINK }}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 transition-all text-xl"
        >
          <FaTwitter />
        </Link>
        <Link
          to={{ pathname: INSTAGRAM_LINK }}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 dark:text-pink-300 hover:text-pink-700 dark:hover:text-pink-100 transition-all text-xl"
        >
          <FaInstagram />
        </Link>
        <Link
          to={{ pathname: YOUTUBE_LINK }}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-100 transition-all text-xl"
        >
          <FaYoutube />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
