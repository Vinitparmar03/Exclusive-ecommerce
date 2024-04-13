import React from "react";
import ProductCard from "../Product Card/ProductCard";
import "./OurProducts.css";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useLatestProductsQuery } from "../../Redux/api/productApi";
import { addToCart } from "../../Redux/Reducer/CartReducer";
import { Link } from "react-router-dom";

const OurProducts = () => {
  const { data, isLoading } = useLatestProductsQuery("");

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  return (
    <div className="our-products">
      <h1>Explore Our Products</h1>
      <hr />
      <div className="products">
        {isLoading ? (
          <h1>loading...</h1>
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
              oldPrice={i.oldPrice}
              rating={i.rating}
            />
          ))
        )}
      </div>

      <Link to="/search" className="btn">
        View All Products
      </Link>
    </div>
  );
};

export default OurProducts;
