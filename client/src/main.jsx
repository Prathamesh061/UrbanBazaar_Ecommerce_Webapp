import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { AlertProvider } from "./contexts/alertContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AlertProvider>
      <App />
    </AlertProvider>
  </Provider>
);
