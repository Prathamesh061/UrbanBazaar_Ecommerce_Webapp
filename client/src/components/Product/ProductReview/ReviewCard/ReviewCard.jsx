import React from "react";
import "./reviewCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faStar } from "@fortawesome/free-solid-svg-icons";

function ReviewCard({ review }) {
  return (
    <>
      <div className="review-card">
        <h1 className="avatar">
          <FontAwesomeIcon icon={faUserTie} />
        </h1>
        <h3 className="review-author">{review.name}</h3>
        <h3 className="review-rating">
          <FontAwesomeIcon icon={faStar} className="icon-clr" />
          {review.rating}/5
        </h3>
        <p className="review-comment">{review.comment}</p>
      </div>
    </>
  );
}

export default ReviewCard;
