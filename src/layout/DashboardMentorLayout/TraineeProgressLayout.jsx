import NavbarMentor from "../../components/NavbarMentor";
import SideBar from "../../components/Sidebar";
import TraineeProgressContent from "../../content/DashboardMentor/TraineeProgressContent";

const TraineeProgressLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <TraineeProgressContent />
      </main>
    </div>
    )
};

export default TraineeProgressLayout