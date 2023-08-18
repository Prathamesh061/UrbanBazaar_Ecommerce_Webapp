import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader";
import MetaData from "../../Utility/MetaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { resetPassword } from "../../../actions/userAction";
import "./resetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  function handleResetPasswordSubmit(e) {
    e.preventDefault();

    const formToBeSent = new FormData();

    formToBeSent.set("password", password);
    formToBeSent.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, formToBeSent));
  }

  useEffect(() => {
    if (success) {
      navigate(`/login?message=Password Reset Successfully.&login=active`);
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
  }, [dispatch, error, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Reset password" />
          <Link to={`/login`} relative="path" className="profile-back-btn">
            &larr; <span>Back to profile</span>
          </Link>
          <div className="reset-password-container">
            <div className="reset-box">
              <h2 className="reset-password-container__header">
                Reset password
              </h2>
              <form className="reset-form" onSubmit={handleResetPasswordSubmit}>
                {error && <p className="error">{error}</p>}

                <div className="reset-password">
                  <FontAwesomeIcon icon={faUnlock} className="icon-clr" />
                  <input
                    type="password"
                    placeholder="New password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="reset-password">
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

export default ResetPassword;
