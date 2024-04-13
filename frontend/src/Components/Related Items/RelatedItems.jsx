import React, { useEffect } from "react";
import ProductCard from "../Product Card/ProductCard";
import "./RelatedItem.css";
import { useDispatch } from "react-redux";

const RelatedItems = ({ data }) => {
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };
  return (
    <div className="related-product">
      {data.relatedProducts.length > 0 && (
        <>
          <h1>Related Items</h1> <hr />
        </>
      )}

      <div className="products">
        {data.relatedProducts.map((i) => (
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
    </div>
  );
};

export default RelatedItems;
