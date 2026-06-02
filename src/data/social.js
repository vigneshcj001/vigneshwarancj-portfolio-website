import { FaLinkedin, FaGithub, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";
import {
  LINKEDIN_LINK,
  INSTAGRAM_LINK,
  GITHUB_LINK,
  X_LINK,
  YOUTUBE_LINK,
  BUY_ME_A_COFFEE_LINK,
} from "../Utils/const.js";

export const socialLinks = [
  {
    name: "LinkedIn",
    handle: "@vigneshwarancj1",
    description: "Professional network & career updates",
    url: LINKEDIN_LINK,
    Icon: FaLinkedin,
    gradient: "from-blue-500 to-blue-700",
    ring: "ring-blue-500/30",
  },
  {
    name: "GitHub",
    handle: "@vigneshcj001",
    description: "Open-source projects & code",
    url: GITHUB_LINK,
    Icon: FaGithub,
    gradient: "from-gray-700 to-gray-900",
    ring: "ring-gray-500/30",
  },
  {
    name: "Instagram",
    handle: "@vigneshwarancj1",
    description: "Life, research, and behind-the-scenes",
    url: INSTAGRAM_LINK,
    Icon: FaInstagram,
    gradient: "from-pink-500 to-purple-700",
    ring: "ring-pink-500/30",
  },
  {
    name: "X (Twitter)",
    handle: "@vigneshwarancj",
    description: "Thoughts on AI, biotech & tech",
    url: X_LINK,
    Icon: FaXTwitter,
    gradient: "from-gray-800 to-black",
    ring: "ring-gray-500/30",
  },
  {
    name: "YouTube",
    handle: "@vigneshwarancj",
    description: "Tech demos and research walkthroughs",
    url: YOUTUBE_LINK,
    Icon: FaYoutube,
    gradient: "from-red-500 to-red-700",
    ring: "ring-red-500/30",
  },
  {
    name: "Buy Me a Coffee",
    handle: "@vigneshwarancj",
    description: "Support my open-source work",
    url: BUY_ME_A_COFFEE_LINK,
    Icon: SiBuymeacoffee,
    gradient: "from-yellow-400 to-amber-600",
    ring: "ring-yellow-400/30",
  },
];
