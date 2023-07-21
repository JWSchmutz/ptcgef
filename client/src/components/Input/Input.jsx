import React, { useState, useEffect } from "react";
import "./Input.css";

export default function Input({
  id,
  label,
  type,
  reverse,
  value,
  handleChange,
}) {
  const [labelStatus, setLabelStatus] = useState("normal");
  useEffect(() => {
    if (value !== "") {
      setLabelStatus("high");
    }
  }, [value]);

  // useEffect(() => {
  //   setValue(valueProp || "");
  // }, [valueProp]);

  const handleFocus = () => {
    setLabelStatus("high");
  };

  const handleBlur = () => {
    if (value === "") {
      setLabelStatus("normal");
    }
  };

  return (
    <div className="input-group">
      <label
        className={`input-label ${labelStatus} ${reverse ? "reverse" : ""}`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={reverse ? "reverse" : ""}
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}

Input.defaultProps = {
  label: "Type Here",
  type: "text",
  square: false,
  reverse: false,
  value: "",
};
