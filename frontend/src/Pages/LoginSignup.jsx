import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginSignUp.css";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../Redux/Reducer/UserReducer";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../Redux/api/userApi";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const registerUserCredentials = {
    email,
    password,
    name,
    gender,
    dob,
  };
  const loginUserCredentials = {
    email,
    password,
  };

  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginUserCredentials).unwrap();
      toast.success(response.message);
      navigate("/");

      dispatch(userExist(response.data));

      const userData = response.data;
      console.log(userData);
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      document.cookie = `userData=${JSON.stringify(
        userData
      )}; max-age=${maxAge}; `;

      const userDataCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userData="));

      if (userDataCookie) {
        const userDataString = userDataCookie.split("=")[1];
        const parsedUserData = JSON.parse(userDataString); // Rename the variable to avoid confusion
        console.log(parsedUserData);
      } else {
        console.log("userData cookie not found.");
      }
    } catch (err) {
      toast.error(err.data.message);
      console.error("Registration failed:", err);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(registerUserCredentials).unwrap();
      toast.success(response.message);
      console.log(response);
      navigate("/");
      dispatch(userExist(response.data));
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  return (
    <div className="login-signup">
      <div className="login-signup-left">
        <img
          src="https://media.istockphoto.com/id/1278570294/photo/e-commerce-online-shopping-mobile-phone-shop.jpg?s=612x612&w=0&k=20&c=SwHvgbiM6GQLBNegTovd4_PtZzpJlT647TA491pcHrY="
          alt=""
        />
      </div>
      <div className="login-signup-right">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {state === "Sign Up" ? (
            <>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <div>
                <label>Date of Birth:</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {state === "Login" ? (
            <button onClick={login}>Login</button>
          ) : (
            <button onClick={register} type="submit">
              Create Account
            </button>
          )}
        </div>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an Account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
