import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActivityMentor } from "../../services/api";

const DashboardMentorContent = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const mentorId = localStorage.getItem("mentorId");

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        if (mentorId) {
          const data = await getActivityMentor(mentorId);
          setActivities(data);
        }
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat Mengambil data aktivitas:",
          error
        );
      }
    };
    fetchActivity();
  }, [mentorId]);

  return (
    <main className="bg-gray-100">
      <main className="flex justify-between items-center mb-6 pl-6 pt-6">
        <h2 className="text-xl font-bold">My Activity</h2>
      </main>
      <div className="grid grid-flow-col gap-6 overflow-x-auto pl-6">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white p-4 rounded-lg shadow-lg w-[300px] cursor-pointer hover:shadow-xl transition duration-200"
              onClick={() => navigate(`/ProgressTrainee/${activity.id}`)}
            >
              <img
                src={activity.imageUrl || "/Icon/Maskot.png"}
                alt={activity.courseName}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{activity.courseName}</h3>
                <p className="mt-2 text-gray-600">
                  Nama Trainee: {activity.traineeName}
                </p>
                <p className="mt-2 text-gray-600">
                  {activity.lessonsCompleted} / {activity.totalLessons} Lessons
                </p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${activity.progress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-right text-gray-600">
                  {activity.progress}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 pl-6 h-screen flex items-center justify-center">
            Tidak ada aktivitas yang ditemukan.
          </p>
        )}
      </div>
    </main>
  );
};

export default DashboardMentorContent;
