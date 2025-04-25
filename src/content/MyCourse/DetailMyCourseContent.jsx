import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailMyCourse } from "../../services/api";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

// Fungsi bantu untuk konversi YouTube URL ke embed
const getYoutubeEmbedUrl = (url) => {
  if (!url) return null;

  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url; // fallback
};




const DetailMyCourseContent = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null); // Untuk error handling opsional

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDetailMyCourse(id);
        console.log("RES DARI API:", res);
        if (res?.code === "OK" && res.data) {
          setCourse(res.data); // Ambil course dari response
        } else {
          setError("Data course tidak ditemukan.");
        }
      } catch (err) {
        console.error("Gagal fetch detail course:", err);
        setError("Terjadi kesalahan saat mengambil data.");
      }
    };
    fetchData();
  }, [id]);

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!course) {
    return <div className="p-6">Loading...</div>;
  }
console.log("COURSE:", course.linkVideo);
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">My Course</h2>

        {/* Informasi Project */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Informasi Project</h3>
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-700 text-sm">
              {course.info || "Tidak ada deskripsi tersedia."}
            </p>
          </div>
        </div>

        {/* Video Project */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Video Project</h3>
          <div className="rounded-lg overflow-hidden">
            {course.linkVideo?.includes("youtube.com") ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-48 rounded-lg"
                  src={convertToEmbedUrl(course.linkVideo)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : course.linkVideo ? (
              <video
                className="w-full h-48 object-cover rounded-lg"
                controls
                aria-label="Video Project"
              >
                <source src={course.linkVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p className="text-sm text-gray-500">Video tidak tersedia.</p>
            )}
          </div>
        </div>

        {/* Harga Project */}
        <div className="mb-6 flex items-center bg-gray-50 p-4 rounded-lg">
          <FaMoneyBillWave className="text-green-500 w-6 h-6 mr-2" />
          <span className="text-lg font-bold">
            Rp {course.price?.toLocaleString("id-ID")}
          </span>
        </div>

        {/* Materi Pembelajaran */}
        <button
          onClick={() => navigate(`/MateriPembelajaran/${id}`)}
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
