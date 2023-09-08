import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import "../../app.css";

export default function Layout() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
