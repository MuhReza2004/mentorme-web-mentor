import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";

const TraineeActivityLayout = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 min-h-screen flex">
            <SideBar />
            <div className="flex-1 p-6 flex justify-center items-center">
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Rincian Kegiatan</h2>
                    <textarea 
                        placeholder="Rincian selama pertemuan berlangsung" 
                        className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
                    ></textarea>
                    
                    <h2 className="text-2xl font-bold mb-4">Dokumentasi</h2>
                    <div className="relative border rounded-lg p-3">
                        <input 
                            type="file" 
                            className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    
                    <div className="flex justify-end mt-6 space-x-4">
                        <button 
                        onClick={() => navigate(-1)} 
                        className="px-6 py-2 border rounded-lg hover:bg-gray-200">Batal</button>
                        <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Selesai</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TraineeActivityLayout