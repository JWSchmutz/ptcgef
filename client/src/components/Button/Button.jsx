import React from "react";
import "./Button.css";

export default function Button({ type, text, handleClick, reverse, square }) {
  return (
    <button
      type={type}
      className={`button ${reverse ? "reverse" : ""} ${square ? "square" : ""}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: "click here",
  type: "button",
  square: false,
  reverse: false,
};
