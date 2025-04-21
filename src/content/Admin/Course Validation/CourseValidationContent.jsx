import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListProjectPendingByAdmin,
  ListProjectAcceptedByAdmin,
  ListProjectRejectedByAdmin,
} from "../../../services/api";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import CourseCard from "../../../components/CourseCard";

const CourseValidationContent = () => {
  const [selectedFilter, setSelectedFilter] = useState("Permintaan");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedFilter]);

  const getStatus = () => {
    switch (selectedFilter) {
      case "Diterima":
        return "accepted";
      case "Ditolak":
        return "rejected";
      default:
        return "pending";
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Validation Mentor Course</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        {["Permintaan", "Diterima", "Ditolak"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full ${
              selectedFilter === filter
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner size="10" color="gray-900" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Render Courses */}
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course.ID}
                course={course}
                status={getStatus()}
                detailPath="/DetailCourseValidation"
                labelRole="MENTOR"
              />
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
