import React from "react";
import "./SendContactDetails.css";

const SendContactDetails = () => {
  return (
    <div className="container">
      <div className="contact-fields">
        <input
          type="text"
          className="item1"
          placeholder="Your Name *"
          required
        />
        <input
          type="text"
          className="item2"
          placeholder="Your Email *"
          required
        />
        <input
          type="text"
          className="item3"
          placeholder="Your Phone *"
          required
        />
        <textarea className="item4" placeholder="Your Message *" required />
      </div>
      <button className="btn">Send Message</button>
    </div>
  );
};

export default SendContactDetails;
