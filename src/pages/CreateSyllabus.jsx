import { useState } from "react";
import SideBar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const CreateSyllabus = () => {
      const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [task, setTask] = useState("");

    const handleSubmit = () => {
        console.log({ title, content, task });
        // Logic untuk menyimpan data pembelajaran
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <SideBar />
            
            {/* Main Content */}
            <main className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-4">Buat Materi Pembelajaran</h2>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="font-bold">Judul</label>
                        <input 
                            type="text" 
                            placeholder="Judul Pembelajaran"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="font-bold">Materi Pembelajaran</label>
                        <textarea 
                            placeholder="Aktivitas apa saja yang akan dilaksanakan ?"
                            value={content} 
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                        ></textarea>
                    </div>
                    
                    <div className="mb-4">
                        <label className="font-bold">Tugas</label>
                        <div className="relative">
                            <textarea 
                                placeholder="Masukkan Tugas yang akan diberikan"
                                value={task} 
                                onChange={(e) => setTask(e.target.value)}
                                className="w-full p-2 border rounded mt-2"
                            ></textarea>
                            <span className="absolute right-3 top-3 text-gray-500">📎</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between mt-6">
                        <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-300 text-black rounded">Batal</button>
                        <button 
                            onClick={handleSubmit} 
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Selesai
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateSyllabus;