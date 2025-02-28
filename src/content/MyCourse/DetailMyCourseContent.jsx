import { FaMoneyBillWave, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DetailMyCourseContent = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">My Course</h2>

        {/* Informasi Project */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Informasi Project</h3>
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-700 text-sm">
              HTML (Hypertext Markup Language) adalah bahasa markup yang digunakan untuk membuat struktur dasar halaman web. Dalam materi pengenalan ini, Anda akan mempelajari elemen-elemen HTML dasar yang digunakan untuk membangun struktur halaman, seperti heading, paragraf, gambar, dan link.
            </p>
          </div>
        </div>

        {/* Video Project */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Video Project</h3>
          <div className="rounded-lg overflow-hidden">
            <video
              className="w-full h-48 object-cover rounded-lg"
              controls
              aria-label="Video Project"
            >
              <source src="/path-to-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Harga Project */}
        <div className="mb-6 flex items-center bg-gray-50 p-4 rounded-lg">
          <FaMoneyBillWave className="text-green-500 w-6 h-6 mr-2" />
          <span className="text-lg font-bold">Rp 150.000</span>
        </div>

        {/* Materi Pembelajaran */}
        <button
          onClick={() => navigate("/MateriPembelajaran")}
          className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md hover:bg-gray-200 transition cursor-pointer"
        >
          <span className="text-lg font-semibold">Materi Pembelajaran</span>
          <FaChevronRight className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default DetailMyCourseContent;
