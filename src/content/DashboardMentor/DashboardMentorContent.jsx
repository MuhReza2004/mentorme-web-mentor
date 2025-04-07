// pages/DashboardMentorContent.jsx
import { useEffect, useState } from "react";
import { GetBuyProject } from "../../services/api";
import CourseCard from "../../components/CourseCard";

const DashboardMentorContent = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await GetBuyProject();
        if (response && response.data) {
          setActivities(response.data);
          console.log("Activities:", response.data);
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
                    status="completed"
                    detailPath="/DetailActivityTrainee"
                    labelRole="Trainee"
                  />
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
                    status={"in-progress"}
                    detailPath="/DetailActivityTrainee"
                    labelRole="Trainee"
                  />
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
