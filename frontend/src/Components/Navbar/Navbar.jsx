import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser, FaSearch, FaUser } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { IoCartOutline, IoMenu } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import { useLogoutUserMutation } from "../../Redux/api/userApi";
import { userNotExist } from "../../Redux/Reducer/UserReducer";

const Navbar = () => {
  const [menu, setmenu] = useState("home");
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const menuRef = useRef();
  const accountRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.data.success) {
        dispatch(userNotExist());
        setmenu("login");
        setTimeout(() => {
          navigate("/login");
        }, 100);
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.success(response.data.message);
      console.log("Login failed", err);
    }
  };

  const removeAccountDetails = (state) => {
    setState(state);

    setTimeout(() => {
      setState("");
    }, 100);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <h2>Exclusive</h2>
      </div>
      <IoMenu className="hamburger" onClick={dropdown_toggle} />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setmenu("home");
            menuRef.current.classList.remove("nav-menu-visible");
          }}
        >
          <Link to="/">Home</Link>
          {menu === "home" ? <hr /> : <></>}
        </li>

        <li
          onClick={() => {
            setmenu("contact");
            menuRef.current.classList.remove("nav-menu-visible");
          }}
        >
          <Link to="/contact">Contact</Link>
          {menu === "contact" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("about");
            menuRef.current.classList.remove("nav-menu-visible");
          }}
        >
          <Link to="/about">About</Link>
          {menu === "about" ? <hr /> : <></>}
        </li>

        {user ? (
          <>
            <li
              onClick={() => {
                setmenu("search");
                menuRef.current.classList.remove("nav-menu-visible");
              }}
            >
              <Link to="/search">
                <FaSearch />
                search
              </Link>
              {menu === "login" ? <hr /> : <></>}
            </li>
          </>
        ) : (
          <li
            onClick={() => {
              setmenu("login");
              menuRef.current.classList.remove("nav-menu-visible");
            }}
          >
            <Link to="/login">
              <FaUser />
              Login
            </Link>
            {menu === "login" ? <hr /> : <></>}
          </li>
        )}
      </ul>

      <div className="nav-cart">
        <Link
          onClick={() => setmenu("cart")}
          to="/cart"
          style={{ textDecoration: "none", color: "black" }}
        >
          <IoCartOutline className="cart" />
        </Link>

        {user ? (
          <div
            className="account"
            onClick={
              state !== "" ? (
                <></>
              ) : (
                () => {
                  accountRef.current.classList.add("account-menu-visible");
                }
              )
            }
            onMouseEnter={
              state !== ""
                ? accountRef.current.classList.remove("account-menu-visible")
                : () => accountRef.current.classList.add("account-menu-visible")
            }
            onMouseLeave={() =>
              accountRef.current.classList.remove("account-menu-visible")
            }
          >
            <FaRegUser />
            <div ref={accountRef} className="account-menu-details">
              <Link
                onClick={() => {
                  setmenu("account");
                  removeAccountDetails("account");
                }}
                to={"/account"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>
                  <FaRegUser /> Manage My Account
                </p>
              </Link>
              {user.role === "admin" ? (
                <Link
                  onClick={() => {
                    setmenu("admin-panel");
                    removeAccountDetails("admin-panel");
                  }}
                  to={"/admin/dashboard"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p>
                    <FaRegUser /> Admin Panel
                  </p>
                </Link>
              ) : (
                <></>
              )}
              <Link
                onClick={() => {
                  setmenu("orders");
                  removeAccountDetails("orders");
                }}
                to={"/orders"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>
                  <FiShoppingBag /> My Orders
                </p>
              </Link>
              <p
                onClick={(e) => {
                  handleLogout(e);
                  setmenu("login");
                  removeAccountDetails("login");
                }}
              >
                <TbLogout2 /> Logout
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
