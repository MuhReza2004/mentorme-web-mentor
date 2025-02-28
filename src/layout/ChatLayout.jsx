import NavbarMentor from "../components/NavbarMentor"
import SideBar from "../components/Sidebar"
import ChatContent from "../content/Chat/ChatContent"

const ChatLayout = () => {
    return (
            <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <ChatContent />
      </main>
    </div>
    )
}

export default ChatLayout