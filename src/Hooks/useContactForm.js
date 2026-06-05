import { useState } from "react";
import emailjs from "@emailjs/browser";
import { service_id, public_key, Template_ID } from "../Utils/const";

const useContactForm = () => {
  const [notification, setNotification] = useState("");

  const sendEmail = async (form) => {
    try {
      await emailjs.sendForm(service_id, Template_ID, form, public_key);
      setNotification("success");
      form.reset();
    } catch {
      setNotification("error");
    } finally {
      setTimeout(() => setNotification(""), 4000);
    }
  };

  return { notification, sendEmail };
};

export default useContactForm;
