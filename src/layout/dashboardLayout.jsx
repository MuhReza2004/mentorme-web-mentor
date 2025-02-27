import Navbar from "../components/landingPage/Navbar";
import SideBar from "../components/Sidebar";
import DashboardMentorContent from "../content/DashboardMentor/DashboardMentorContent";

const DashboardLayout = () => {
   return (
     <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <Navbar/>
        <DashboardMentorContent/>
      </main>
     </div>
   )
};

export default DashboardLayout;
