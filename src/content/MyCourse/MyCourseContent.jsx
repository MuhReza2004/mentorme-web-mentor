import { useNavigate } from "react-router-dom";

const MyCourseContent = () => {
  const navigate = useNavigate();

  const handleGoToProgress = () => {
    navigate("/DetailMyCourse");
  };

  return (
    <div className="bg-gray-100">
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Course</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg w-[300px]"
            >
              <img
                src="/src/assets/Icon/Maskot.png"
                alt="Course Icon"
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold">Pemrograman Web</h3>
                <p className="mt-2 text-gray-600">Selamat datang di course</p>
                <p className="mt-1 text-gray-600">
                  Pemrograman Web! Di era digital
                </p>
                <div className="flex items-center justify-center mt-2 text-gray-600">
                  <span className="mr-2">👥 1,211 Students</span>
                </div>
                <div className="flex items-center justify-center mt-1 text-gray-600">
                  <span className="mr-2">⭐ 4.7 (320 Reviews)</span>
                </div>

                {/* Button ke ProgressTrainee */}
                <button
                  onClick={handleGoToProgress}
                  className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                >
                  Lihat Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyCourseContent;
