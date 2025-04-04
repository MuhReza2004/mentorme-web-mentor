import NavbarMentor from "../../components/NavbarMentor";
import SideBar from "../../components/Sidebar";
import ExchangeContent from "../../content/Profile/ExchangeContent";

const ExchangeLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <ExchangeContent/>
      </main>
    </div>
    )
};

export default ExchangeLayout