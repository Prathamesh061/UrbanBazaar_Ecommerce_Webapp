import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MetaData from "../../../Utility/MetaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faList } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../Sidebar/Sidebar";
import "./updateOrder.css";
import { clearErrors } from "../../../../actions/userAction";
import { getOrderDetails, updateOrder } from "../../../../actions/orderAction";
import { useAlert } from "../../../../contexts/alertContext";
import Loader from "../../../Layout/Loader/Loader";
import { UPDATE_ORDER_RESET } from "../../../../constants/orderConstants";

function UpdateOrder() {
  const [openDashboardToggle, setOpenDashboardToggle] = useState(false);
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const [status, setStatus] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  function processOrder(e) {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  }

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, [isUpdated]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    } else if (user.role && user.role !== "admin") {
      navigate(
        `/login?message=Dashboard: Only Admin View.&login=active&redirectTo=${location.pathname}`
      );
    }

    if (error) {
      alert(error, "errory");
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError, "errory");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Order successfully updated", "success");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, loading, updateError, isUpdated, order]);

  return (
    <>
      <MetaData title={"Order Processing"} />
      <div className="update-order-container">
        <div className="dashboard-toggle" aria-label="dashboard toggler">
          {!openDashboardToggle ? (
            <FontAwesomeIcon
              icon={faBars}
              className="icon-clr"
              onClick={() => setOpenDashboardToggle(true)}
            />
          ) : null}
        </div>
        <div
          className={`dashboard-sidebar-container update-sidebar ${
            openDashboardToggle ? "show" : ""
          }`}
        >
          <Sidebar setOpenDashboardToggle={setOpenDashboardToggle} />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="update-container">
            <div>
              <h2 className="dashboard-header">Order Details</h2>

              <div className="confirm-shipping-area update-shipping-info">
                <h2 className="container-header">Shipping Info</h2>
                <div>
                  <div className="confirm-shipping-name">
                    <p className="order-shipping-info__header">Name: </p>
                    <span>{order?.user && order.user.name}</span>
                  </div>

                  <div className="confirm-shipping-phoneno">
                    <p className="order-shipping-info__header">Phone: </p>
                    <span>
                      {order?.shippingInfo && order.shippingInfo.phoneNum}
                    </span>
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

              <div className="update-order-payment">
                <h3 className="container__header">Payment:</h3>
                <div>
                  <p
                    className={`order-payment__header ${
                      order?.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "message"
                        : "error"
                    }`}
                  >
                    {order?.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
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

              <div className="update-status-order update-order-payment">
                <h2 className="container__header">Order Status:</h2>
                <span
                  className={
                    order?.orderStatus && order?.orderStatus === "delivered"
                      ? "message"
                      : "error"
                  }
                >
                  {order?.orderStatus && order?.orderStatus}
                </span>
              </div>

              <div className="confirm-cart-items update-cart-items">
                <h2 className="container-header">Your cart items:</h2>
                <div className="confirm-cart-items-container">
                  <div className="confirm-cart-items-container__box">
                    {order?.orderItems &&
                      order?.orderItems.map((item) => (
                        <div key={item.productId}>
                          <div className="confirm-cart-items-img-container">
                            <img src={item.image} alt="product" />
                            <Link
                              to={`/products/${item.productId}?redirectTo=/admin/order/${params.id}`}
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

            {order?.orderStatus !== "delivered" ? (
              <section className="update-order-status">
                <form
                  className="update-order-status-form"
                  onSubmit={processOrder}
                >
                  <h2 className="dashboard-header update-order-form-header">
                    Order Status
                  </h2>

                  <div className="update-order-category">
                    <FontAwesomeIcon icon={faList} className="icon-clr" />
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Choose Category</option>
                      {order?.orderStatus === "processing" ? (
                        <option value="shipped">Shipped</option>
                      ) : null}
                      {order?.orderStatus === "shipped" ? (
                        <option value="delivered">Delivered</option>
                      ) : null}
                    </select>
                  </div>

                  <button
                    className="create-product-form-submit-btn btn"
                    type="submit"
                    disabled={loading || !status}
                  >
                    Process
                  </button>
                </form>
              </section>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default UpdateOrder;
