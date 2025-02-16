import { useRef } from "react";
import { useForm } from "react-hook-form";
import useContactForm from "../Hooks/useContactForm.js";

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
    <div className="max-w-4xl mx-auto p-8 mt-14 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-600 flex justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-6">
          Contact Me
        </h2>

        {/* Success/Error Notification */}
        {notification && (
          <div
            className={`mb-4 p-4 rounded text-white text-center ${
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
          className="space-y-6"
        >
          {/* Name & Email Fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                {...register("from_name", { required: "Name is required" })}
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.from_name && (
                <p className="text-red-500 text-sm">
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
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.from_email && (
                <p className="text-red-500 text-sm">
                  {errors.from_email.message}
                </p>
              )}
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              rows="5"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-md shadow-md focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
