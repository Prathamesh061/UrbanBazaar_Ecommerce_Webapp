import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../actions/userAction";
import {
  faPerson,
  faLongArrowAltRight,
  faListAlt,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import "./userOptions.css";
import { Backdrop } from "@material-ui/core";

function UserOptions({ user }) {
  const [open, setOpen] = useState(false);

  const options = [
    {
      icon: faListAlt,
      name: "Orders",
      func: orders,
    },
    { icon: faPerson, name: "Profile", func: account },
    { icon: faLongArrowAltRight, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({ icon: faDashboard, name: "Dashboard", func: dashboard });
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function logoutUser() {
    dispatch(logout());
    navigate("/");
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "-1" }} />
      <SpeedDial
        className="speed-dial"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={
          <img
            className="speed-dial-icon"
            src={user.avatar.url || "/profile.png"}
            alt="user-profile"
          />
        }
        direction="down"
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={<FontAwesomeIcon icon={item.icon} className="icon-clr" />}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default UserOptions;
