import DetailActivityTraineeContent from "../../content/DashboardMentor/DetailActivityTraineeContent";
import NavbarMentor from "../../components/NavbarMentor";
import SideBar from "../../components/Sidebar";

const DetailActivityTraineeLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <DetailActivityTraineeContent />
      </main>
    </div>
    )
};

export default DetailActivityTraineeLayout