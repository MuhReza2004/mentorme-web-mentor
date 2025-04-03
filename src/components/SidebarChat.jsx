import { useState, useEffect } from "react";
import { GetHistoryChat } from "../services/api"; // 🔥 Import API GetHistoryChat

const RightSidebar = ({ onSelectChat }) => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await GetHistoryChat();
        if (response?.data) {
          setChatRooms(response.data); // 🔥 Set daftar chat rooms dari API
        }
      } catch (error) {
        console.error("Gagal mengambil daftar chat:", error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="w-1/4 bg-gray-100 p-4 border-l">
      <h2 className="font-bold mb-2">Daftar Chat</h2>
      {chatRooms.length > 0 ? (
        chatRooms.map((chat) => (
          <div
            key={chat.idRoom}
            className="cursor-pointer p-2 bg-white rounded-lg shadow mb-2"
            onClick={() => onSelectChat(chat.idRoom)} // 🔥 Kirim ID room ke ChatLayout
          >
            <p className="font-semibold">Room ID: {chat.idRoom}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Tidak ada chat tersedia.</p>
      )}
    </div>
  );
};

export default RightSidebar;
