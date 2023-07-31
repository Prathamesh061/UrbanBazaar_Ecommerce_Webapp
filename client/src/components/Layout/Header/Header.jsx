import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiSearch } from "react-icons//hi";

function Header() {
  function handleNavClick() {
    document.body.classList.remove("nav-open");
  }
  const activeStyles = {
    fontWeight: "bold",
    color: "#ffa506",
  };

  return (
    <header className="header">
      <button
        className="nav-toggle"
        aria-label="toggle navigation"
        onClick={() => {
          document.body.classList.toggle("nav-open");
        }}
      >
        <span className="hamburger"></span>
      </button>

      <div className="site-logo">
        <Link to="/">
          <img src="http://localhost:5173/site-logo.png" alt="site-logo" />
        </Link>
      </div>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="nav__link"
              onClick={handleNavClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/product"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="nav__link"
              onClick={handleNavClick}
            >
              Product
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="nav__link"
              onClick={handleNavClick}
            >
              About
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/contact"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="nav__link"
              onClick={handleNavClick}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <ul className="nav__list">
          <li className="nav__item">
            <button className="search-btn">
              <HiSearch />
            </button>
          </li>
          <li className="nav__item">
            <NavLink
              to="/cart"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="nav__link"
            >
              <FaShoppingCart />
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/profile"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="nav__link"
            >
              <CgProfile />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
