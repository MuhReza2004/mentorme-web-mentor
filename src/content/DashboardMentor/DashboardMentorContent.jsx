import { useEffect, useState } from "react";
import { GetBuyProject } from "../../services/api";
import CourseCard from "../../components/CourseCard";
import { useNavigate } from "react-router-dom"; // gunakan ini

const DashboardMentorContent = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // inisialisasi

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

  const completedLessons = activities.filter(
    (item) => item.lessonNotComplete === 0
  );
  const inProgressLessons = activities.filter(
    (item) => item.lessonNotComplete > 0
  );

  return (
    <div className="p-6 space-y-12">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-16 ">
          <h2 className="text-xl font-semibold mb-2">
            Belum ada user yang membeli course Anda
          </h2>
          <p className="text-gray-600 mb-4">
            Silakan melakukan promosi untuk menarik lebih banyak pembeli.
          </p>
        </div>
      ) : (
        <>
          {completedLessons.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4">Selesai Semua Lesson</h2>
              <div className="flex flex-wrap gap-4 justify-start">
                {completedLessons.map((item) => (
                  <CourseCard
                    key={item.ID}
                    course={item}
                    status="in-progress"
                    detailPath="/DetailActivityTrainee"
                    labelRole="Trainee"
                  >
                    <button
                      onClick={() => navigate(`/TraineeProgress/${item.ID}`)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg mt-2 transition"
                    >
                      Lihat Progress
                    </button>
                  </CourseCard>
                ))}
              </div>
            </section>
          )}

          {inProgressLessons.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4">Sedang Berlangsung</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {inProgressLessons.map((item) => (
                  <CourseCard
                    key={item.ID}
                    course={item}
                    status="in-progress"
                    detailPath="/DetailActivityTrainee"
                    labelRole="Trainee"
                  >
                    <button
                      onClick={() => navigate(`/TraineeProgress/${item.ID}`)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg mt-2 transition"
                    >
                      Lihat Progress
                    </button>
                  </CourseCard>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardMentorContent;
