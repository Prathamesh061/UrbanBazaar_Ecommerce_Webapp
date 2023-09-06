import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MetaData from "../../../Utility/MetaData";
import { clearErrors, getOrderDetails } from "../../../../actions/orderAction";
import Loader from "../../../Layout/Loader/Loader";
import { useAlert } from "../../../../contexts/alertContext";
import "./orderDetails.css";

function OrderDetails() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    }

    if (error) {
      alert(error, "errory");
      dispatch(clearErrors());
    }
  }, [dispatch, error, loading, isAuthenticated]);

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title={`Order Details`} />
      <Link to={`/orders`} relative="path" className="profile-back-btn">
        &larr; <span>Back</span>
      </Link>
      <div className="order-details-container">
        <h3 className="order-details-container__id">
          Order #<span>{order && order._id}</span>
        </h3>
        <div className="order-shipping-info">
          <h3 className="container__header">Shipping Info:</h3>
          <div>
            <div className="confirm-shipping-name">
              <p className="order-shipping-info__header">Name: </p>
              <span>{order?.user && order.user.name}</span>
            </div>

            <div className="confirm-shipping-phoneno">
              <p className="order-shipping-info__header">Phone: </p>
              <span>{order?.shippingInfo && order.shippingInfo.phoneNum}</span>
            </div>

            <div className="confirm-shipping-address">
              <p className="order-shipping-info__header">Address: </p>
              <span>
                {order?.shippingInfo &&
                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
              </span>
            </div>
          </div>
        </div>
        <div className="order-payment">
          <h3 className="container__header">Payment:</h3>
          <div>
            <p
              className={`order-payment__header ${
                order?.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? "message"
                  : "error"
              }`}
            >
              {order?.paymentInfo && order.paymentInfo.status === "succeeded"
                ? "Paid"
                : "Pending"}
            </p>
          </div>
          <div className="order-payment__amount">
            <p className="order-shipping-info__header">Amount: </p>
            <span>
              {new Intl.NumberFormat("en-HI", {
                style: "currency",
                currency: "INR",
              }).format(order?.totalPrice && order.totalPrice)}
            </span>
          </div>
        </div>
        <div className="order-status">
          <h3 className="container__header">Order Status:</h3>
          <p
            className={
              order?.orderStatus && order.orderStatus === "delivered"
                ? "message"
                : "error"
            }
          >
            {order?.orderStatus && order.orderStatus}
          </p>
        </div>

        <div className="order-details-cart-items">
          <h3 className="container__header">Orders:</h3>
          <div className="order-details-cart-items-box">
            {order?.orderItems &&
              order.orderItems.map((item) => (
                <div key={item.productId}>
                  <div className="order-items-img-container">
                    <img src={item.image} alt="product" />
                    <Link
                      to={`/products/${item.productId}?redirectTo=/order/confirm`}
                      className="order-cart-items-product-name"
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
    </>
  );
}

export default OrderDetails;
