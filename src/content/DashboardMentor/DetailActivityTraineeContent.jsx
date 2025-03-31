import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GetDetailActivityTrainee } from "../../services/api"; // API service

const DetailActivityTraineeContent = () => {
  const navigate = useNavigate();
  const { activityId } = useParams(); // Ambil ID dari URL
  console.log("Activity ID:", activityId); // Debugging ID

  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activityId) {
      setError("Activity ID not found");
      setLoading(false);
      return;
    }

    const fetchActivityData = async () => {
      try {
        const response = await GetDetailActivityTrainee(activityId);
        console.log("Fetched Data:", response.data); // Debugging data
        setActivityData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, [activityId]);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <main className="p-6 w-full max-w-4xl">
        <header className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-700">
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold flex ">My Course: {activityData?.materialName}</h1>
        </header>
        <h2 className="text-lg text-gray-700 mb-4">My Trainee: {activityData?.fullName}</h2>

        <div className="mt-6 space-y-4">
          {activityData?.train && activityData.train.length > 0 ? (
            activityData.train.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center border">
                <div>
                  <h3 className="text-lg font-bold">{item?.meeting || "Meeting Name Unavailable"}</h3>
                  <button
                    className={`px-4 py-2 rounded mt-2 w-full ${
                      item?.statusReport
                        ? "bg-blue-500 hover:bg-blue-600 text-white" // Tombol Edit Laporan (biru)
                        : "bg-green-500 hover:bg-green-600 text-white" // Tombol Isi Laporan (hijau)
                    }`}
                    onClick={() => navigate(`/TraineeActivity/${item.IDActivity}`)}
                  >
                    {item?.statusReport ? "Edit Laporan" : "Isi Laporan Aktivitas"}
                  </button>
                </div>
                <div className="flex items-center">
                  <IoDocumentTextOutline className={`text-2xl mr-2 ${item?.statusReport ? "text-green-500" : "text-red-500"}`} />
                  <span className={`${item?.statusReport ? "text-green-500" : "text-red-500"} font-semibold`}>
                    {item?.statusReport ? "Sudah Dibuat" : "Belum Dibuat"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No training activities found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DetailActivityTraineeContent;
