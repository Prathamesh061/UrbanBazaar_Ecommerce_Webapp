import React from "react";
import "./productReviews.css";
import { useOutletContext } from "react-router-dom";
import ReviewCard from "./ReviewCard/ReviewCard";

function ProductReviews() {
  const { product } = useOutletContext();

  return (
    <>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews-container">
          {product.reviews &&
            product.reviews.map((review) => <ReviewCard review={review} />)}
        </div>
      ) : (
        <p className="no-reviews">No Reviews Yet...</p>
      )}
    </>
  );
}

export default ProductReviews;
