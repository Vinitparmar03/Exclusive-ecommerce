import React from "react";
import { Carousel } from "react-responsive-carousel";
import image from "../../assets/image.png";
import "./Slide.css";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const Slide = () => {
  return (
    <div className="carousel-container">
      <Carousel
        autoPlay={true}
        swipeable={true}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        infiniteLoop={true}
        stopOnHover={false}
        className="custom-carousel"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="custom-prev-button"
            >
              <FaChevronLeft />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="custom-next-button"
            >
              <FaChevronRight />
            </button>
          )
        }
      >
        <div>
          <img src={image} alt="Slide 1" />
        </div>
        <div>
          <img src={image} alt="Slide 2" />
        </div>
        <div>
          <img src={image} alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default Slide;
