import { motion } from "framer-motion";

const PageHeader = ({ title, subtitle, badge }) => (
  <motion.div
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-14"
  >
    {badge && (
      <span className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800/40 uppercase tracking-wider">
        {badge}
      </span>
    )}
    <h1 className="text-5xl font-black mb-3 bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      {title}
    </h1>
    <div className="flex justify-center mb-4">
      <div className="h-0.5 w-16 rounded-full bg-linear-to-r from-blue-500 to-violet-500 opacity-60" />
    </div>
    {subtitle && (
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default PageHeader;
