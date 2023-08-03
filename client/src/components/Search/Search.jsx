import React, { useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";

function Search() {
  const [productName, setProductName] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (productName.trim()) {
      navigate(`/products/search/${productName}`);
    } else {
      navigate(`/products`);
    }
  };
  return (
    <>
      <form className="search-box" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search For Products, Brands and more..."
          onChange={(e) => setProductName(e.target.value)}
          className="search-box__input"
        />
        <input type="submit" value={"Search"} className="search-box__btn btn" />
      </form>
    </>
  );
}

export default Search;
