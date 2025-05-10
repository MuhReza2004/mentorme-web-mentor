import { useState, useEffect, useRef } from "react";
import { Send, AlertTriangle } from "lucide-react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { GetHistoryChat } from "../../services/api";
import { db } from "../../firebaseConfig";

const ChatContent = ({ selectedChatRoom }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [mentorName, setMentorName] = useState("");

  const email = localStorage.getItem("email");
  const name = localStorage.getItem("nameUser") || "Anonim";
  const role = localStorage.getItem("role") || "Mentor";
  const chatEndRef = useRef(null);

  // Ambil pesan dari Firestore berdasarkan roomId
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
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      },
      (error) => {
        console.error("Error mendapatkan pesan real-time:", error);
      }
    );

    return () => unsubscribe();
  }, [selectedChatRoom]);

  // Scroll otomatis ke bawah setiap kali pesan berubah
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Ambil nama mentor berdasarkan room ID
  useEffect(() => {
    const fetchMentorName = async () => {
      if (!selectedChatRoom) {
        setMentorName("");
        return;
      }

      try {
        const response = await GetHistoryChat();
        const chatRoom = response.data.find(
          (room) => room.idRoom === selectedChatRoom
        );

        if (chatRoom) {
          setMentorName(chatRoom.nameMentor || "Tanpa Nama");
        } else {
          setMentorName("Chat Tidak Ditemukan");
        }
      } catch (error) {
        console.error("Gagal mengambil nama mentor:", error);
        setMentorName("Kesalahan Mengambil Data");
      }
    };

    fetchMentorName();
  }, [selectedChatRoom]);

  const sendMessage = async () => {
    if (!email) {
      console.error("Email tidak ditemukan! Harap login.");
      return;
    }

    if (newMessage.trim() === "" || !selectedChatRoom) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        sender: name,
        senderEmail: email,
        senderRole: role,
        receiverRole: role,
        receiverEmail: email,
        roomId: selectedChatRoom,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
    }

    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col justify-between bg-white p-4">
        <h2 className="font-bold text-xl mb-4">
          {/* Name: {mentorName || ""} */}
        </h2>

        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderEmail === email ? "justify-end" : "justify-start"
                }`}
                ref={index === messages.length - 1 ? chatEndRef : null}
              >
                <div
                  className={`p-3 rounded-lg shadow-md max-w-xs ${
                    msg.senderEmail === email ? "bg-gray-200" : "bg-green-200"
                  }`}
                >
                  <p className="font-bold">{msg.sender}</p>
                  <p>{msg.text}</p>
                  <p className="text-xs text-right text-gray-500">
                    {msg.timestamp?.toDate
                      ? msg.timestamp.toDate().toLocaleTimeString()
                      : "Mengirim..."}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Belum ada pesan.</p>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4">
          {/* <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-1">
            <AlertTriangle size={16} /> Laporkan
          </button> */}
          <div className="flex-1 flex items-center border border-gray-300 rounded-lg p-2">
            <input
              type="text"
              placeholder={
                email ? "Ketik pesan..." : "Silakan login untuk mengirim pesan"
              }
              className="flex-1 outline-none px-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={!email || !selectedChatRoom}
            />
            <Send
              className="text-gray-500 cursor-pointer"
              onClick={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
