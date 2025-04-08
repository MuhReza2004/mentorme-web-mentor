import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { ListProjectPendingByAdmin, ListProjectAcceptedByAdmin, ListProjectRejectedByAdmin } from "../../../services/api"; 
import LoadingSpinner from "../../../components/Loading/LoadingSpinner"; // Pastikan path importnya benar

const CourseValidationContent = () => {
  const [selectedFilter, setSelectedFilter] = useState("Permintaan");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data = [];
        // Sesuaikan endpoint berdasarkan selectedFilter
        if (selectedFilter === "Permintaan") {
          data = await ListProjectPendingByAdmin(); // Panggil API untuk Permintaan
        } else if (selectedFilter === "Diterima") {
          data = await ListProjectAcceptedByAdmin(); // Panggil API untuk Diterima
        } else if (selectedFilter === "Ditolak") {
          data = await ListProjectRejectedByAdmin(); // Panggil API untuk Ditolak
        }
        setCourses(data?.data || []);
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedFilter]);

  const handleDetailClick = (ID) => {
    navigate(`/DetailCourseValidation/${ID}`);
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Validation Mentor Course</h1>
      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        {["Permintaan", "Diterima", "Ditolak"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full ${selectedFilter === filter ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner size="10" color="gray-900" />
        </div>
      ) : (
        // Course Cards Grid
        <div className="flex flex-wrap gap-4">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index} className="bg-white shadow-md rounded-xl p-2 w-48 h-60 flex flex-col items-center text-center border">
                <img 
                  src={`data:image/png;base64,${course.picture}`} 
                  alt="Course Image" 
                  className="w-24 h-24 object-cover rounded-lg mb-4" 
                />
                <h2 className="text-lg font-semibold">{course.mentor}</h2>
                
                <p className="text-gray-700">Course: {course.materialName}</p>
                <p className={`font-semibold ${selectedFilter === "Diterima" ? "text-green-500" : selectedFilter === "Ditolak" ? "text-red-500" : "text-yellow-500"}`}>{selectedFilter}</p>

                {/* Kondisi untuk menampilkan tombol detail hanya jika statusnya "Permintaan" */}
                {selectedFilter === "Permintaan" && (
                  <button 
                    className="text-blue-600 mt-2 font-medium"
                    onClick={() => handleDetailClick(course.ID)} 
                  >
                    Lihat Detail &gt;
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseValidationContent;
