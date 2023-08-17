import React, { useEffect, useState } from "react";
import MetaData from "../../Utility/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Loader from "../../Layout/Loader/Loader";
import "./profile.css";
import { loadUser } from "../../../actions/userAction";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(
    new URLSearchParams(location.search).get("message")
  );
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    }
    if (message) {
      dispatch(loadUser());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message, isAuthenticated, user]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title={`${user.name} | UrbanBazaar`} />
      {message && <h3 className="green-color message">{message} </h3>}
      <div className="profile-container">
        <div className="profile-picture-container">
          <img
            src={user.avatar?.url || "/profile.png"}
            alt={user.name}
            className="profile-picture-container__picture"
          />
          <Link to="/me/update" className="btn edit-profile-btn">
            Edit Profile
          </Link>
        </div>

        <div className="profile-info-container">
          <div>
            <h3 className="profile-info__subheader">Full name</h3>
            <p className="profile-info-data">{user.name}</p>
          </div>
          <div>
            <h3 className="profile-info__subheader">Email</h3>
            <p className="profile-info-data">{user.email}</p>
          </div>
          <div>
            <h3 className="profile-info__subheader">Date joined</h3>
            <p className="profile-info-data">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <Link to="/orders" className="btn orders-btn">
              My orders
            </Link>
            <Link to="/password/update" className="btn update-password-btn">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
