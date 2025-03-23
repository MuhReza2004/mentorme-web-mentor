import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPendingMentor,
  getRejectedMentor,
  getAccpetedMentor,
} from "../../services/api";
import ErrorBoundary from "../../components/ErrorBoundary";

const CourseContent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("accepted");
  const [acceptedCourses, setAcceptedCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [rejectedCourses, setRejectedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [acceptedResponse, pendingResponse, rejectedResponse] =
          await Promise.all([
            getAccpetedMentor(),
            getPendingMentor(),
            getRejectedMentor(),
          ]);

        setAcceptedCourses(acceptedResponse?.data || []);
        setPendingCourses(pendingResponse?.data || []);
        setRejectedCourses(rejectedResponse?.data || []);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data Course", error);
        setError(error.message || "Terjadi kesalahan saat memuat data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const getCurrentCourses = () => {
    switch (activeTab) {
      case "accepted":
        return acceptedCourses;
      case "pending":
        return pendingCourses;
      case "rejected":
        return rejectedCourses;
      default:
        return [];
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
            Error Memuat Data
          </h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <header className="flex flex-col gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("accepted")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "accepted"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Diterima
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Menunggu
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "rejected"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Ditolak
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCurrentCourses().length > 0 ? (
          getCurrentCourses().map((Course) => (
            <div
              key={Course.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={
                    Course.picture
                      ? `data:image/png;base64,${Course.picture}`
                      : "/Icon/Maskot.png"
                  }
                  alt={Course.mentor}
                  className="w-full h-52 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      activeTab === "accepted"
                        ? "bg-green-500 text-white"
                        : activeTab === "pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                    } shadow-lg`}
                  >
                    {activeTab === "accepted"
                      ? "Diterima"
                      : activeTab === "pending"
                      ? "Menunggu"
                      : "Ditolak"}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                  {Course.materialName}
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Mentor:</span>{" "}
                    <span className="text-green-600">{Course.fullName}</span>
                  </p>
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Course Material
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/DetailMyCourse/${Course.id}`)}
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <span>Lihat Detail</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3">
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L13 5.414V9a1 1 0 11-2 0V5.414L9.707 6.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0112 2z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xl font-medium text-gray-600 text-center">
                Belum ada Course yang{" "}
                {activeTab === "accepted"
                  ? "diterima"
                  : activeTab === "pending"
                  ? "dalam proses"
                  : "ditolak"}
              </p>
              <p className="text-gray-400 mt-2">Silakan coba tab lainnya</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const MyCourseContent = () => {
  return (
    <ErrorBoundary>
      <CourseContent />
    </ErrorBoundary>
  );
};

export default MyCourseContent;
