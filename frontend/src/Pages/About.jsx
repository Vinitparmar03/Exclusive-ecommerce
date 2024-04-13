import React from "react";
import OurStory from "../Components/Our Story/OurStory";
import WebsiteData from "../Components/Website Data/WebsiteData";
import Features from "../Components/Features/Features";
import MainEmployee from "../Components/Main Employees/MainEmployee";
import Breadcrum from "../Components/Breadcrums/Breadcrum";

const About = () => {
  return (
    <div>
      <Breadcrum />
      <OurStory />
      <WebsiteData />
      <MainEmployee />
      <Features />
    </div>
  );
};

export default About;
