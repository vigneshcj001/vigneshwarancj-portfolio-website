import { useRef } from "react";
import { useForm } from "react-hook-form";
import useContactForm from "../Hooks/useContactForm.js";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const form = useRef();
  const { notification, sendEmail } = useContactForm();

  const onSubmit = () => {
    sendEmail(form.current);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Contact Me
      </h2>
      {notification && (
        <div
          className={`mb-4 p-4 rounded text-white ${
            notification.includes("successfully")
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {notification}
        </div>
      )}
      <form ref={form} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="from_name"
            {...register("from_name", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.from_name && (
            <p className="text-red-500 text-sm">{errors.from_name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="from_email"
            {...register("from_email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.from_email && (
            <p className="text-red-500 text-sm">{errors.from_email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            {...register("message", { required: "Message is required" })}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
