import React from "react";
import { Carousel } from "react-responsive-carousel";
import image1 from "../../assets/image.png";
import image2 from "../../assets/horizontal-banner-template-big-sale-with-woman-shopping-bags_23-2148786755.avif";
import image3 from "../../assets/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.avif";
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
          <img src={image1} alt="Slide 1" />
        </div>
        <div>
          <img src={image2} alt="Slide 2" />
        </div>
        <div>
          <img src={image3} alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default Slide;
