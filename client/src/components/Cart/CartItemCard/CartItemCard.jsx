import React from "react";
import "./cartItemCard.css";
import { Link } from "react-router-dom";

function CartItemCard({ item, delteCartItems }) {
  return (
    <div className="cart-item-card">
      <img src={item.image} alt="ssa" className="cart-item-card__img" />
      <div className="cart-item-card__info">
        <Link to={`/products/${item.product}?redirectTo=/cart`}>
          {item.name}
        </Link>
        <span>
          {`Price: ${new Intl.NumberFormat("en-HI", {
            style: "currency",
            currency: "INR",
          }).format(item.price)}`}
        </span>
        <p onClick={() => delteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
}

export default CartItemCard;
