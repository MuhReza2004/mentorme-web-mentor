import { useState, useEffect, useRef } from "react";
import { Send, AlertTriangle } from "lucide-react";
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

const ChatContent = ({ selectedChatRoom }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name") || "Anonim";
  const role = localStorage.getItem("role") || "User";
const chatEndRef = useRef(null); // 🔥 Tambahkan ini

useEffect(() => {
  if (!selectedChatRoom) return;

  const messagesRef = collection(db, "messages");
  const q = query(
    messagesRef,
    where("roomId", "==", selectedChatRoom),
    orderBy("timestamp", "asc")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    },
    (error) => {
      console.error("Error mendapatkan pesan real-time:", error);
    }
  );

  return () => unsubscribe();
}, [selectedChatRoom]);


useEffect(() => {
  if (chatEndRef.current) {
    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]); // 🔥 Akan auto-scroll setiap kali daftar pesan berubah


const sendMessage = async () => {
  if (!email) {
    console.error("Email tidak ditemukan! Harap login.");
    return;
  }

  if (newMessage.trim() === "" || !selectedChatRoom) return;

  // 🔥 Tambahkan pesan sementara ke UI dengan ID unik
  const tempId = Math.random().toString();
  const tempMessage = {
    id: tempId,
    text: newMessage,
    sender: name,
    senderEmail: email,
    senderRole: role,
    roomId: selectedChatRoom,
    timestamp: null, // Belum ada timestamp dari Firestore
  };

  setMessages((prevMessages) => [...prevMessages, tempMessage]);

  try {
    const docRef = await addDoc(collection(db, "messages"), {
      text: newMessage,
      sender: name,
      senderEmail: email,
      senderRole: role,
      roomId: selectedChatRoom,
      timestamp: serverTimestamp(),
    });

    // 🔥 Hapus pesan sementara setelah pesan baru dengan timestamp tersedia di Firestore
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== tempId)
    );
  } catch (error) {
    console.error("Gagal mengirim pesan:", error);
  }

  setNewMessage("");
};



  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col justify-between bg-white p-4">
        <h2 className="font-bold text-xl mb-4">
          Chat Room: {selectedChatRoom || "Pilih Chat"}
        </h2>
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
  {messages.length > 0 ? (
    messages.map((msg, index) => (
      <div
        key={msg.id}
        className={`flex ${msg.senderEmail === email ? "justify-end" : "justify-start"}`}
        ref={index === messages.length - 1 ? chatEndRef : null} // 🔥 Ref untuk scroll otomatis
      >
        <div
          className={`p-3 rounded-lg shadow-md max-w-xs ${
            msg.senderEmail === email ? "bg-gray-200" : "bg-green-200"
          }`}
        >
          <p className="font-bold">{msg.sender}</p>
          <p>{msg.text}</p>
          <p className="text-xs text-right text-gray-500">
            {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString() : "Sending..."}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">Tidak ada pesan dalam room ini.</p>
  )}
</div>


        <div className="flex items-center gap-2 mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-1">
            <AlertTriangle size={16} /> Laporkan
          </button>
          <div className="flex-1 flex items-center border border-gray-300 rounded-lg p-2">
            <input
              type="text"
              placeholder={email ? "Ketik pesan..." : "Silakan login untuk mengirim pesan"}
              className="flex-1 outline-none px-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={!email || !selectedChatRoom}
            />
            <Send className="text-gray-500 cursor-pointer" onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
