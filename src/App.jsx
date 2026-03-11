import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";


import MessagesWrapper from "./components/chats/chatlayout";
import ChatPage from "./components/chats/chatpage";
import AppLayout from "./components/UserLayout";
import MessagesList from "./components/chats/chatlist";

export default function App() {
  useEffect(() => {
    document.title = "EntreRoom";
  });

  return (
    <Router>


      <div className="ml-24 md:ml-24">

        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/home" element={<Home />} />

          <Route path="/user" element={<AppLayout />} >
            <Route path="messages" element={<MessagesList />} />
            <Route path=":chatId" element={<ChatPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

