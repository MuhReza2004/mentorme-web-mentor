import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 Import useNavigate
import { ListMentorRejectedByAdmin, ListMentorPendingByAdmin } from "../../../services/api";

const DashboardAdminContent = () => {
  const [selectedFilter, setSelectedFilter] = useState("Permintaan");
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate(); // 🔥 Inisialisasi useNavigate

  useEffect(() => {
    fetchMentors();
  }, [selectedFilter]);

  const fetchMentors = async () => {
    try {
      let data = [];
      if (selectedFilter === "Permintaan") {
        const response = await ListMentorPendingByAdmin();
        data = response?.data || [];
      } else if (selectedFilter === "Ditolak") {
        const response = await ListMentorRejectedByAdmin();
        data = response?.data || [];
      }
      setMentors(data);
    } catch (error) {
      console.error("Gagal mengambil data mentor:", error);
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Validation Mentor</h1>
      
      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        {["Permintaan", "Ditolak"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full ${selectedFilter === filter ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* Mentor List */}
      <div className="flex flex-wrap gap-4">
        {mentors.length > 0 ? (
          mentors.map((mentor, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center border">
              <img 
                src={`data:image/png;base64,${mentor.picture}`} 
                alt="Mentor Image" 
                className="w-24 h-24 object-cover rounded-lg mb-4" 
              />
              <h2 className="text-lg font-semibold">{mentor.fullName}</h2>
              <p className="text-red-500 font-semibold">{mentor.status}</p>
              <button 
                className="text-blue-600 mt-2 font-medium"
                onClick={() => navigate(`/DetailMentorRequest/${mentor.email}`)} // 🔥 Navigasi ke Detail Mentor
              >
                Lihat Detail &gt;
              </button>
            </div>
          ))
        ) : (
          <p className="text-center w-full">Tidak ada data mentor.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAdminContent;
