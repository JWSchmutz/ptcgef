import React from "react";
import "./Card.css";
function Card({
  children,
  title,
  logo,
  alt,
  titlePadding,
  logoSideLength,
  width,
  height,
  backgroundColor,
  background,
  color,
  className,
  onClick,
}) {
  const paddingLeft = titlePadding ? parseInt(logoSideLength) + 10 : null;
  return (
    <div
      className={`card ${className}`}
      style={{ width, height, color, background, backgroundColor }}
      onClick={onClick}
    >
      <h3 className="card-header">
        {logo && (
          <img
            alt={alt}
            width={logoSideLength}
            height={logoSideLength}
            className="card-logo"
            src={logo}
          />
        )}
        <span style={{ paddingLeft: paddingLeft + "px" }}>{title}</span>
      </h3>
      {children && <div className="card-body">{children}</div>}
    </div>
  );
}

export default Card;
