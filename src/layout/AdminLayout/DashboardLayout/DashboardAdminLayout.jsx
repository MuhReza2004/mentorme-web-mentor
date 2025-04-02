import NavbarMentor from "../../../components/NavbarMentor";
import SideBar from "../../../components/Sidebar";
import DashboardAdminContent from "../../../content/Admin/DashboardAdmin/DashboardAdminContent";

const DashboardAdminLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <DashboardAdminContent />
      </main>
    </div>
    )
};

export default DashboardAdminLayout