import SideBar from "../../components/Sidebar"
import NotificationContent from "../../content/Notification/Notification";

const NotificationLayout = () => {
    return (
        <div className="flex">
        <SideBar />
        <main className="flex-1 pt-0">
        <NotificationContent />
        </main>
      </div>
    )
}


export default NotificationLayout;