import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GetDetailActivityTrainee } from "../../services/api"; // pastikan path benar

const DetailActivityTraineeContent = () => {
  const navigate = useNavigate();
  const { activityId } = useParams(); // pastikan URL-nya ada :activityId
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      if (!activityId) {
        setError("ID Aktivitas tidak ditemukan di URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await GetDetailActivityTrainee(activityId);
        setActivityData(response.data);
      } catch (err) {
        console.error("Gagal fetch data:", err);
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, [activityId]);
  // console.log("Jumlah train:", activityData?.train?.length);
  // console.log("Isi train[0]:", activityData?.train?.[0]);
  console.log("DATA:", activityData); // ini akan log sekali

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error)
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <main className="p-6 w-full max-w-4xl">
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold">
            My Course: {activityData?.materialName}
          </h1>
        </header>

        <h2 className="text-lg text-gray-700 mb-4">
          My Trainee: {activityData?.fullName}
        </h2>

        <div className="mt-6 space-y-4">
          {activityData.train.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center border"
            >
              <div className="w-full">
                <h3 className="text-lg font-bold">
                  {item.meeting || "Pertemuan tidak diketahui"}
                </h3>
                <div className="flex gap-2 mt-2">
                  <button
                    className={`px-4 py-2 rounded w-full ${
                      item.statusReport
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    onClick={() =>
                      navigate(`/TraineeActivity/${item.IDActivity}`)
                    }
                  >
                    {item.statusReport
                      ? "Edit Laporan"
                      : "Isi Laporan Aktivitas"}
                  </button>

                  <button
                    className="px-4 py-2 rounded w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                    onClick={() =>
                      navigate(`/TraineeProgress/${item.IDActivity}`)
                    }
                  >
                    Lihat Kegiatan
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/TraineeProgress/${item.IDActivity}`)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Lihat Semua Progress
                  </button>
                </div>
              </div>
              <div className="flex items-center ml-4">
                <IoDocumentTextOutline
                  className={`text-2xl mr-2 ${
                    item.statusReport ? "text-green-500" : "text-red-500"
                  }`}
                />
                <span
                  className={`font-semibold ${
                    item.statusReport ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.statusReport ? "Sudah Dibuat" : "Belum Dibuat"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DetailActivityTraineeContent;
