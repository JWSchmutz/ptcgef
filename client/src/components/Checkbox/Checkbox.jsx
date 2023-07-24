import React from "react";
import "./Checkbox.css";

function Checkbox({ value, id, onChange, label, image, unchecked }) {
  return (
    <div className="form-check">
      <label
        className="form-check-label text-left switch"
        style={{ width: "90%" }}
        htmlFor={id || value}
      >
        {image && <img src={image} alt={value} />}{" "}
        {image ? (
          <span className="d-none d-md-inline-block">{label || value}</span>
        ) : (
          label || value
        )}
        <input
          className="form-check-input"
          type="checkbox"
          value={value}
          id={id || value}
          defaultChecked={unchecked ? false : true}
          onChange={onChange}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default Checkbox;
