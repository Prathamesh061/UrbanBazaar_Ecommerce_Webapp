import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./productCard.css";

function ProductCard({ product }) {
  return (
    <div key={product.id} className="product-card">
      <Link to={`/products/${product._id}`}>
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
          <FontAwesomeIcon icon={faStar} className="icon-clr" /> (
          {product.numOfReviews} reviews)
        </p>

        <p className="product-price">
          {new Intl.NumberFormat("en-HI", {
            style: "currency",
            currency: "INR",
          }).format(product.price)}
        </p>
      </Link>
    </div>
  );
}

export default ProductCard;
