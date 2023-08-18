import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../Utility/MetaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { clearErrors, forgotPassword } from "../../../actions/userAction";
import Loader from "../../Layout/Loader/Loader";
import "./forgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  function handleForgotPassoword(e) {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  }

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        dispatch(clearErrors());
      }, 5000);
    }
    if (message) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  }, [error, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot password" />
          <Link to={`/login`} relative="path" className="profile-back-btn">
            &larr; <span>Back</span>
          </Link>
          {showError && <p className="error">{error}</p>}
          {showMessage && <p className="message">{message}</p>}
          <div className="forgot-password-container">
            <div className="forgot-box">
              <h2 className="forgot-password-container__header">
                Forgot password
              </h2>
              <form className="forgot-form" onSubmit={handleForgotPassoword}>
                <div className="forgot-email">
                  <FontAwesomeIcon icon={faEnvelope} className="icon-clr" />
                  <input
                    type="email"
                    placeholder="Enter your registered email address"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input type="submit" value={"Send"} className="btn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ForgotPassword;
