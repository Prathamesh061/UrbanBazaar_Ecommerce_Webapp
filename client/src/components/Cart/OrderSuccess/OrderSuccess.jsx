import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./orderSuccess.css";
import { useSelector } from "react-redux";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    }
  });
  return (
    <div className="order-success">
      <h1 className="order-success-icon">
        <FontAwesomeIcon icon={faCircleCheck} className="icon-clr" />
      </h1>

      <h3 className="order-success-msg">
        Your order has bee placed successfully!
      </h3>

      <Link to={"/orders"} className="btn">
        View Orders
      </Link>
    </div>
  );
}

export default OrderSuccess;
