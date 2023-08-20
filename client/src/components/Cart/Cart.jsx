import React from "react";
import CartItemCard from "./CartItemCard/CartItemCard";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeFromCart } from "../../actions/cartAction";
import "./cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  function increaseQunatity(id, quantity, stock) {
    const newQuantity = quantity + 1;

    if (stock <= quantity) return;

    dispatch(addItemsToCart(id, newQuantity));
  }

  function decreaseQuantity(id, quantity) {
    const newQuantity = quantity - 1;

    if (1 >= quantity) return;

    dispatch(addItemsToCart(id, newQuantity));
  }

  function deleteCartItems(id) {
    dispatch(removeFromCart(id));
  }
  return cartItems[0] ? (
    <>
      <div className="cart">
        <div className="cart-header">
          <p className="cart-header__item">Product</p>
          <p className="cart-header__item">Quantity</p>
          <p className="cart-header__item">Subtotal</p>
        </div>

        {cartItems.map((item, key) => (
          <div className="cart-container" key={key}>
            <CartItemCard item={item} delteCartItems={deleteCartItems} />

            <div className="stock-container">
              <span
                className="increase-stock-btn"
                onClick={() => decreaseQuantity(item.product, item.quantity)}
              >
                <FontAwesomeIcon icon={faMinus} className="icon-clr" />
              </span>

              <input
                type="number"
                className="cart-input"
                min={1}
                value={item.quantity}
                readOnly
              />

              <span
                className="decrease-stock-btn"
                onClick={() =>
                  increaseQunatity(item.product, item.quantity, item.stock)
                }
              >
                <FontAwesomeIcon icon={faAdd} className="icon-clr" />
              </span>
            </div>

            <div className="cart-container__subtotal">
              {new Intl.NumberFormat("en-HI", {
                style: "currency",
                currency: "INR",
              }).format(item.price * item.quantity)}
            </div>
          </div>
        ))}

        <div className="cart-gross-price">
          <div></div>
          <div className="cart-gross-price__box">
            <p>Gross Total:</p>
            <p>
              {new Intl.NumberFormat("en-HI", {
                style: "currency",
                currency: "INR",
              }).format(
                cartItems.reduce(
                  (total, item) => (total += item.quantity * item.price),
                  0
                )
              )}
            </p>
          </div>
          <div></div>
          <div className="checkout-btn">
            <button className="btn">Check Out</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="empty-cart">
      <h3>Your cart isEmpty!</h3>
      <p>Add items to it now.</p>
      <Link to={"/products"} className="btn">
        Shop Now
      </Link>
    </div>
  );
}

export default Cart;
