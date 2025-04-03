import SideBar from "../../../components/Sidebar";
import DetailMentorRequestContent from "../../../content/Admin/DashboardAdmin/DetailMentorRequestContent";

const DetailMentorRequestLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <DetailMentorRequestContent />
      </main>
    </div>
    )
};

export default DetailMentorRequestLayout