import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import {
  ListMentorPendingByAdmin,
  ListMentorRejectedByAdmin,
} from "../../../services/api";
import CourseCard from "../../../components/CourseCard";

const DashboardAdminContent = () => {
  const [selectedFilter, setSelectedFilter] = useState("Permintaan");
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMentors();
  }, [selectedFilter]);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      let data = [];
      if (selectedFilter === "Permintaan") {
        const response = await ListMentorPendingByAdmin();
        data = response?.data || [];
        console.log("DATA YANG DITERIMA:", response);
      } else if (selectedFilter === "Ditolak") {
        const response = await ListMentorRejectedByAdmin();
        data = response || [];
      }
      setMentors(data);
    } catch (error) {
      console.error("Gagal mengambil data mentor:", error);
    } finally {
      setLoading(false);
    }
  };

  // Animasi card
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Validation Mentor</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-3 mb-6">
        {["Permintaan", "Ditolak"].map((filter) => (
          <button
            key={filter}
            className={`px-6 py-2 rounded-full transition font-semibold ${
              selectedFilter === filter
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Mentor List */}
      {loading ? (
        <div className="flex justify-center items-center h-150">
          <LoadingSpinner size="10" color="blue-500" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {mentors.length > 0 ? (
            mentors.map((mentor, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <CourseCard
                  course={mentor}
                  status={mentor.status}
                  detailPath={
                    selectedFilter === "Permintaan"
                      ? "/DetailMentorRequest"
                      : "/DetailMentorRejected"
                  }
                  labelRole="MENTOR"
                ></CourseCard>
              </motion.div>
            ))
          ) : (
            <p className="text-center w-full col-span-full text-gray-500">
              Tidak ada data mentor.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardAdminContent;
