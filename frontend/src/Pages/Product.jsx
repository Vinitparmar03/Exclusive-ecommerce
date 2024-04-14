import React, { useEffect } from "react";
import ProductDisplay from "../Components/Product Display/ProductDisplay";
import RelatedItems from "../Components/Related Items/RelatedItems";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import {
  useProductDetailsQuery,
  useRelatedProductsQuery,
} from "../Redux/api/productApi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Reducer/CartReducer";
import { toast } from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const { data: productData, isLoading } = useProductDetailsQuery(id);

  const { data: relatedProducts, isLoading: relatedProductsLoading } =
    useRelatedProductsQuery({
      category: productData?.product?.category,
      productId: id,
    });

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {isLoading || relatedProductsLoading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <Breadcrum />
          <ProductDisplay data={productData} handler={addToCartHandler} />
          <RelatedItems data={relatedProducts} />
        </>
      )}
    </div>
  );
};

export default Product;
