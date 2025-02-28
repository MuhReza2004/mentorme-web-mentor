import SideBar from "../components/Sidebar";
import NavbarMentor from "../components/NavbarMentor";
import TraineeActivityContent from "../content/DashboardMentor/TraineeActivityContent";

const TraineeActivityLayout = () => {
    return (
           <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <TraineeActivityContent />
      </main>
    </div>
    );
}

export default TraineeActivityLayout