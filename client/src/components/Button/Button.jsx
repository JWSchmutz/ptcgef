import React from "react";
import "./Button.css";

export default function Button({
  type,
  text,
  handleClick,
  reverse,
  square,
  classes,
  disabled,
  style,
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`button ${reverse ? "reverse" : ""} ${
        square ? "square" : ""
      } ${`${classes ? classes : ""}`}`}
      onClick={handleClick}
      style={style}
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
