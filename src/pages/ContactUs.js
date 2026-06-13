import { useRef } from "react";
import { useForm } from "react-hook-form";
import useMeta from "../Hooks/useMeta.js";
import { motion } from "framer-motion";
import { SiBuymeacoffee } from "react-icons/si";
import { FiMail, FiLinkedin } from "react-icons/fi";
import { Send, Loader2 } from "lucide-react";
import useContactForm from "../Hooks/useContactForm.js";
import { BUY_ME_A_COFFEE_LINK, LINKEDIN_LINK } from "../Utils/const.js";

const CONTACT_INFO = [
  { Icon: FiMail,     label: "Email",    value: "vigneshwarancj@gmail.com", href: "mailto:vigneshwarancj@gmail.com" },
  { Icon: FiLinkedin, label: "LinkedIn", value: "in/vigneshwarancj1",       href: LINKEDIN_LINK },
];

const ContactUs = () => {
  useMeta("Contact", "Get in touch with Vigneshwaran C.J. for research collaborations, technical projects, or professional opportunities.");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const formRef = useRef();
  const { notification, sending, sendEmail } = useContactForm();

  const onSubmit = () => sendEmail(formRef.current, reset);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800/40 uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="text-5xl font-black mb-3 bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Contact
          </h1>
          <div className="flex justify-center mb-4">
            <div className="h-0.5 w-16 rounded-full bg-linear-to-r from-blue-500 to-violet-500 opacity-60" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
            Open to research collaborations, technical projects, and professional opportunities.
          </p>
        </motion.div>

        {/* Quick contact row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          {CONTACT_INFO.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <Icon className="w-4 h-4 text-blue-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {value}
                </p>
              </div>
            </a>
          ))}
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
              ? "Message sent successfully. I will respond at the earliest opportunity."
              : "Message could not be sent. Please try again or reach out directly via email."}
          </motion.div>
        )}

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm"
        >
          <div className="h-0.5 w-full bg-linear-to-r from-blue-500 via-violet-500 to-pink-500" />
          <div className="p-7">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">
              Send a Message
            </p>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("from_name", { required: "Name is required" })}
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                  {errors.from_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.from_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("from_email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                        message: "Enter a valid email address",
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
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows={5}
                  placeholder="Describe your project, research enquiry, or collaboration proposal..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.01] text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {sending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Sending...</>
                ) : (
                  <><Send className="w-4 h-4" />Send Message</>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
            If my work has been helpful, consider supporting it.
          </p>
          <a
            href={BUY_ME_A_COFFEE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-full shadow-md shadow-yellow-400/25 transition-all duration-200 hover:scale-105 text-sm"
          >
            <SiBuymeacoffee className="w-4 h-4" />
            Buy Me a Coffee
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
