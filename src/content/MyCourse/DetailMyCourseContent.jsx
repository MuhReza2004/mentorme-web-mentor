import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailMyCourse } from "../../services/api";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";

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
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDetailMyCourse(id);
        console.log("RES DARI API:", res);
        if (res?.code === "OK" && res.data) {
          setCourse(res.data);
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

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          My Course
        </h2>

        {/* Informasi Project */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Informasi Project
          </h3>
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-600 text-base">
              {course.info || "Tidak ada deskripsi tersedia."}
            </p>
          </div>
        </section>

        {/* Video Project */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Video Project
          </h3>
          <div className="rounded-lg overflow-hidden">
            {course.linkVideo?.includes("youtube.com") ||
            course.linkVideo?.includes("youtu.be") ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-64 rounded-lg"
                  src={getYoutubeEmbedUrl(course.linkVideo)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : course.linkVideo ? (
              <video
                className="w-full h-64 object-cover rounded-lg"
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
        </section>

        {/* Harga Project */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Harga</h3>
          <div className="flex items-center bg-green-50 p-4 rounded-lg">
            <FaMoneyBillWave className="text-green-600 w-6 h-6 mr-3" />
            <span className="text-lg font-bold text-green-700">
              Rp {Number(course.price)?.toLocaleString("id-ID")}
            </span>
          </div>
        </section>

        {/* Learning Method */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Metode Pembelajaran
          </h3>
          <div className="flex items-center bg-blue-50 p-4 rounded-lg">
            <FaChalkboardTeacher className="text-blue-600 w-6 h-6 mr-3" />
            <span className="text-lg font-semibold text-blue-700">
              {course.learningMethod || "Tidak ada metode pembelajaran."}
            </span>
          </div>
        </section>

        {/* Materi Pembelajaran */}
        <button
          onClick={() => navigate(`/MateriPembelajaran/${course.ID}`)}
          className="w-full flex items-center justify-between bg-green-600 text-white px-6 py-4 rounded-xl shadow-md hover:bg-green-700 transition transform hover:-translate-y-1 cursor-pointer"
        >
          <span className="text-lg font-semibold">
            Lihat Materi Pembelajaran
          </span>
          <FaChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DetailMyCourseContent;
