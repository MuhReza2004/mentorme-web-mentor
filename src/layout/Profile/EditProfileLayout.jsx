import EditProfileContent from "../../content/Profile/EditProfileContent";
import NavbarMentor from "../../components/NavbarMentor";
import SideBar from "../../components/Sidebar";

const EditProfileLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <EditProfileContent />
      </main>
    </div>
    )
};

export default EditProfileLayout