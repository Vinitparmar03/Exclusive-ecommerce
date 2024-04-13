import React from "react";
import iphone from "../../assets/iphone.png";
import { FaApple } from "react-icons/fa";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-left">
        <p>
          <FaApple />
          iphone15
        </p>
        <h1>Newphone</h1>
        <p>Available Now</p>

        <button>Buy Now</button>
      </div>
      <div className="banner-right">
        <img src={iphone} alt="" />
      </div>
    </div>
  );
};

export default Banner;
