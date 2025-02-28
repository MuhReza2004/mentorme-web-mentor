import NavbarMentor from "../components/NavbarMentor";
import SideBar from "../components/Sidebar";
import DetailMyCourseContent from "../content/MyCourse/DetailMyCourseContent";

const DetailMyCourseLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <DetailMyCourseContent />
      </main>
    </div>
    );  
}

export default DetailMyCourseLayout