import { useState, useEffect } from "react";
import { GetHistoryChat } from "../services/api";

const RightSidebar = ({ onSelectChat }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const role = localStorage.getItem("role")?.toLowerCase();
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await GetHistoryChat();
        if (response?.data) {
          let filteredChats = response.data;

          if (role === "mentor" || role === "admin") {
            filteredChats = filteredChats.filter(
              (chat) => chat.nameMentor?.toLowerCase() !== "admin"
            );
          }

          setChatRooms(filteredChats);
        }
      } catch (error) {
        console.error("Gagal mengambil daftar chat:", error);
      }
    };

    fetchChatRooms();
  }, [role]);

  const isNewMessage = (chatId) => {
    const lastOpened = localStorage.getItem(`lastSeen_${chatId}`);
    return !lastOpened;
  };

  const handleSelectChat = (chatId) => {
    localStorage.setItem(`lastSeen_${chatId}`, new Date().toISOString());
    onSelectChat(chatId);
  };

  const getDisplayName = (chat) => {
    if (role === "MENTOR") {
      return chat.emailMentor || "Tanpa Nama";
    }  else  {
      return chat.nameCustomer || "Tanpa Nama";
    }
  };

  return (
    <div className="w-1/5 min-h-screen bg-gray-100 p-4 border-l">
      <h2 className="font-bold mb-2">Daftar Chat</h2>
      {chatRooms.length > 0 ? (
        chatRooms.map((chat) => (
          <div
            key={chat.idRoom}
            className="cursor-pointer p-2 bg-white rounded-lg shadow mb-2 hover:bg-gray-50 transition flex justify-between items-center"
            onClick={() => handleSelectChat(chat.idRoom)}
          >
            <div>
              <p className="font-semibold">{getDisplayName(chat)}</p>
              <p className="text-xs text-gray-500">Room ID: {chat.idRoom}</p>
            </div>

            {isNewMessage(chat.idRoom) && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Baru
              </span>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">Tidak ada chat tersedia.</p>
      )}
    </div>
  );
};

export default RightSidebar;
