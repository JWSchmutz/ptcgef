import React from "react";
import logo from "/loading.gif";
import "./Loading.css";
function Loading() {
  return (
    <div style={{ color: "white" }}>
      <img className="imageRotateHorizontal" src={logo} alt="loading..." />
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default Loading;
