// AppLayout.jsx
import React from "react";
import Sidebar from "../sidebar"; // your main sidebar
import MessagesList from "./chatlist";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
    
        <Sidebar />
      

      {/* Chat List */}
     
        <MessagesList />
  

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;