
// import "firebase/firestore";
// import "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";
// import { db, auth } from "../firebase";

// import {
//   collection,
//   query,
//   orderBy,
//   limit,
//   addDoc,
//   serverTimestamp
// } from "firebase/firestore";

// import { useState, useRef } from "react";



//  const Chat = () => {
//   const [user] = useAuthState(auth);

//   return (
//     <section>
//       {user && <ChatRoom />}
//     </section>
//   );
// };

// const ChatRoom = () => {
//   const dummy = useRef();

// const messagesRef = collection(db, "messages");

// const q = query(
//   messagesRef,
//   orderBy("createdAt"),
//   limit(25)
// );

//   const [messages] = useCollectionData(query, { idField: "id" });

//   const [formValue, setFormValue] = useState("");

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     const { uid, photoURL } = auth.currentUser;
// await addDoc(messagesRef, {
//   text: formValue,
//   createdAt: serverTimestamp(),
//   uid: auth.currentUser.uid,
//   photoURL: auth.currentUser.photoURL
// });
//     setFormValue("");
//     dummy.current.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <>
//       <main>
//         {messages && messages.map((msg) => (
//           <ChatMessage key={msg.id} message={msg} />
//         ))}
//         <div ref={dummy}></div>
//       </main>

//       <form onSubmit={sendMessage}>
//         <input
//           value={formValue}
//           onChange={(e) => setFormValue(e.target.value)}
//         />
//         <button type="submit">send</button>
//       </form>
//     </>
//   );
// };

// function ChatMessage(props) {
//   const { text, uid, photoURL } = props.message;

//   const messageClass =
//     uid === auth.currentUser.uid ? "sent" : "received";

//   return (
//     <div className={`message ${messageClass}`}>
//       <img src={photoURL} alt="user"/>
//       <p>{text}</p>
//     </div>
//   );
// }


// export default Chat