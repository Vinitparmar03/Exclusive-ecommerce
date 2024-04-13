import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 Not Found</h1>
      <p>Your visited page not found. You may go home page</p>
      <button>
        <Link to="/">Back to home page</Link>
      </button>
    </div>
  );
};

export default NotFound;
