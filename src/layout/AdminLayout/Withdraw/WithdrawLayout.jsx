import SideBar from "../../../components/Sidebar";
import WithdrawContent from "../../../content/Admin/Withdraw/WithdrawContent";

const WithdrawLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <WithdrawContent />
      </main>
    </div>
  );
};

export default WithdrawLayout;
