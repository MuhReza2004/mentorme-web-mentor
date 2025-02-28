import NavbarMentor from "../components/NavbarMentor";
import SideBar from "../components/Sidebar";
import CreateCourseContent from "../content/MyCourse/CreateCourseContent";

const CreateCourseLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <CreateCourseContent />
      </main>
    </div>
    )
};

export default CreateCourseLayout