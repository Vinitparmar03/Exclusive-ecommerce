import React from "react";
import "./CartHeader.css";

const CartHeader = () => {
  return (
    <div className="cart-header">
      <p>product</p>
      <p>price</p>
      <p>quantity</p>
      {/* <p>subtotal</p> */}
    </div>
  );
};

export default CartHeader;
