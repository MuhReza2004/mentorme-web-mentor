import SideBar from "../../../components/Sidebar";
import CreateCategoryContent from "../../../content/Admin/CreateCategory/CreateCategoryContent";

const CreateCategoryLayout = () => {
    return (
         <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <CreateCategoryContent />
      </main>
    </div>
    )
};

export default CreateCategoryLayout