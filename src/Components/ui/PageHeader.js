import { motion } from "framer-motion";

const PageHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-14"
  >
    <h1 className="text-5xl font-black mb-3 bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      {title}
    </h1>
    {subtitle && (
      <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default PageHeader;
