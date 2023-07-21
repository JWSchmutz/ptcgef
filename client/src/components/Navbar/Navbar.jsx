import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import menu from "/menu.png";
import close from "/close.png";

function Navbar({ title, pages }) {
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
  return (
    <nav>
      <div id="large-nav">
        <h1 id="h1">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "none")}
            to="/"
          >
            {title}
          </NavLink>
        </h1>
        {pages.map((page, i) => (
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "none")}
            to={page === "home" ? "/" : "/" + page}
            key={i}
          >
            {page.charAt(0).toUpperCase() + page.slice(1).replaceAll("-", " ")}
          </NavLink>
        ))}
      </div>
      <div id="small-nav">
        <div>
          <h1 id="h1">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "none")}
              to="/"
            >
              {title}
            </NavLink>
          </h1>
          {!hamburgerMenuIsOpen && (
            <span
              id="hamburger-menu"
              onClick={() => setHamburgerMenuIsOpen(true)}
            >
              <img src={menu} alt="menu" />
            </span>
          )}
          {hamburgerMenuIsOpen && (
            <span
              id="hamburger-menu"
              onClick={() => setHamburgerMenuIsOpen(false)}
            >
              <img src={close} alt="close menu" />
            </span>
          )}
        </div>
        {hamburgerMenuIsOpen && (
          <div id="small-nav-links-holder">
            {pages.map((page, i) => (
              <div class="small-nav-link">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "active" : "none"
                  }
                  to={page === "home" ? "/" : "/" + page}
                  key={i}
                >
                  {page.charAt(0).toUpperCase() +
                    page.slice(1).replace("-", " ")}
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
