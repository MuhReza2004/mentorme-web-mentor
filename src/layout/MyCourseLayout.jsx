import MyCourseContent from "../content/MyCourse/MyCourseContent";
import SideBar from "../components/Sidebar";
import NavbarMentor from "../components/NavbarMentor";

const MyCourseLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <MyCourseContent />
      </main>
    </div>
  );
};

export default MyCourseLayout;
