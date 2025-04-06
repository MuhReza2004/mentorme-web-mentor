import SideBar from "../../../components/Sidebar";
import VoucherContent from "../../../content/Admin/Voucher/VoucherContent";

const VoucherLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <VoucherContent />
      </main>
    </div>
    )
};

export default VoucherLayout