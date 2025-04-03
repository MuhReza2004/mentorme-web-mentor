import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ListProjectPendingByAdmin, ListProjectRejectedByAdmin } from "../../../services/api";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

const DetailCourseValidationContent = () => {
  const {selectedFilter, setselectedFilter} = useState("Permintaan")
  const { id } = useParams(); // Ambil id dari URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 Tambahkan state loading

  useEffect(() => {
    fetchProjectDetail();
  }, [id]); // Pastikan efek ini dipanggil setiap kali ID berubah

  const fetchProjectDetail = async () => {
    setLoading(true);
    try {
      const response = await ListProjectPendingByAdmin(); // Ambil data proyek pending
      const projectData = response?.data.find((m) => m.id === id) || null;
      
      if (projectData?.status === "PENDING") {
        setProject(projectData); // Jika status pending, set project
      } else if (projectData?.status === "REJECTED") {
        const rejectedResponse = await ListProjectRejectedByAdmin(); // Ambil data proyek rejected
        const rejectedProjectData = rejectedResponse?.data.find((m) => m.id === id) || null;
        setProject(rejectedProjectData); // Jika status rejected, set project
      }
      
      console.log(projectData); // 🔥 Tambahkan log untuk melihat data proyek 
    } catch (error) {
      console.error("Gagal mengambil detail proyek:", error);
    } finally {
      setLoading(false); // 🔥 Matikan loading setelah data diambil
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
    return <p className="text-center text-red-500">Data proyek tidak ditemukan.</p>;
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
            {project.videoUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={project.videoUrl.replace("watch?v=", "embed/")}
                title="Video Pengantar"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <span className="text-gray-500">Video tidak tersedia</span>
            )}
          </div>
        </div>

        {/* Profil Mentor */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Profil Mentor</h2>
          <p className="text-gray-700">{project.mentorProfile}</p>
        </div>

        {/* Role Mentor */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Role Mentor</h2>
          <ul className="list-disc list-inside text-gray-700">
            {project.mentorRoles?.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded-lg">Batal</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Tolak</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Terima</button>
        </div>
      </div>
    </div>
  );
};

export default DetailCourseValidationContent;
