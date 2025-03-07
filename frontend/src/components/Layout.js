import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar/TopBar";

const Layout = () => {
  return (
    <div>
      {/* Top Bar */}
      <TopBar />

      {/* Nested Routes will be rendered here */}
      <Outlet />
    </div>
  );
};

export default Layout;
