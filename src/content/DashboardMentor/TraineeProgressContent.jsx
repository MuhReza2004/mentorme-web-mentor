import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityTrainee } from "../../services/api"; // pastikan path ke API benar

const TraineeProgressContent = () => {
  const { activityId } = useParams();
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!activityId) {
        setError("ID Aktivitas tidak ditemukan di URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await getActivityTrainee(activityId);
        setActivityData(response.data);
      } catch (err) {
        console.error("Gagal fetch data:", err);
        setError("Gagal memuat data aktivitas trainee.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">{activityData?.materialName}</h1>
        <p className="text-gray-600 mb-6">Nama Trainee: {activityData?.fullName}</p>

        <div className="space-y-4">
          {activityData?.train && activityData.train.length > 0 ? (
            activityData.train.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 border p-4 rounded"
              >
                <p className="font-semibold">{item.meeting}</p>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded ${
                    item.statusReport ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.statusReport ? "Sudah Mengisi Laporan" : "Belum Mengisi"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Belum ada aktivitas yang ditampilkan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraineeProgressContent;
