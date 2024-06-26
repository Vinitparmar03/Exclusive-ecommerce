import React, { useEffect } from "react";
import Hero from "../Components/Hero/Hero";
import Banner from "../Components/Banner/Banner";
import OurProducts from "../Components/Our Products/OurProducts";
import Features from "../Components/Features/Features";
import CheapProducts from "../Components/Cheap Products/CheapProducts";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <Hero />
      <CheapProducts />
      <Banner />
      <OurProducts />
      <Features />
    </div>
  );
};

export default Home;
