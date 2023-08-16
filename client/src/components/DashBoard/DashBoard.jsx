import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function DashBoard() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    } else if (user.role && user.role !== "admin") {
      navigate(
        `/login?message=Only Admin View.&login=active&redirectTo=${location.pathname}`
      );
    }
  }, [user, isAuthenticated, loading]);

  return loading ? <div>DashBoard</div> : <h1>{user.role}</h1>;
}

export default DashBoard;
