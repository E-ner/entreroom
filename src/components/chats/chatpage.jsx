// ChatPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

const ChatPage = () => {
  const { chatId } = useParams();

  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));
  const [messages] = useCollectionData(q, { idField: "id" });

  if (!messages) return <div>Loading chat...</div>;

  return (
    <div className="flex-1 h-screen overflow-y-auto p-4">
      {messages.map((msg) => (
        <div key={msg.id} className="mb-2">
          <p className="font-semibold">{msg.senderName}</p>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatPage;