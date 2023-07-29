import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./css/product.css";

function Product({ product }) {
  return (
    <div key={product.id} className="product-card">
      <Link to={product._id}>
        <div className="img-container">
          <img
            src={`${product.images[0].url}`}
            alt="product poster"
            className="product-poster"
          />
        </div>

        <h3 className="product-title">{product.name}</h3>

        <p className="product-rating">
          {product.rating}
          <FontAwesomeIcon icon={faStar} />
        </p>

        <p className="product-price">{product.price}</p>
      </Link>
    </div>
  );
}

export default Product;
