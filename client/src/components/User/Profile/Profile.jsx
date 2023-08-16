import React, { useEffect } from "react";
import MetaData from "../../Utility/MetaData";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Layout/Loader/Loader";

function Profile() {
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

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title={`${user?.name} | UrbanBazaar`} />
    </>
  );
}

export default Profile;