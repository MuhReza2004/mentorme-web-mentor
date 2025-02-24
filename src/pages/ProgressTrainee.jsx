import { useNavigate } from 'react-router-dom';
import SideBar from "../components/Sidebar";
import { FaArrowLeft } from "react-icons/fa";

const ProgressTrainee = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 flex">
            <SideBar />
            
            <main className="p-6 w-full">
                <header className="flex justify-between items-center">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
                    >
                        <FaArrowLeft className="mr-2" /> Back
                    </button>
                    <h1 className="text-2xl font-bold">My Course : Pemrograman WEB</h1>
                </header>
                <h2 className="mt-2 text-xl">My Trainee : Mahmud</h2>
                
                <div className="mt-6 space-y-4">
                    {[1, 2, 3].map((pertemuan) => (
                        <div key={pertemuan} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold">Pertemuan {pertemuan}</h3>
                                <button 
                                    onClick={() => navigate('/TraineeActivity')} 
                                    className="bg-green-400 text-white px-4 py-2 rounded mt-2"
                                >
                                    Isi Laporan Aktivitas
                                </button>
                            </div>
                            <span className="text-red-500">Belum Dibuat</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProgressTrainee;
