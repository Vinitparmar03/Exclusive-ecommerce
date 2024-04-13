import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./MainEmployee.css";
const cardData = [
  {
    id: 1,
    image:
      "https://media.istockphoto.com/id/1413766111/photo/cheerful-mid-adult-business-woman-smiling-at-office.jpg?s=612x612&w=0&k=20&c=l3sntoOvUWypCazFpknMtzyoXd2rg3nLilLtXJ8PEeo=",
    name: "rahul",
    role: "Managing Director",
    twitter: "twitter.com",
    facebook: "facebook.com",
    instagram: "instagram.com",
  },
  {
    id: 2,
    image:
      "https://media.istockphoto.com/id/1500804037/photo/happy-confidence-and-portrait-of-a-businesswoman-in-the-office-with-digital-tablet-for.jpg?s=612x612&w=0&k=20&c=3pLXaNezczpibazHXRDnK64JEULYLOLZtLS38I40KR0=",
    name: "arjun",
    role: "Founder & Chairmen",
    twitter: "twitter.com",
    facebook: "facebook.com",
    instagram: "instagram.com",
  },
  {
    id: 3,
    image:
      "https://media.istockphoto.com/id/1265471148/photo/head-shot-portrait-of-smiling-asian-businesswoman-standing-in-office.jpg?s=612x612&w=0&k=20&c=wWtAkbyXTJh2zhgjEggD6-dcPgYe5YuozIrR_uJwdmY=",
    name: "kunal",
    role: "Product Designer",
    twitter: "twitter.com",
    facebook: "facebook.com",
    instagram: "instagram.com",
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8TUWjAwCQe3bXqGRzdvR-xYrw1foi9Cp56A&usqp=CAU",
    name: "harsh",
    role: "Software Developer",
    twitter: "twitter.com",
    facebook: "facebook.com",
    instagram: "instagram.com",
  },
  {
    id: 5,
    image:
      "data:image/jpeg;base64,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",
    name: "vinit",
    role: "Product Manager",
    twitter: "twitter.com",
    facebook: "facebook.com",
    instagram: "instagram.com",
  },
  // Add more cards as needed
];

const MainEmployee = () => {
  let [imageCount, setImageCount] = useState(33.33);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900 && window.innerWidth > 600) {
        setImageCount(60);
      } else if (window.innerWidth <= 600) {
        setImageCount(100);
      } else {
        setImageCount(33.33);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Carousel
      autoPlay={true}
      showThumbs={false}
      swipeable={true}
      showArrows={true}
      showStatus={false}
      emulateTouch={true}
      infiniteLoop={true}
      centerMode={true}
      centerSlidePercentage={imageCount}
      className="main-employees"
    >
      {cardData.map((card) => (
        <div
          key={card.id}
          className="employee-card"
          style={{ padding: "0 20px" }}
        >
          <img src={card.image} alt="" />
          <h2>{card.name}</h2>
          <p>{card.role}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default MainEmployee;
