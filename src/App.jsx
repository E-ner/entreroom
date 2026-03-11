import React from "react";
import { useEffect } from "react";
import { app, db } from "./firebase";

import { collection, addDoc } from "firebase/firestore";
export default function App() {
  const collections = collection(db, "work");

  addDoc(collections, {
    work: "Neric",
  })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
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
