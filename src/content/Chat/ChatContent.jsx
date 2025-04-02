import { useState, useEffect } from "react";
import { Send, AlertTriangle } from "lucide-react";
import { db } from "/src/firebaseConfig"; // 🔥 Import Firestore
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 🔥 Ambil user dari localStorage dengan JSON.parse
    const storedUser = localStorage.getItem("user");
    console.log("User diambil dari localStorage:", user?.role);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.name) {
          setUser(parsedUser);
          console.log("User berhasil diambil dari localStorage:", parsedUser);
        } else {
          console.error("User tidak memiliki nama yang valid.");
        }
      } catch (error) {
        console.error("Gagal parse user dari localStorage:", error);
      }
    }

    // 🔥 Ambil pesan dari Firestore secara real-time
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeMessages();
    };
  }, []);

  const sendMessage = async () => {
    if (!user || !user.name) {
      console.error("User tidak ditemukan atau tidak memiliki nama!");
      return;
    }

    if (newMessage.trim() === "") return; // 🔥 Cegah pesan kosong

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        sender: user.name, // 🔥 Gunakan name dari localStorage
        senderRole: user.role?.role || "Anonim", // 🔥 Gunakan role sebagai info tambahan
        timestamp: serverTimestamp(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat Box */}
      <div className="flex-1 flex flex-col justify-between bg-white p-4">
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === user?.name ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-lg shadow-md max-w-xs ${
                  msg.sender === user?.name ? "bg-gray-200" : "bg-green-200"
                }`}
              >
                <p className="font-bold">{msg.sender} ({msg.senderRole})</p>
                <p>{msg.text}</p>
                <p className="text-xs text-right text-gray-500">
                  {msg.timestamp?.toDate().toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input & Send */}
        <div className="flex items-center gap-2 mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-1">
            <AlertTriangle size={16} /> Laporkan
          </button>
          <div className="flex-1 flex items-center border border-gray-300 rounded-lg p-2">
            <input
              type="text"
              placeholder={user ? "Ketik pesan..." : "Silakan login untuk mengirim pesan"}
              className="flex-1 outline-none px-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={!user}
            />
            <Send className="text-gray-500 cursor-pointer" onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;