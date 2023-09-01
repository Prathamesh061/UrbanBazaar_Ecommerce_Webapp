import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { FaShoppingCart } from "react-icons/fa";
import { HiSearch } from "react-icons//hi";
import Search from "../../Search/Search";
import { useSelector } from "react-redux";
import UserOptions from "../Header/UserOptions/UserOptions";

function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  function handleNavClick() {
    document.body.classList.remove("nav-open");
  }
  const activeStyles = {
    fontWeight: "bold",
    color: "#ffa506",
  };

  const searchClickHandler = (e) => {
    document.body.classList.toggle("search-box-open");
  };
  return (
    <>
      <div className="header-container">
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
              <img src="/site-logo.png" alt="site-logo" />
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
                  to="/products"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                  className="nav__link"
                  onClick={handleNavClick}
                >
                  Products
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
                <button className="search-btn" onClick={searchClickHandler}>
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
              <li
                className={`nav__item ${isAuthenticated ? "user-options" : ""}`}
              >
                {isAuthenticated ? (
                  <UserOptions user={user} />
                ) : (
                  <NavLink
                    to="/login"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                    className="nav__link login-btn-link"
                  >
                    <button className="login-btn">Login</button>
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>
        </header>
        <Search />
      </div>
    </>
  );
}

export default Header;
