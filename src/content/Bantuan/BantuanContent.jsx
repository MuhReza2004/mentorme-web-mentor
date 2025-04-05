import { useEffect, useState, useRef } from "react";
import { Send, Plus, Image as ImageIcon } from "lucide-react";
import { GetHistoryChat, StartChat } from "../../services/api";
import { db } from "/src/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";

const BantuanContent = () => {
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  const email = localStorage.getItem("email");
  const name = localStorage.getItem("nameUser") || "Anonim";
  const role = localStorage.getItem("role") || "User";
    console.log("Role:", name);
  useEffect(() => {
    const initChat = async () => {
      try {
        const history = await GetHistoryChat();

        const adminRoom = history?.data?.find(
          (room) => room.nameMentor === "admin"
        );

        if (adminRoom) {
          setRoomId(adminRoom.idRoom);
        } else {
          const newChat = await StartChat({ email: "adminn@gmail.com" });
          if (newChat?.data) {
            setRoomId(newChat.data);
          }
        }
      } catch (error) {
        console.error("Gagal memulai chat bantuan:", error);
      }
    };

    initChat();
  }, []);

  useEffect(() => {
    if (!roomId) return;

    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("roomId", "==", roomId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!email || !newMessage.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        sender: name,
        senderEmail: email,
        senderRole: role,
        roomId,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] w-full bg-white p-2 text-sm">
      <h2 className="font-semibold text-base mb-2 text-center">Bantuan</h2>

      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderEmail === email ? "justify-end" : "justify-start"
            }`}
            ref={index === messages.length - 1 ? chatEndRef : null}
          >
            <div
              className={`p-2 rounded-lg shadow max-w-[75%] text-xs ${
                msg.senderEmail === email ? "bg-gray-200" : "bg-green-200"
              }`}
            >
              <p className="font-semibold">{msg.sender}</p>
              <p className="break-words">{msg.text}</p>
              <p className="text-[10px] text-right text-gray-500 mt-1">
                {msg.timestamp?.toDate
                  ? msg.timestamp.toDate().toLocaleTimeString()
                  : "Mengirim..."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div className="mt-2 flex items-center border border-gray-300 rounded-full px-2 py-1 gap-1">
        <button className="text-gray-500 p-1">
          <Plus size={16} />
        </button>
        <input
          type="text"
          className="flex-1 outline-none px-1 text-sm"
          placeholder="Ketik..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={!roomId}
        />
        <button className="text-gray-500 p-1">
          <ImageIcon size={16} />
        </button>
        <button onClick={sendMessage} className="text-gray-500 p-1">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default BantuanContent;
