// MessagesWrapper.jsx
import React from "react";
import MessagesList from "./chatlist";
import { Outlet } from "react-router-dom";

const MessagesWrapper = () => {
  return (
    <div className="flex">
      <MessagesList />
      <div className="flex-1 flex items-center justify-center">
        <Outlet /> {/* Render selected chat here */}
      </div>
    </div>
  );
};

export default MessagesWrapper;