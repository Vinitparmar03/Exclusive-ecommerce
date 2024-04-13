import React, { useEffect, useState } from "react";
import "./CSS/Shipping.css";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../Redux/Reducer/CartReducer";
import toast from "react-hot-toast";
import axios from "axios";

const Shipping = () => {
  const {
    cartItems,
    total,
    shippingInfo: savedShippingInfo,
  } = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
    if (savedShippingInfo) {
      setShippingInfo(savedShippingInfo);
    }
  }, [cartItems, , savedShippingInfo]);

  const changeHandler = (e) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Breadcrum />
      <form onSubmit={submitHandler} className="shipping">
        <h1>Shipping Address</h1>
        <div className="input-area">
          <label>
            address <span>*</span>
          </label>
          <input
            name="address"
            type="text"
            value={shippingInfo.address}
            onChange={changeHandler}
          />
        </div>

        <div className="input-area">
          <label>
            City <span>*</span>
          </label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={changeHandler}
          />
        </div>

        <div className="input-area">
          <label>
            State <span>*</span>
          </label>
          <input
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={changeHandler}
          />
        </div>

        <div className="input-area">
          <label>
            country <span>*</span>
          </label>
          <input
            type="text"
            name="country"
            value={shippingInfo.country}
            onChange={changeHandler}
          />
        </div>

        <div className="input-area">
          <label>
            PinCode <span>*</span>
          </label>
          <input
            type="text"
            name="pinCode"
            value={shippingInfo.pinCode}
            onChange={changeHandler}
          />
        </div>

        <button type="submit">Pay</button>
      </form>
    </>
  );
};

export default Shipping;
