import NavbarMentor from "../../../components/NavbarMentor";
import SideBar from "../../../components/Sidebar";
import DetailCourseValidationContent from "../../../content/Admin/Course Validation/DetailCourseValidationContent";

const DetailCourseValidationLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <DetailCourseValidationContent />
      </main>
    </div>
    )
};

export default DetailCourseValidationLayout