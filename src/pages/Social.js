import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { socialLinks } from "../data/social.js";
import PageHeader from "../Components/ui/PageHeader.js";

const Social = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title="Connect"
          subtitle="Find me across platforms — professional, academic, and creative."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map(({ name, handle, description, url, Icon, gradient, ring }, idx) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className={`group flex items-center gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 ring-0 hover:ring-2 ${ring}`}
            >
              {/* Icon */}
              <div className={`shrink-0 w-12 h-12 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-md`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{handle}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">{description}</p>
              </div>

              {/* Arrow */}
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors shrink-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Social;
