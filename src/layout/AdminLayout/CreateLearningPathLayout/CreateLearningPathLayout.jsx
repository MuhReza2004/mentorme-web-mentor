import SideBar from "../../../components/Sidebar";
import CreateLearningPathContent from "../../../content/Admin/CreateLearingPath/CreateLearningPathContent";

const CreateLearningPathLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <CreateLearningPathContent />
      </main>
    </div>
    )
};

export default CreateLearningPathLayout