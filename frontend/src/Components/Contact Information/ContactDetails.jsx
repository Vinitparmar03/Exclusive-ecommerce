import React from "react";
import "./ContactDeatails.css";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";

const ContactDetails = () => {
  return (
    <div className="contact-details">
      <div className="call-write">
        <div className="label">
          <span className="icon">
            <IoCallOutline />
          </span>
          Call To us
        </div>
        <p>we are available 24/7, 7 days a week.</p>
        <p>phone: +8801611112222</p>
      </div>
      <hr />
      <div className="call-write">
        <div className="call-write">
          <div className="label">
            <span className="icon">
              <IoMailOutline />
            </span>
            Call To us
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Emails: customer@exclusive.com</p>
          <p>Emails: support@exclusive.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
