import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { acceptProject, ListProjectPendingByAdmin, ListProjectRejectedByAdmin } from "../../../services/api";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

// Helper untuk mengubah YouTube link menjadi embed link
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



const DetailCourseValidationContent = () => {
  const { id } = useParams(); // Ambil id dari URL
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

      const handleReject = async () => {
  const reason = window.prompt("Masukkan alasan penolakan:");
  if (!reason) return;

  try {
    await acceptProject(project.ID, reason, project.email);
    alert("Project berhasil ditolak.");
    navigate(-1);
  } catch (error) {
    alert("Gagal menolak project.");
  }
};

const handleAccept = async () => {
  try {
    await acceptProject(project.ID, null, project.email);
    alert("Project berhasil diterima.");
    navigate(-1);
  } catch (error) {
    alert("Gagal menerima project.");
  }
};

  const fetchProjectDetail = async () => {
    setLoading(true);
    try {
      const pendingResponse = await ListProjectPendingByAdmin();
      const projectData = pendingResponse?.data.find((p) => p.ID === id) || null;

      if (projectData?.status === "PENDING") {
        setProject(projectData);
      } else {
        const rejectedResponse = await ListProjectRejectedByAdmin();
        const rejectedProject = rejectedResponse?.data.find((p) => p.ID === id) || null;
        setProject(rejectedProject);
      }




      console.log("Project data:", projectData);
    } catch (error) {
      console.error("Gagal mengambil detail proyek:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingSpinner size="10" color="gray-900" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">Data proyek tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Judul dan Harga */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Validation Mentor Course</h1>
          <span className="text-lg font-semibold">Harga Project: Rp.{project.price}</span>
        </div>

        {/* Mentor Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`data:image/png;base64,${project.picture}`}
            alt="Mentor Image"
            className="w-24 h-24 object-cover rounded-lg mb-4"
          />
          <div>
            <p className="text-xl font-semibold">{project.fullName}</p>
            <p className="text-gray-600">{project.materialName}</p>
          </div>
        </div>

        {/* Video Pengantar */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Video Pengantar</h2>
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
            {project.linkVideo ? (
              <iframe
                width="100%"
                height="100%"
                src={getYoutubeEmbedUrl(project.linkVideo)}
                title="Video Pengantar"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <span className="text-gray-500">Video tidak tersedia</span>
            )}
          </div>
          <div>
            <p className="text-gray-600 mt-2">Link Video: {project.linkVideo}</p>
          </div>
        </div>

        {/* Profil Mentor */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Profil Mentor</h2>
          <p className="text-gray-700">{project.about}</p>
        </div>


        {/* Tombol Aksi */}
<div className="flex justify-end gap-2">
  <button
    className="px-4 py-2 bg-gray-300 rounded-lg"
    onClick={() => navigate(-1)}
  >
    Batal
  </button>
  <button
    className="px-4 py-2 bg-red-500 text-white rounded-lg"
    onClick={handleReject}
  >
    Tolak
  </button>
  <button
    className="px-4 py-2 bg-green-500 text-white rounded-lg"
    onClick={handleAccept}
  >
    Terima
  </button>
</div>

      </div>
    </div>
  );
};

export default DetailCourseValidationContent;
