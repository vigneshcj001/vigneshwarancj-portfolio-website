import React from "react";
import { FaLinkedin, FaGithub, FaXTwitter, FaYoutube } from "react-icons/fa6";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vigneshwaran-cj",
    icon: <FaLinkedin className="w-12 h-12 text-white" />,
    bg: "bg-gradient-to-r from-blue-500 to-blue-700",
  },
  {
    name: "GitHub",
    url: "https://github.com/vigneshwarancj",
    icon: <FaGithub className="w-12 h-12 text-white" />,
    bg: "bg-gradient-to-r from-gray-800 to-gray-900",
  },
  {
    name: "X (Twitter)",
    url: "https://twitter.com/vigneshwarancj",
    icon: <FaXTwitter className="w-12 h-12 text-white" />,
    bg: "bg-gradient-to-r from-black to-gray-700",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@vigneshwarancj",
    icon: <FaYoutube className="w-12 h-12 text-white" />,
    bg: "bg-gradient-to-r from-red-500 to-red-700",
  },
];

const Social = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        🌐 Connect with Me
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform ${link.bg}`}
          >
            {link.icon}
            <p className="mt-4 text-lg font-semibold text-white">{link.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Social;
