import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";

import {
  LINKEDIN_LINK,
  INSTAGRAM_LINK,
  GITHUB_LINK,
  X_LINK,
  YOUTUBE_LINK,
  BUY_ME_A_COFFEE_LINK,
} from "../Utils/const.js";

const socialLinks = [
  {
    name: "LinkedIn",
    url: LINKEDIN_LINK,
    icon: (
      <FaLinkedin className="w-12 h-12 text-white group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
    ),
    bg: "bg-gradient-to-br from-blue-500 to-blue-700",
    emoji: "💼",
  },
  {
    name: "Instagram",
    url: INSTAGRAM_LINK,
    icon: (
      <FaInstagram className="w-12 h-12 text-white group-hover:scale-110 group-hover:rotate-6 transition-transform" />
    ),
    bg: "bg-gradient-to-br from-pink-500 to-purple-700",
    emoji: "📸",
  },
  {
    name: "GitHub",
    url: GITHUB_LINK,
    icon: (
      <FaGithub className="w-12 h-12 text-white group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
    ),
    bg: "bg-gradient-to-br from-gray-800 to-gray-900",
    emoji: "💻",
  },
  {
    name: "X (Twitter)",
    url: X_LINK,
    icon: (
      <FaXTwitter className="w-12 h-12 text-white group-hover:scale-110 group-hover:rotate-6 transition-transform" />
    ),
    bg: "bg-gradient-to-br from-black to-gray-700",
    emoji: "🐦",
  },
  {
    name: "YouTube",
    url: YOUTUBE_LINK,
    icon: (
      <FaYoutube className="w-12 h-12 text-white group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
    ),
    bg: "bg-gradient-to-br from-red-500 to-red-700",
    emoji: "🎥",
  },
  {
    name: "Buy Me a Coffee",
    url: BUY_ME_A_COFFEE_LINK,
    icon: (
      <SiBuymeacoffee className="w-12 h-12 text-white group-hover:scale-110 group-hover:rotate-6 transition-transform" />
    ),
    bg: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    emoji: "☕",
  },
];

const Social = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-br from-gray-100/90 via-white/70 to-gray-100/90 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-lg">
      <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-12 animate-pulse">
        🌐 Connect with Me
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl border border-white/10 hover:border-blue-300 transition-all duration-300 hover:scale-105 ${link.bg}`}
          >
            <div className="absolute top-2 right-2 bg-white/10 px-2 py-1 text-sm rounded-full text-white font-semibold backdrop-blur-md">
              {link.emoji}
            </div>
            {link.icon}
            <p className="mt-4 text-lg font-bold text-white">{link.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Social;
