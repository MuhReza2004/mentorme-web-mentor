import NavbarMentor from "../components/NavbarMentor";
import SideBar from "../components/Sidebar";
import CreateSyllabusContent from "../content/MyCourse/CreateSyllabusContent";

const CreateSyllabusLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <CreateSyllabusContent />
      </main>
    </div>
    )
};

export default CreateSyllabusLayout