// components/CourseCard.jsx
import { useNavigate } from "react-router-dom";

const CourseCard = ({
  course,
  status,
  detailPath,
  // labelRole = "MENTOR",
  children,
}) => {
  const navigate = useNavigate();
  console.log(detailPath, course.id || course.ID);
  const getStatusLabel = () => {
    switch (status) {
      case "accepted":
        return { text: "Diterima", color: "bg-green-500" };
      case "pending":
        return { text: "Menunggu", color: "bg-yellow-500" };
      case "rejected":
        return { text: "Ditolak", color: "bg-red-500" };
      case "completed":
        return { text: "Selesai", color: "bg-green-500" };
      case "in-progress":
        return { text: "Belum Selesai", color: "bg-yellow-500" };
      default:
        return null;
    }
  };

  const statusLabel = getStatusLabel();

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 w-64">
      <div className="relative">
        <img
          src={
            course.picture
              ? `data:image/png;base64,${course.picture}`
              : "/Icon/Maskot.png"
          }
          alt={course.materialName}
          className="w-full h-40 object-contain transform transition-transform duration-300 group-hover:scale-105"
        />
        {statusLabel && (
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusLabel.color} text-white shadow-lg`}
            >
              {statusLabel.text}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
          {course.materialName}
        </h3>
        <p className="text-sm text-gray-600 mb-2 truncate">
          {/* {labelRole}:{" "} */}
          <span className="text-green-600">
            {course.fullName || course.mentor || course.trainee}
          </span>
        </p>

        <div>
          <button
            onClick={() => navigate(`${detailPath}/${course.id || course.ID}`)}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
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
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
