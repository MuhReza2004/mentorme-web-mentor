import { useState, useEffect } from "react";
import {
  ListProjectPendingByAdmin,
  ListProjectAcceptedByAdmin,
  ListProjectRejectedByAdmin,
} from "../../../services/api"; // Pastikan path sesuai

const CourseValidationContent = () => {
  const [selectedFilter, setSelectedFilter] = useState("Permintaan");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data = [];
        if (selectedFilter === "Permintaan") {
          data = await ListProjectPendingByAdmin();
        } else if (selectedFilter === "Diterima") {
          data = await ListProjectAcceptedByAdmin();
        } else if (selectedFilter === "Ditolak") {
          data = await ListProjectRejectedByAdmin();
        }
        setCourses(data?.data || []);
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedFilter]);

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
      {loading && <p>Loading...</p>}
      
      {/* Course Cards Grid */}
      <div className="flex flex-wrap gap-4">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center border">
              <img src={course.picture || "https://via.placeholder.com/150"} alt="Course" className="w-32 h-32 object-cover rounded-lg mb-4" />
              <h2 className="text-lg font-semibold">{course.mentor}</h2>
              <p className="text-gray-700">Course: {course.materialName}</p>
              <p className={`font-semibold ${selectedFilter === "Diterima" ? "text-green-500" : selectedFilter === "Ditolak" ? "text-red-500" : "text-yellow-500"}`}>{selectedFilter}</p>
              <button className="text-blue-600 mt-2 font-medium">Lihat Detail &gt;</button>
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
};

export default CourseValidationContent;
