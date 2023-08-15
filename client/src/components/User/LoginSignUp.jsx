import React, { useEffect, useRef, useState } from "react";
import Loader from "../Layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearErrors } from "../../actions/userAction";
import "./loginSignUp.css";

function LoginSignUp() {
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const { name, email, password } = user;

  let { loading, error, isAuthenticated } = useSelector((state) => state.user);

  function handleRegisterSubmit(e) {
    e.preventDefault();

    const formToBeSent = new FormData();

    formToBeSent.set("name", name);
    formToBeSent.set("email", email);
    formToBeSent.set("password", password);
    formToBeSent.set("avatar", avatar);

    dispatch(register(formToBeSent));
  }

  function switchTabs(e, tab) {
    if (tab === "login") {
      setShowLogin(true);
      setShowRegister(false);
    }
    if (tab === "register") {
      setShowLogin(false);
      setShowRegister(true);
    }

    dispatch(clearErrors());
  }

  function loginSubmit(e) {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  }

  function registerDataChange(e) {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/account");
  }, [error, dispatch, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-signup-container">
          <div className="login-signup-box">
            <div>
              <div className="login-signup-toggle">
                <p
                  onClick={(e) => switchTabs(e, "login")}
                  className="login-signup-box__login"
                >
                  Login
                </p>
                <p
                  onClick={(e) => switchTabs(e, "register")}
                  className="login-signup-box__register"
                >
                  Register
                </p>
              </div>
              <button
                ref={switcherTab}
                className={`login-signup-box__switcher ${
                  showLogin ? "shift-to-neutral" : "shift-to-right"
                }`}
              ></button>
            </div>

            <form
              className={`login-form ${showLogin ? "login-form-show" : ""}`}
              ref={loginTab}
              onSubmit={loginSubmit}
            >
              {error && <p className="error">{error}</p>}
              <div className="login-email">
                <FontAwesomeIcon icon={faEnvelope} className="icon-clr" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="login-password">
                <FontAwesomeIcon icon={faLock} className="icon-clr" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forget" className="forget-password">
                Password Forget?
              </Link>
              <input type="submit" className="login-btn btn" value="Login" />
            </form>
            <form
              className={`signup-form ${showRegister ? "login-form-show" : ""}`}
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={handleRegisterSubmit}
            >
              {error && <p className="error">{error}</p>}

              <div className="signup-name">
                <FontAwesomeIcon icon={faEnvelope} className="icon-clr" />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signup-email">
                <FontAwesomeIcon icon={faUser} className="icon-clr" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signup-password">
                <FontAwesomeIcon icon={faLock} className="icon-clr" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>

              <div className="register-image">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                value={"Register"}
                className="signup-btn btn"
                disabled={loading ? true : false}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginSignUp;
