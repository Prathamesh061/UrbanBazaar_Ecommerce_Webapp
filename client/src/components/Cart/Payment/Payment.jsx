import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../../Utility/MetaData";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlert } from "../../../contexts/alertContext";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  faCalendar,
  faCreditCard,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { createOrder } from "../../../actions/orderAction";
import axios from "axios";
import "./payment.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);

  const alert = useAlert();

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const paymentData = {
    product: cartItems.map((item) => ({
      id: item.productId,
      quantity: item.quantity,
    })),
  };

  async function handlePaymentSubmit(e) {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        "Content-Type": "application/json",
      };
      const { data } = await axios.post(
        "/eshop/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        alert(result.error.message, "errory");
        payBtn.current.disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert("Payment Failed", "errory");
          navigate("/orders");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
    }
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
      <MetaData title={"Payment"} />
      <Link to={`/order/confirm`} relative="path" className="profile-back-btn">
        &larr; <span>Back</span>
      </Link>
      <CheckoutSteps activeStep={2} />
      <div className="payment-container">
        <div className="payment-box">
          <form className="payment-form" onSubmit={handlePaymentSubmit}>
            <h2 className="payment-header">Card Info</h2>
            <div className="payment-info">
              <FontAwesomeIcon icon={faCreditCard} className="icon-clr" />
              <CardNumberElement className="payment-input" />
            </div>

            <div className="payment-info">
              <FontAwesomeIcon icon={faCalendar} className="icon-clr" />
              <CardExpiryElement className="payment-input" />
            </div>

            <div className="payment-info">
              <FontAwesomeIcon icon={faKey} className="icon-clr" />
              <CardCvcElement className="payment-input" />
            </div>

            <input
              type="submit"
              value={`Pay - ${new Intl.NumberFormat("en-HI", {
                style: "currency",
                currency: "INR",
              }).format(orderInfo && orderInfo.totalPrice)}`}
              ref={payBtn}
              className="payment-form-btn btn"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Payment;
