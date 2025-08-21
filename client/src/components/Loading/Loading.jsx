import React from "react";
import logo from "/loading.gif";
import "./Loading.css";
function Loading({ text }) {
  return (
    <div style={{ color: "white" }}>
      <img className="imageRotateHorizontal" src={logo} alt="loading..." />
      <p className="loading-text">
        Loading...
        {text && (
          <span>
            <br /> {text}
          </span>
        )}
      </p>
    </div>
  );
}

export default Loading;
