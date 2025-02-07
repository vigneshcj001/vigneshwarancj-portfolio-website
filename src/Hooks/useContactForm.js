import { useState } from "react";
import emailjs from "emailjs-com";
import { service_id, public_key, Template_ID } from "../Utils/const";
const useContactForm = () =>{
    const [notification, setNotification] = useState("");

    const sendEmail = async (form) =>{
        try{
            await emailjs.sendForm(service_id, Template_ID, form, public_key);
            setNotification("Email sent successfully");
            form.reset();
        } catch (error){
            setNotification("Email sending failed");
        }
    };
    return {notification, sendEmail};
};
export default useContactForm;