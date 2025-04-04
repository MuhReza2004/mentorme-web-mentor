import SideBar from "../../../components/Sidebar";
import CourseValidationContent from "../../../content/Admin/Course Validation/CourseValidationContent";

const CourseValidationLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <CourseValidationContent />
      </main>
    </div>
    )
};

export default CourseValidationLayout