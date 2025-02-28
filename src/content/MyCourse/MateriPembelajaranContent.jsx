import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const MateriPembelajaranContent = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <main className="p-6 w-full">
        <header className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold">My Course : Pemrograman WEB</h1>
        </header>
        <h2 className="text-lg text-gray-700 mb-4">My Trainee : Mahmud</h2>

        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((pertemuan) => (
            <div 
              key={pertemuan} 
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">Pertemuan {pertemuan}</h3>
                <button 
                  onClick={() => navigate("/DetailSyllabus")} 
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
                >
                  Lihat Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MateriPembelajaranContent;
