import React from "react";
import logo from "../../../public/Play!_Pokémon_logo.png";
import "./Loading.css";
function Loading() {
  return (
    <div style={{ color: "white" }}>
      <img className="imageRotateHorizontal" src={logo} alt="loading..." />
    </div>
  );
}

export default Loading;
