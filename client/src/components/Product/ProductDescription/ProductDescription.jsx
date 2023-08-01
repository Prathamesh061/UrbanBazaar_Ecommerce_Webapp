import React from "react";
import { useOutletContext } from "react-router-dom";
import "./productDescription.css";

function ProductDescription() {
  const { product } = useOutletContext();

  return <div className="product-description">{product.description}</div>;
}

export default ProductDescription;
