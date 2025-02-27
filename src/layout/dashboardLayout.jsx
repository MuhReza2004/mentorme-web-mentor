import NavbarMentor from "../components/NavbarMentor";
import SideBar from "../components/Sidebar";
import DashboardMentorContent from "../content/DashboardMentor/DashboardMentorContent";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <DashboardMentorContent />
      </main>
    </div>
  );
};

export default DashboardLayout;
