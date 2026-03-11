import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./components/sidebar";
import Chat from "./pages/chat";
// import HomePage from "./pages/HomePage";
// import Profile from "./Profile";

export default function App() {
   useEffect(() => {
    document.title = "EntreRoom";
  });

  return (
    <Router>
      <Sidebar />
      <div className="ml-24 md:ml-24">
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
      
        </Routes>
      </div>
    </Router>
  );
}