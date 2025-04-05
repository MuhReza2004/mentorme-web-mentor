import NavbarMentor from "../../components/NavbarMentor";
import SideBar from "../../components/Sidebar";
import BantuanContent from "../../content/Bantuan/BantuanContent";

const BantuanLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <BantuanContent />
      </main>
    </div>
    )
};

export default BantuanLayout