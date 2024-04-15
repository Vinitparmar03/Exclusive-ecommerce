import React from "react";
import ProductCard from "../Product Card/ProductCard";
import "./CheapProducts.css";
import { useCheapProductsQuery } from "../../Redux/api/productApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../Redux/Reducer/CartReducer";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton/Skeleton";

const MenFashion = () => {
  const { data, isLoading } = useCheapProductsQuery("");

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  return (
    <div className="discount-product">
      <h1>Cheap Products</h1>
      <hr />
      {isLoading ? (
        <Skeleton length={6} width="100%" />
      ) : (
        <div className="products">
          {data.products.map((i) => (
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
          ))}
        </div>
      )}

      <Link to="/search" className="btn">
        View All Products
      </Link>
    </div>
  );
};

export default MenFashion;
