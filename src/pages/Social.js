import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { socialLinks } from "../data/social.js";
import PageHeader from "../Components/ui/PageHeader.js";

const Social = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          badge="Online Presence"
          title="Connect"
          subtitle="Connect professionally on LinkedIn, explore open-source work on GitHub, or follow updates and research across other platforms."
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
              <div className={`shrink-0 w-11 h-11 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{handle}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate leading-tight">{description}</p>
              </div>

              <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors shrink-0" />
            </motion.a>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-400 dark:text-gray-600 mt-10"
        >
          Open to research collaborations, technical discussions, and professional opportunities.
        </motion.p>
      </div>
    </div>
  );
};

export default Social;
