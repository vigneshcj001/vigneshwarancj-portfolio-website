import { FaLinkedin, FaGithub, FaXTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";
import {
  LINKEDIN_LINK,
  INSTAGRAM_LINK,
  GITHUB_LINK,
  X_LINK,
  YOUTUBE_LINK,
  BUY_ME_A_COFFEE_LINK,
} from "../Utils/const";

const FOOTER_LINKS = [
  { name: "LinkedIn",        url: LINKEDIN_LINK,        Icon: FaLinkedin    },
  { name: "GitHub",          url: GITHUB_LINK,          Icon: FaGithub      },
  { name: "Instagram",       url: INSTAGRAM_LINK,       Icon: FaInstagram   },
  { name: "X",               url: X_LINK,               Icon: FaXTwitter    },
  { name: "YouTube",         url: YOUTUBE_LINK,         Icon: FaYoutube     },
  { name: "Buy Me a Coffee", url: BUY_ME_A_COFFEE_LINK, Icon: SiBuymeacoffee },
];

const Footer = () => (
  <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 backdrop-blur-sm">
    <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-gray-400 dark:text-gray-500">
        © {new Date().getFullYear()} Vigneshwaran C. J. — All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        {FOOTER_LINKS.map(({ name, url, Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
