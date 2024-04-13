import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import "./ProductDisplay.css";
import { toast } from "react-hot-toast";

const ProductDisplay = ({ data, handler }) => {
  const [activeButton, setActiveButton] = useState(1);

  const [background, setBackground] = useState("");
  const [color, setColor] = useState("");
  const [buttonId, setButtonId] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const handleColorClick = (buttonId) => {
    setButtonId(buttonId);
    setColor("#ffffff");
    setBackground("#DB4444");
    setTimeout(() => {
      setColor("");
      setBackground("");
      setButtonId(null);
    }, 80);
  };

  const handleSizeClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const increment = () => {
    if (quantity >= data.product.stock) {
      if (data.product.stock === 0) toast.error("Out of stock");
      return;
    }
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (data.product.stock <= 0 || quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <div className="product-display">
      <div className="product-display-left">
        <div className="product-display-img-list">
          <img
            src={`${import.meta.env.VITE_SERVER}/${data.product.photo}`}
            alt=""
          />
          <img
            src={`${import.meta.env.VITE_SERVER}/${data.product.photo}`}
            alt=""
          />
          <img
            src={`${import.meta.env.VITE_SERVER}/${data.product.photo}`}
            alt=""
          />
          <img
            src={`${import.meta.env.VITE_SERVER}/${data.product.photo}`}
            alt=""
          />
        </div>
        <div className="product-display-img">
          <img
            className="product-display-main-img"
            src={`${import.meta.env.VITE_SERVER}/${data.product.photo}`}
            alt=""
          />
        </div>
      </div>

      <div className="product-display-right">
        <h3 className="title">{data.product.name}</h3>
        <div className="product-details">
          <div className="rating">
            {Array(data.product.rating)
              .fill()
              .map((_, i) => (
                <FaStar key={i} />
              ))}
          </div>

          <p className="review">(150 Reviews)</p>

          <div className="vertical"></div>

          <p className="stock-in-out">
            {data.product.stock > 0 ? (
              <div style={{ color: "#66FFA3" }}>In Stock</div>
            ) : (
              <div className="red">Out of Stock</div>
            )}
          </p>
        </div>
        <p className="price">₹{data.product.price}</p>
        <div className="product-description">{data.product.description}</div>
        <hr />
        <div className="product-sizes">
          <h1>Select Size: </h1>
          <div className="product-size">
            <div
              onClick={() => {
                handleSizeClick(1);
              }}
              className={activeButton === 1 ? "active" : ""}
            >
              S
            </div>
            <div
              onClick={() => {
                handleSizeClick(2);
              }}
              className={activeButton === 2 ? "active" : ""}
            >
              M
            </div>
            <div
              onClick={() => {
                handleSizeClick(3);
              }}
              className={activeButton === 3 ? "active" : ""}
            >
              L
            </div>
            <div
              onClick={() => {
                handleSizeClick(4);
              }}
              className={activeButton === 4 ? "active" : ""}
            >
              XL
            </div>
            <div
              onClick={() => {
                handleSizeClick(5);
              }}
              className={activeButton === 5 ? "active" : ""}
            >
              XXL
            </div>
          </div>
        </div>
        <div className="extras">
          <div className="quantity">
            <button
              style={buttonId === 1 ? { background, color } : {}}
              onClick={() => {
                handleColorClick(1);
                decrement();
              }}
            >
              -
            </button>
            <p>{data.product.stock > 0 ? quantity : 0}</p>
            <button
              style={buttonId === 2 ? { background, color } : {}}
              onClick={() => {
                handleColorClick(2);
                increment();
              }}
            >
              +
            </button>
          </div>
          <button
            className="add-to-cart"
            onClick={() =>
              handler({
                productId: data.product._id,
                price: data.product.price,
                name: data.product.name,
                photo: data.product.photo,
                stock: data.product.stock,
                quantity: quantity,
              })
            }
          >
            Add To Cart
          </button>
        </div>

        <div className="delivery-details">
          <div className="delivery">
            <FaShippingFast />
            <div className="free-delivery-details">
              <p>Free Delivery</p>
              <p>Enter your postal code for free delivery</p>
            </div>
          </div>
          <hr />
          <div className="delivery">
            <MdOutlineCurrencyExchange />
            <div className="free-delivery-details">
              <p>Return Delivery</p>
              <p>Free 30 days delivery return</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
