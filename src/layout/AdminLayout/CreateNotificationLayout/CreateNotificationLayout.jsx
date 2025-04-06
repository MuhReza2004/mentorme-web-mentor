import SideBar from "../../../components/Sidebar";
import CreateNotificationContent from "../../../content/Admin/CreateNotification/CreateNotificationContent";

const CreateNotificationLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <CreateNotificationContent />
      </main>
    </div>
    )
};

export default CreateNotificationLayout