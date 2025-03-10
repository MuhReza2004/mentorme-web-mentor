import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourseMentor } from "../../services/api";

const MyCourseContent = () => {
  const navigate = useNavigate();
  const [Courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseMentor();
        console.log("Data dari API:", response);
        setCourses(response.data || []); // Pastikan data default adalah array kosong
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data Course", error);
      }
    };
    fetchCourse();
  }, []); // Dependency array agar useEffect hanya dijalankan sekali

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {Courses.length > 0 ? (
          Courses.map((Course) => (
            <div
              key={Course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={
                  Course.picture
                    ? `data:image/png;base64,${Course.picture}`
                    : "/Icon/Maskot.png"
                }
                alt={Course.mentor}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {Course.materialName}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Mentor:</span> {Course.mentor}
                </p>

                <button
                  onClick={() => navigate(`/DetailMyCourse/${Course.id}`)}
                  className="mt-4 w-full bg-green-400 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-md transition duration-300"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-3 py-20">
            Belum ada Course yang dibuat.
          </p>
        )}
      </div>
    </main>
  );
};

export default MyCourseContent;
