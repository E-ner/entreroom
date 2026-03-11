import React from "react";
import { useEffect } from "react";
import Sidebar from "./components/sidebar";
// import Chat from "./pages/chat"

export default function App() {
  useEffect(() => {
    document.title = "EntreRoom";
  });

  return(
<>
<Sidebar/>
{/* <Chat/> */}

</>

  )
}
