import { useState } from "react";
import SideBar from "../components/Sidebar";
import RightSidebar from "../components/SidebarChat";
import ChatContent from "../content/Chat/ChatContent";

const ChatLayout = () => {
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1">
        <ChatContent selectedChatRoom={selectedChatRoom} /> {/* 🔥 Kirim ID room ke ChatContent */}
      </main>
      <RightSidebar onSelectChat={setSelectedChatRoom} /> {/* 🔥 Pilih chat dari RightSidebar */}
    </div>
  );
};

export default ChatLayout;
