import { useEffect, useState } from "react";
import {
  getPendingMentor,
  getRejectedMentor,
  getAccpetedMentor,
} from "../../services/api";
import ErrorBoundary from "../../components/ErrorBoundary";
import CourseCard from "../../components/CourseCard";
import { motion, AnimatePresence } from "framer-motion";

const CourseContent = () => {
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

        if (activeTab === "accepted" && acceptedCourses.length === 0) {
          const response = await getAccpetedMentor();
          setAcceptedCourses(response?.data || []);
        }

        if (activeTab === "pending" && pendingCourses.length === 0) {
          const response = await getPendingMentor();
          setPendingCourses(response?.data || []);
        }

        if (activeTab === "rejected" && rejectedCourses.length === 0) {
          const response = await getRejectedMentor();
          setRejectedCourses(response?.data || []);
        }
      } catch (err) {
        console.error("Terjadi kesalahan:", err);
        setError(err.message || "Gagal memuat data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [activeTab]);

  const getCurrentCourses = () => {
    if (activeTab === "accepted") return acceptedCourses;
    if (activeTab === "pending") return pendingCourses;
    if (activeTab === "rejected") return rejectedCourses;
    return [];
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
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("accepted")}
            className={`px-4 py-2 rounded ${
              activeTab === "accepted"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Diterima
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded ${
              activeTab === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Menunggu
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`px-4 py-2 rounded ${
              activeTab === "rejected"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Ditolak
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {getCurrentCourses().length > 0 ? (
            getCurrentCourses().map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                status={activeTab}
                detailPath="/DetailMyCourse"
                showDetailButton={activeTab !== "rejected"} // <-- ini dia perbaikannya
              />
            ))
          ) : (
            <div className="col-span-4">
              <div className="text-center p-12 bg-white rounded-lg shadow">
                <p className="text-xl font-semibold text-gray-600 mb-2">
                  Belum ada Course yang{" "}
                  {activeTab === "accepted"
                    ? "diterima"
                    : activeTab === "pending"
                    ? "menunggu"
                    : "ditolak"}
                </p>
                <p className="text-gray-400">Silakan cek tab lainnya</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
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
