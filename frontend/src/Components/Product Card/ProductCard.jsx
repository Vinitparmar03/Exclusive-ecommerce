import React from "react";
import "./ProductCard.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({
  productId,
  name,
  photo,
  price,
  oldPrice,
  rating,
  handler,
  stock,
}) => {
  return (
    <div className="product-card">
      <div className="image">
        <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt="" />
        <div
          className="add-to-cart"
          onClick={() =>
            handler({ productId, price, name, photo, stock, quantity: 1 })
          }
        >
          Add To Cart
        </div>
      </div>
      <Link to={`/product/${productId}`} className="link-style">
        <p>{name}</p>
      </Link>
      <div className="product-price">
        <div className="product-price-new">₹{price}</div>
        <div className="product-price-old">₹{oldPrice}</div>
      </div>
      <div className="rating">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <FaStar key={i} />
          ))}
        (100)
      </div>
    </div>
  );
};

export default ProductCard;
