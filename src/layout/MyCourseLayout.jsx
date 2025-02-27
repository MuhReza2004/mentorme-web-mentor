import MyCourseContent from "../content/MyCourse/MyCourseContent";
import Navbar from "../components/landingPage/Navbar";
import SideBar from "../components/Sidebar";

const MyCourseLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <Navbar />
        <MyCourseContent />
      </main>
    </div>
  );
};

export default MyCourseLayout;
