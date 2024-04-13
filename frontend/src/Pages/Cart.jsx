import React, { useEffect } from "react";
import CartHeader from "../Components/Cart/CartHeader";
import "./CSS/Cart.css";
import CartItem from "../Components/Cart/CartItem";
import CartTotal from "../Components/Cart Total/CartTotal";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../Redux/Reducer/CartReducer";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state) => state.cartReducer);

  const [couponCode, setCouponCode] = useState("");
  const [isValidCouponCode, setIsValidCouponCode] = useState(false);

  const dispatch = useDispatch();

  const incrementHandler = (cartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const timeOutId = setTimeout(() => {
      axios
        .get(
          `${
            import.meta.env.VITE_SERVER
          }/api/v1/payment/discount?coupon=${couponCode}`,
          {
            cancelToken: token,
          }
        )
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
  return (
    <>
      <Breadcrum />
      <div className="cart">
        <CartHeader />

        {cartItems.length > 0 ? (
          cartItems.map((item, idx) => (
            <CartItem
              increamentHandler={incrementHandler}
              decreamentHandler={decrementHandler}
              removeHandler={removeHandler}
              cartItem={item}
              key={idx}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}

        <CartTotal
          subtotal={subtotal}
          tax={tax}
          discount={discount}
          total={total}
          shippingCharges={shippingCharges}
          setCouponCode={setCouponCode}
          isValidCouponCode={isValidCouponCode}
          couponCode={couponCode}
          cartItems={cartItems}
        />
      </div>
    </>
  );
};

export default Cart;
