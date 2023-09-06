// AlertContext.js
import React, { createContext, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import "./alertContext.css";

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({});

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert?.message && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
          <span className="close-btn" onClick={() => setAlert(null)}>
            <FontAwesomeIcon icon={faDeleteLeft} className="icon-clr" />
          </span>
        </div>
      )}
    </AlertContext.Provider>
  );
}
