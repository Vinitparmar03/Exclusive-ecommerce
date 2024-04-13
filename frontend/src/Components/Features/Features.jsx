import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BsShieldFillCheck } from "react-icons/bs";
import "./Features.css";

const Features = () => {
  return (
    <div className="features">
      <div className="feature">
        <div className="circle-one">
          <div className="circle-two">
            <FaShippingFast />
          </div>
        </div>
        <p>FREE AND FAST DELIVERY</p>
        <p>Free Deliveries for all orders over ₹700</p>
      </div>
      <div className="feature">
        <div className="circle-one">
          <div className="circle-two">
            <RiCustomerService2Fill />
          </div>
        </div>
        <p>24/7 CUSTOMER SERVICE</p>
        <p>Friendly 24/7 customer support</p>
      </div>
      <div className="feature">
        <div className="circle-one">
          <div className="circle-two">
            <BsShieldFillCheck />
          </div>
        </div>
        <p>MONEY BACK GUARANTEE</p>
        <p>We reurn money within 30 days</p>
      </div>
    </div>
  );
};

export default Features;
