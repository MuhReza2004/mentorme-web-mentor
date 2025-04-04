import NavbarMentor from "../../components/NavbarMentor";
import SideBar from "../../components/Sidebar";
import DetailExchangeContent from "../../content/Profile/DetailExchangeContent";

const DetailExchangeLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <DetailExchangeContent/>
      </main>
    </div>
    )
};

export default DetailExchangeLayout