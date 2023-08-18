import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader";
import MetaData from "../../Utility/MetaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { updatePassword } from "../../../actions/userAction";
import "./updatePassword.css";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const { error, isUpdated } = useSelector((state) => state.profile);

  function handleUpdatePassword(e) {
    e.preventDefault();

    const formToBeSent = new FormData();

    formToBeSent.set("oldPassword", oldPassword);
    formToBeSent.set("newPassword", newPassword);
    formToBeSent.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(formToBeSent));
  }
  useEffect(() => {
    if (isUpdated) {
      navigate(`/account?message=Password Updated Successfully.`);

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }

    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
  }, [dispatch, error, isUpdated, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Password" />
          <Link to={`/account`} relative="path" className="profile-back-btn">
            &larr; <span>Back to profile</span>
          </Link>
          <div className="update-password-container">
            <div className="update-box">
              <h2 className="update-password-container__header">
                Update Password
              </h2>
              <form className="update-form" onSubmit={handleUpdatePassword}>
                {error && <p className="error">{error}</p>}

                <div className="update-password">
                  <FontAwesomeIcon icon={faKey} className="icon-clr" />
                  <input
                    type="password"
                    placeholder="Current password"
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="update-password">
                  <FontAwesomeIcon icon={faUnlock} className="icon-clr" />
                  <input
                    type="password"
                    placeholder="New password"
                    required
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="update-password">
                  <FontAwesomeIcon icon={faLock} className="icon-clr" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value={"Update"}
                  className="update-btn btn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdatePassword;
