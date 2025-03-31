import { useEffect, useState } from "react";
import { GetBuyProject } from "../../services/api";
import { motion } from "framer-motion"; // Import Framer Motion
import { Navigate, useNavigate } from "react-router-dom";

const DashboardMentorContent = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await GetBuyProject();
        if (response && response.data) {
          setActivities(response.data);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Memisahkan mentor yang sudah dan belum menyelesaikan semua lesson
  const completedLessons = activities.filter(
    (item) => item.lessonNotComplete === 0
  );
  const inProgressLessons = activities.filter(
    (item) => item.lessonNotComplete > 0
  );

  // Fungsi untuk menghitung persentase progress
  const calculateProgress = (completed, notCompleted) => {
    const total = completed + notCompleted;
    return total === 0 ? 100 : Math.round((completed / total) * 100);
  };

  // Animasi untuk Card
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  // Komponen Card untuk menampilkan data mentor
  const MentorCard = ({ item }) => (
    <motion.button
      key={item.ID}
      className="bg-white shadow-lg rounded-xl p-3 hover:shadow-xl transition w-40 sm:w-48"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onClick={() => navigate(`/DetailActivityTrainee/${item.ID}`)}
    >
      <img
        src={`data:image/png;base64,${item.picture}`}
        alt={item.materialName}
        className="w-full h-24 object-cover rounded-md"
      />
      <div className="mt-2">
        <h2 className="text-sm font-semibold text-gray-800 truncate">
          {item.materialName}
        </h2>
        <p className="text-xs text-gray-600 truncate">By: {item.fullName}</p>

        {/* Progress Bar */}
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">Progress:</p>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-blue-500 h-2"
              initial={{ width: "0%" }}
              animate={{
                width: `${calculateProgress(
                  item.lessonComplete,
                  item.lessonNotComplete
                )}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1 text-center">
            {item.lessonComplete} /{" "}
            {item.lessonComplete + item.lessonNotComplete} Lessons
          </p>
        </div>
      </div>
    </motion.button>
  );

  return (
    <div className="p-4 space-y-12">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {/* Mentor yang telah menyelesaikan semua lesson */}
          {completedLessons.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">
                Mentor Completed All Lessons
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {completedLessons.map((item) => (
                  <MentorCard key={item.ID} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Mentor yang sedang dalam proses menyelesaikan lesson */}
          {inProgressLessons.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Mentor In Progress</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {inProgressLessons.map((item) => (
                  <MentorCard key={item.ID} item={item} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardMentorContent;
