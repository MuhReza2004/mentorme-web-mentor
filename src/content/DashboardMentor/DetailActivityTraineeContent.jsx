import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GetDetailActivityTrainee } from "../../services/api";

const DetailActivityTraineeContent = () => {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const role = localStorage.getItem("role");

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

  // Fungsi untuk mengecek apakah dokumen adalah gambar
  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

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
            {role?.toLowerCase() === "admin" ? "Course" : "My Course"}:{" "}
            {activityData?.materialName}
          </h1>
        </header>

        <h2 className="text-lg text-gray-700 mb-4">
          {role?.toLowerCase() === "admin" ? "Trainee" : "My Trainee"}:{" "}
          {activityData?.fullName}
        </h2>

        <div className="mt-6 space-y-4">
          {activityData.train.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow flex flex-col border"
            >
              <div className="flex justify-between items-start">
                <div className="w-full">
                  <h3 className="text-lg font-bold">
                    {item.meeting || "Pertemuan tidak diketahui"}
                  </h3>

                  {/* Menampilkan Activity */}
                  <div className="mt-2">
                    <h4 className="font-semibold text-gray-700">Activity:</h4>
                    <p className="text-gray-600">
                      {item.activity || "Tidak ada aktivitas"}
                    </p>
                  </div>

                  {/* Menampilkan Documents */}
                  {item.documentasi && item.documentasi !== "empty" && (
                    <div className="mt-2">
                      <h4 className="font-semibold text-gray-700">
                        Dokumentasi:
                      </h4>
                      <div className="mt-2">
                        {isImage(item.documentasi) ? (
                          <div className="mt-2">
                            <img
                              src={item.documentasi}
                              alt="Dokumen Aktivitas"
                              className="max-w-full h-auto max-h-60 rounded border border-gray-200"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/150?text=Gambar+Tidak+Tersedia";
                              }}
                            />
                            <a
                              href={item.documentasi}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline block mt-2"
                            >
                              Buka Gambar di Tab Baru
                            </a>
                          </div>
                        ) : (
                          <a
                            href={item.documentasi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Lihat Dokumen
                          </a>
                        )}
                      </div>
                    </div>
                  )}
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

              {/* Hanya menampilkan tombol jika role BUKAN admin */}
              {role?.toLowerCase() !== "admin" && (
                <div className="flex gap-2 mt-4">
                  <button
                    className={`px-4 py-2 rounded ${
                      item.statusReport
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                    onClick={() =>
                      navigate(`/TraineeActivity/${item.IDActivity}`)
                    }
                  >
                    {item.statusReport
                      ? "Edit Laporan"
                      : "Isi Laporan Aktivitas"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DetailActivityTraineeContent;
