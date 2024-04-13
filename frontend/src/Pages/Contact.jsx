import React from "react";
import ContactDetails from "../Components/Contact Information/ContactDetails";
import "./CSS/Contact.css";
import SendContactDetails from "../Components/Contact Information/SendContactDetails";

const Contact = () => {
  return (
    <div className="contact">
      <ContactDetails />
      <SendContactDetails />
    </div>
  );
};

export default Contact;
