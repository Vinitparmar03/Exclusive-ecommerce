import React from "react";
import "./Breadcrum.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
const Breadcrum = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="breadcrum">
      <Link to="/" >
        HOME
      </Link>{" "}
      <MdKeyboardArrowRight />
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return (
          <React.Fragment key={name}>
            <Link to={routeTo}>{name.toUpperCase()}</Link>{" "}
            {!isLast && <MdKeyboardArrowRight />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrum;
