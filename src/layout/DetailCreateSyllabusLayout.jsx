import NavbarMentor from "../components/NavbarMentor";
import SideBar from "../components/Sidebar";
import DetailCreateSyllabusContent from "../content/MyCourse/DetailCreateSyllabusContent";

const DetailCreateSyllabusLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <DetailCreateSyllabusContent />
      </main>
    </div>
    )
};

export default DetailCreateSyllabusLayout