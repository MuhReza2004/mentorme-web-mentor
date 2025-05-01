import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { GetAdminLearing } from "../../../services/api";
import { Skeleton } from "../../../components/skeleton";
import CourseCard from "../../../components/CourseCard";

const BuyTraineeContent = () => {
  const [learnings, setLearnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Panggil di dalam komponen

  useEffect(() => {
    const fetchLearning = async () => {
      try {
        const response = await GetAdminLearing();
        setLearnings(response?.data?.learning || []);
        console.log("Data pembelian:", response?.data?.learning);
      } catch (error) {
        console.error("Gagal mengambil data learning:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearning();
  }, []);

  const getStatus = (progress) => {
    if (progress === 100) return "completed";
    if (progress > 0) return "in-progress";
    return "pending";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Pembelian Course oleh Trainee
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-md" />
          ))}
        </div>
      ) : learnings.length === 0 ? (
        <p className="text-gray-600">Tidak ada data pembelian.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learnings.map((item) => (
            <CourseCard
              key={item.ID}
              course={{
                id: item.ID,
                picture: item.project.picture,
                materialName: item.project.materialName,
                trainee: item.user,
              }}
              detailPath="/DetailActivityTrainee"
            >
              <button
                onClick={() => navigate(`/TraineeProgress/${item.ID}`)} // ✅ Gunakan navigate dengan benar
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg mt-2 transition"
              >
                Lihat Progress
              </button>
            </CourseCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyTraineeContent;
