import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MetaData from "../../Utility/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import { useAlert } from "../../../contexts/alertContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBars,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./updateUser.css";
import Loader from "../../Layout/Loader/Loader";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../../actions/userAction";

function UpdateUser() {
  const [openDashboardToggle, setOpenDashboardToggle] = useState(false);
  const { user: userAuth, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const alert = useAlert();

  function handleSubmitUserUpdation(e) {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(params.id, myForm));
  }

  useEffect(() => {
    if (user?._id !== params.id) {
      dispatch(getUserDetails(params.id));
    } else {
      setName(user?.name);
      setRole(user?.role);
      setEmail(user?.email);
    }

    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    } else if (userAuth.role && userAuth.role !== "admin") {
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
      alert("User successfully update", "success");
      dispatch({
        type: UPDATE_USER_RESET,
      });
      navigate("/admin/users");
    }
  }, [
    dispatch,
    isAuthenticated,
    userAuth,
    error,
    loading,
    isUpdated,
    updateLoading,
    updateError,
  ]);
  return (
    <>
      <MetaData title={`Add Product`} />

      <div className="dashboard-container">
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
          className={`dashboard-sidebar-container ${
            openDashboardToggle ? "show" : ""
          }`}
        >
          <Sidebar setOpenDashboardToggle={setOpenDashboardToggle} />
        </div>

        <div className="dashboard-main create-product-main">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="product-creation-form update-user-form"
              onSubmit={handleSubmitUserUpdation}
            >
              <h3 className="dashboard-header create-product-header">
                Update User
              </h3>
              <div className="product-namy">
                <FontAwesomeIcon icon={faUser} className="icon-clr" />
                <input
                  type="text"
                  placeholder="User Name..."
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="product-pricy">
                <FontAwesomeIcon icon={faEnvelope} className="icon-clr" />
                <input
                  type="email"
                  placeholder="User Email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="product-category">
                <FontAwesomeIcon icon={faAddressCard} className="icon-clr" />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                className="user-update-btn btn"
                type="submit"
                disabled={updateLoading || !role}
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
