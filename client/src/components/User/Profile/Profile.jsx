import React from "react";
import MetaData from "../../Utility/MetaData";
import { useSelector } from "react-redux";

function Profile() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <MetaData title={`${user.name} | UrbanBazaar`} />
    </>
  );
}

export default Profile;
