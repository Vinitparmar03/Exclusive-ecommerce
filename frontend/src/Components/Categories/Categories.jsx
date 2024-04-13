import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./Categories.css";
import { FaBlackTie } from "react-icons/fa";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <ul className="categories">
      <li>
        <Link to="/search" style={{ color: "black", textDecoration: "none" }}>
          <h4>Mens Fashion</h4>{" "}
          <h4>
            <MdKeyboardArrowRight />
          </h4>
        </Link>
      </li>
      <li>
        <Link to="/search" style={{ color: "black", textDecoration: "none" }}>
          <h4>Womens Fashion</h4>{" "}
          <h4>
            <MdKeyboardArrowRight />
          </h4>
        </Link>
      </li>
      <li>
        <Link to="/search" style={{ color: "black", textDecoration: "none" }}>
          <h4>Kids Fashion</h4>{" "}
          <h4>
            <MdKeyboardArrowRight />
          </h4>
        </Link>
      </li>
      <li>
        <Link to="/search" style={{ color: "black", textDecoration: "none" }}>
          <h4>Watches</h4>{" "}
          <h4>
            <MdKeyboardArrowRight />
          </h4>
        </Link>
      </li>

      <li>
        <Link to="/search" style={{ color: "black", textDecoration: "none" }}>
          <h4>Electronics</h4>{" "}
          <h4>
            <MdKeyboardArrowRight />
          </h4>
        </Link>
      </li>
      <li>
        <Link to="/search" style={{ color: "black", textDecoration: "none" }}>
          <h4>Home & Styles</h4>{" "}
          <h4>
            <MdKeyboardArrowRight />
          </h4>
        </Link>
      </li>
    </ul>
  );
};

export default Categories;
