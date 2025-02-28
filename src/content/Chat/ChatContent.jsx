import { useState } from "react";
import { Send, AlertTriangle } from "lucide-react";

const ChatContent = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "balio mahmud", time: "19:20", sender: "user" },
    { id: 2, text: "balio mahmud", time: "19:20", sender: "other" },
  ]);

  const contacts = [
    { id: 1, name: "Mahmud Hermawan", lastMessage: "apa bikin?" },
    { id: 2, name: "Mahmud Hermawan", lastMessage: "apa bikin?" },
    { id: 3, name: "Mahmud Hermawan", lastMessage: "apa bikin?" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat Box */}
      <div className="flex-1 flex flex-col justify-between bg-white p-4">
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`p-3 rounded-lg shadow-md max-w-xs ${
                  msg.sender === "user" ? "bg-green-200" : "bg-gray-200"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs text-right text-gray-500">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input & Report */}
        <div className="flex items-center gap-2 mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-1">
            <AlertTriangle size={16} /> Laporkan
          </button>
          <div className="flex-1 flex items-center border border-gray-300 rounded-lg p-2">
            <input
              type="text"
              placeholder="Ketik pesan..."
              className="flex-1 outline-none px-2"
            />
            <Send className="text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="w-1/4 bg-teal-200 p-4">
        <h2 className="font-bold">BERLANGSUNG</h2>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center gap-2 bg-white p-2 my-2 rounded-lg shadow-md cursor-pointer"
          >
            <img
              src="/src/assets/Icon/Maskot.png"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{contact.name}</p>
              <p className="text-sm text-gray-600">{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatContent;