// AppLayout.jsx
import React from "react";
import Sidebar from "../components/sidebar"; // your main sidebar
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}

      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
