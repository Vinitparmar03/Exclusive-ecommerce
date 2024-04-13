import React, { useState } from "react";
import "./CartTotal.css";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";

const CartTotal = ({
  subtotal,
  tax,
  discount,
  total,
  shippingCharges,
  setCouponCode,
  isValidCouponCode,
  couponCode,
  cartItems,
}) => {
  const [coupon, setCoupon] = useState("");
  return (
    <div className="checkout">
      <div className="coupon-code">
        <div className="apply-coupon">
          <input
            type="text"
            placeholder="coupon-code"
            onChange={(e) => setCoupon(e.target.value)}
            value={coupon}
          />
          <button onClick={() => setCouponCode(coupon)}>Apply Coupon</button>
        </div>
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
      </div>
      <div className="cart-total">
        <h2>Cart Total</h2>
        <div className="cart-total-data">
          <p>Subtotal:</p>
          <p>₹{subtotal}</p>
        </div>
        <div className="cart-total-data">
          <p>Shipping Charges:</p>
          <p>₹{shippingCharges}</p>
        </div>
        <div className="cart-total-data">
          <p>Tax:</p>
          <p>₹{tax}</p>
        </div>
        <div className="cart-total-data">
          <p>Discount:</p>
          <p>₹{discount}</p>
        </div>
        <div className="cart-total-data">
          <p>Total:</p>
          <p>₹{total}</p>
        </div>

        {cartItems.length > 0 && (
          <Link className="shipping-button" to="/shipping">
            Proceed To Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
