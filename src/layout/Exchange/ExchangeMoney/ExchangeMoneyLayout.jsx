import SideBar from "../../../components/Sidebar";
import ExchangeMoneyContent from "../../../content/Exchange/Money/ExchangeMoneyContent"

const ExchangeMoneyLayout = () => {
    return (
        <div className="flex">
        <SideBar />
        <main className="flex-1 pt-0">
          <ExchangeMoneyContent />
        </main>
      </div>
    )
}

export default ExchangeMoneyLayout;