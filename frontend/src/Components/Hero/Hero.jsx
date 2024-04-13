import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slide from "../Slide/Slide";
import Categories from "../Categories/Categories";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <Categories />
      </div>
      <div className="verticle"></div>
      <div className="hero-right">
        <Slide />
      </div>
    </div>
  );
};

export default Hero;
