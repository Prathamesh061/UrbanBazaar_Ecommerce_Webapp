import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../../Utility/MetaData";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import "./confirmOrder.css";

function ConfirmOrder() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const subTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + shippingCharges + tax;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  function handleProceedPayment(e) {
    const data = {
      subTotal,
      tax,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    }
  });
  return (
    <>
      <MetaData title={"Confirm Order"} />
      <Link to={`/shipping`} relative="path" className="profile-back-btn">
        &larr; <span>Back</span>
      </Link>
      <CheckoutSteps activeStep={1} />
      <div className="confirm-order-container">
        <div>
          <div className="confirm-shipping-area">
            <h2 className="container-header">Shipping Info</h2>
            <div className="confirm-shipping-area__box">
              <div className="confirm-shipping-name">
                <p className="confirm-shipping-info__header">Name: </p>
                <span>{user.name}</span>
              </div>

              <div className="confirm-shipping-phoneno">
                <p className="confirm-shipping-info__header">Phone: </p>
                <span>{shippingInfo.phoneNum}</span>
              </div>

              <div className="confirm-shipping-address">
                <p className="confirm-shipping-info__header">Address: </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirm-cart-items">
            <h2 className="container-header">Your cart items:</h2>
            <div className="confirm-cart-items-container">
              <div className="confirm-cart-items-container__box">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.productId}>
                      <div className="confirm-cart-items-img-container">
                        <img src={item.image} alt="product" />
                        <Link
                          to={`/products/${item.productId}?redirectTo=/order/confirm`}
                          className="confirm-cart-items-product-name"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <span>
                        {item.quantity} <b>X </b>
                        {new Intl.NumberFormat("en-HI", {
                          style: "currency",
                          currency: "INR",
                        }).format(item.price)}
                        = {""}
                        <b>
                          {new Intl.NumberFormat("en-HI", {
                            style: "currency",
                            currency: "INR",
                          }).format(item.price * item.quantity)}
                        </b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="order-summary">
          <h2 className="container-header">Order summary</h2>
          <div>
            <div className="order-summary-subtotal">
              <p className="order-summary-subtotal__header">Subtotal: </p>
              <span>
                {new Intl.NumberFormat("en-HI", {
                  style: "currency",
                  currency: "INR",
                }).format(subTotal)}
              </span>
            </div>
            <div className="order-summary-shipping-charges">
              <p className="order-summary-shipping-charges__header">
                Shipping Charges:
              </p>
              <span>
                {new Intl.NumberFormat("en-HI", {
                  style: "currency",
                  currency: "INR",
                }).format(shippingCharges)}
              </span>
            </div>
            <div className="order-summary-tax">
              <p className="order-summary-tax__header">GST:</p>
              <span>
                {new Intl.NumberFormat("en-HI", {
                  style: "currency",
                  currency: "INR",
                }).format(tax)}{" "}
                (18%)
              </span>
            </div>
          </div>

          <div className="order-summary-total">
            <p className="order-summary-total__header">Total:</p>
            <span>
              {new Intl.NumberFormat("en-HI", {
                style: "currency",
                currency: "INR",
              }).format(totalPrice)}
            </span>
          </div>

          <button className="payment-btn btn" onClick={handleProceedPayment}>
            Proceed to payment
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;
