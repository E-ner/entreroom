// MessagesList.jsx
import { Link } from "react-router-dom";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

const MessagesList = () => {
  const messagesRef = collection(db, "chats");  
  const q = query(messagesRef, orderBy("lastUpdated", "desc"));
  const [chats] = useCollectionData(q, { idField: "id" });

  return (
    <div className="w-1/3 border-r h-screen overflow-y-auto">
      {chats?.map((chat) => (
        <Link
          key={chat.id}
          to={`/messages/${chat.id}`}
          className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
        >
          <img
            src={chat.participantPhotoURL}
            alt="user"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold">{chat.participantName}</p>
            <p className="text-sm text-gray-500">{chat.lastMessage}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MessagesList;