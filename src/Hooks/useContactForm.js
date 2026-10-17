import { useState } from "react";
import { trackConversion } from "../Utils/analytics";
import emailjs from "@emailjs/browser";
import { service_id, public_key, Template_ID } from "../Utils/const";
import { portfolioApi } from "../services/portfolioApi";

const useContactForm = () => {
  const [notification, setNotification] = useState("");
  const [sending, setSending] = useState(false);

  const sendEmail = async (form, onSuccess) => {
    if (sending) return;
    setSending(true);
    try {
      const values = Object.fromEntries(new FormData(form));
      if (values.website) { setNotification("success"); return; }
      await portfolioApi.contact({
        name: values.from_name, email: values.from_email, message: values.message, website: values.website || "",
      }).catch(() => null);
      await emailjs.sendForm(service_id, Template_ID, form, public_key);
      setNotification("success");
      trackConversion("contact_success");
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
