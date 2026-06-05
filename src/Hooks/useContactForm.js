import { useState } from "react";
import emailjs from "@emailjs/browser";
import { service_id, public_key, Template_ID } from "../Utils/const";

const useContactForm = () => {
  const [notification, setNotification] = useState("");
  const [sending, setSending] = useState(false);

  const sendEmail = async (form, onSuccess) => {
    if (sending) return;
    setSending(true);
    try {
      await emailjs.sendForm(service_id, Template_ID, form, public_key);
      setNotification("success");
      form.reset();
      if (onSuccess) onSuccess();
    } catch {
      setNotification("error");
    } finally {
      setSending(false);
      setTimeout(() => setNotification(""), 4000);
    }
  };

  return { notification, sending, sendEmail };
};

export default useContactForm;
