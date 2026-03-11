import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
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
  return <LandingPage />;
}
