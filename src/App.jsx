import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Index";
import { useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";

import MessagesWrapper from "./components/chats/chatlayout";
import ChatPage from "./components/chats/chatpage";
import AppLayout from "./components/UserLayout";
import MessagesList from "./components/chats/chatlist";
import BusinessHome from "./pages/user/posts/Posts";

export default function App() {
  useEffect(() => {
    document.title = "EntreRoom";
  });

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/home" element={<Home />} />

          <Route path="/user" element={<AppLayout />}>
            <Route path="" element={<BusinessHome />} />
            <Route path="messages" element={<MessagesList />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
