import { useRef } from "react";
import { useForm } from "react-hook-form";
import useContactForm from "../Hooks/useContactForm.js";
import { SiBuymeacoffee } from "react-icons/si";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = useRef();
  const { notification, sendEmail } = useContactForm();

  const onSubmit = () => {
    sendEmail(formRef.current);
  };

  return (
    <div className="max-w-5xl mx-auto p-35 px-6 sm:px-10">
      <div className="p-10 bg-transparent dark:bg-transparent rounded-3xl shadow-2xl border border-gray-300 dark:border-gray-700">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-10 animate-pulse">
          ✉️ Get in Touch
        </h2>

        {/* Notification Banner */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg text-white text-center font-medium ${
              notification.includes("successfully")
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {notification}
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Name and Email */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2">
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                {...register("from_name", { required: "Name is required" })}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {errors.from_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.from_name.message}
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
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
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {errors.from_email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.from_email.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              rows="5"
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white text-lg font-semibold rounded-lg shadow-lg"
          >
            🚀 Send Message
          </button>
        </form>

        {/* Buy Me a Coffee Button */}
        <div className="mt-10 text-center">
          <a
            href="https://www.buymeacoffee.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            <SiBuymeacoffee className="w-6 h-6" />
            Buy Me a Coffee
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
