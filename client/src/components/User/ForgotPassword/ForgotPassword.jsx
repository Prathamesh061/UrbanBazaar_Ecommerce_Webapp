import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../Utility/MetaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { clearErrors, forgotPassword } from "../../../actions/userAction";
import Loader from "../../Layout/Loader/Loader";
import { useAlert } from "../../../contexts/alertContext";
import "./forgotPassword.css";
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
} from "../../../constants/userConstants";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const alert = useAlert();

  function handleForgotPassoword(e) {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  }

  useEffect(() => {
    if (error) {
      alert(error, "errory");
      dispatch(clearErrors());
    }

    if (message) {
      alert(message, "success");
      dispatch({
        type: FORGOT_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, message, loading]);
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
