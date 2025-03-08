import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";

import {
  LINKEDIN_LINK,
  INSTAGRAM_LINK,
  GITHUB_LINK,
  X_LINK,
  YOUTUBE_LINK,
} from "../Utils/const";

const socialLinks = [
  {
    name: "LinkedIn",
    url: LINKEDIN_LINK,
    icon: (
      <FaLinkedin className="w-8 h-8 text-blue-600 hover:text-blue-800 transition-all" />
    ),
  },
  {
    name: "Instagram",
    url: INSTAGRAM_LINK,
    icon: (
      <FaInstagram className="w-8 h-8 text-pink-500 hover:text-pink-700 transition-all" />
    ),
  },
  {
    name: "GitHub",
    url: GITHUB_LINK,
    icon: (
      <FaGithub className="w-8 h-8 text-gray-800 hover:text-gray-900 transition-all" />
    ),
  },
  {
    name: "X (Twitter)",
    url: X_LINK,
    icon: (
      <FaXTwitter className="w-8 h-8 text-black hover:text-gray-600 transition-all" />
    ),
  },
  {
    name: "YouTube",
    url: YOUTUBE_LINK,
    icon: (
      <FaYoutube className="w-8 h-8 text-red-500 hover:text-red-700 transition-all" />
    ),
  },
];

const Footer = () => {
  return (
    <footer className="p-6 bg-gray-100 dark:bg-gray-900 text-center text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700">
      <p className="text-lg font-semibold">
        © {new Date().getFullYear()} Vigneshwaran.C.J | All Rights Reserved
      </p>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mt-4 flex-wrap">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-3 hover:scale-110 transition-transform"
            aria-label={link.name}
          >
            {link.icon}
            <p className="mt-2 text-sm font-medium">{link.name}</p>
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
