import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";

const Dashboard = () => {
    const navigate = useNavigate();
    
    return (
        <div className="bg-gray-100">
            <div className="flex">
                <SideBar />
                <main className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">My Activity</h2>
                    </div>
                    <div className="grid grid-flow-col gap-6 overflow-x-auto">
                        {[25, 50, 75].map((progress, index) => (
                            <div 
                                key={index} 
                                className="bg-white p-4 rounded-lg shadow-lg w-[300px] cursor-pointer hover:shadow-xl transition duration-200"
                                onClick={() => navigate("/ProgressTrainee")}
                            >
                                <img
                                    src="/src/assets/Icon/Maskot.png"
                                    alt={`Course ${index + 1}`}
                                    className="w-full h-[200px] object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold">Pemrograman Web</h3>
                                    <p className="mt-2 text-gray-600">Nama Trainee: Mahmud</p>
                                    <p className="mt-2 text-gray-600">{index + 1} / 4 Lessons</p>
                                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <p className="mt-2 text-right text-gray-600">{progress}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
