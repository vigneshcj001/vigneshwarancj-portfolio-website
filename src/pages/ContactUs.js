import { useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { SiBuymeacoffee } from "react-icons/si";
import { Send } from "lucide-react";
import useContactForm from "../Hooks/useContactForm.js";
import { BUY_ME_A_COFFEE_LINK } from "../Utils/const.js";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = useRef();
  const { notification, sendEmail } = useContactForm();

  const onSubmit = () => sendEmail(formRef.current);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black mb-3 bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Have a project in mind? Let's talk.
          </p>
        </motion.div>

        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl text-sm font-medium text-center ${
              notification === "success"
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50"
                : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50"
            }`}
          >
            {notification === "success"
              ? "Message sent successfully! I'll get back to you soon."
              : "Failed to send message. Please try again."}
          </motion.div>
        )}

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 shadow-sm"
        >
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  {...register("from_name", { required: "Name is required" })}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
                {errors.from_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.from_name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  {...register("from_email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
                {errors.from_email && (
                  <p className="text-red-500 text-xs mt-1">{errors.from_email.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows={5}
                placeholder="Tell me about your project or idea..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.01] text-sm"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Buy Me a Coffee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-8 text-center"
        >
          <a
            href={BUY_ME_A_COFFEE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-full shadow-md shadow-yellow-400/25 transition-all duration-200 hover:scale-105 text-sm"
          >
            <SiBuymeacoffee className="w-5 h-5" />
            Buy Me a Coffee
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
