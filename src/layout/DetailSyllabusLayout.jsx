import NavbarMentor from "../components/NavbarMentor";
import SideBar from "../components/Sidebar";
import DetailSyllabusContent from "../content/MyCourse/DetailSyllabusContent";

const DetailSyllabusLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <DetailSyllabusContent />
      </main>
    </div>

    );
};

export default DetailSyllabusLayout;