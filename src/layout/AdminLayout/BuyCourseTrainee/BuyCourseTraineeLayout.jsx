import SideBar from "../../../components/Sidebar";
import BuyTraineeContent from "../../../content/Admin/BuyCourseTrainee/BuyCourseTraineeContent";

const BuyTraineeLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <BuyTraineeContent />
      </main>
    </div>
  );
};

export default BuyTraineeLayout;
