import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ListMentorPendingByAdmin, acceptMentor } from "../../../services/api";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

const DetailMentorRequestContent = () => {
  const { ID } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchMentorDetail();
}, [ID]);


 const fetchMentorDetail = async () => {
  setLoading(true);
  try {
    const response = await ListMentorPendingByAdmin();
    const idFromUrl = ID?.trim(); // pastikan tanpa spasi
    const mentorData = response?.data.find((m) => m.ID.trim() === idFromUrl) || null;

    console.log("ID dari URL:", idFromUrl);
    console.log("List mentor dari API:", response?.data);
    console.log("Mentor yang ditemukan:", mentorData);

    setMentor(mentorData);
  } catch (error) {
    console.error("Gagal mengambil detail mentor:", error);
  } finally {
    setLoading(false);
  }
};


const handleAccept = async () => {
  try {
    await acceptMentor(mentor.ID, null, mentor.email); // Kirim null eksplisit
    alert("Mentor berhasil diterima.");
    navigate("/DashboardAdminContent");
  } catch (error) {
    console.error("Gagal menerima mentor:", error);
    alert("Gagal menerima mentor.");
  }};


const handleReject = async () => {
  const reason = prompt("Masukkan alasan penolakan:");
  if (!reason || reason.trim() === "") return alert("Penolakan dibatalkan.");

  try {
    await acceptMentor(mentor.ID, reason.trim(), mentor.email); // Kirim reason jika diisi
    alert("Mentor berhasil ditolak.");
    navigate("/DashboardAdminContent");
  } catch (error) {
    console.error("Gagal menolak mentor:", error);
    alert("Gagal menolak mentor.");
  }
};


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingSpinner size="10" color="gray-900" />
      </div>
    );
  }
if (!mentor) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-red-500 text-lg">Data mentor tidak ditemukan.</p>
    </div>
  );
}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Validation Mentor</h1>

        <div className="flex items-center gap-6 mb-6">
<img 
  src={mentor.picture} 
  alt="Mentor"  
  className="w-24 h-24 object-cover rounded-lg mb-4" 
/>
          <div>
            <p className="text-lg font-semibold">Nama: <span className="font-normal">{mentor.fullName}</span></p>
            <p className="text-lg font-semibold">Email: <span className="font-normal">{mentor.email}</span></p>
            <p className="text-lg font-semibold">Ability: <span className="font-normal">{mentor.ability}</span></p>
            <p className="text-lg font-semibold">Portofolio:{" "}
  {mentor.portfolio ? (
    <a href={mentor.portfolio} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
      {mentor.portfolio}
    </a>
  ) : (
    <span className="font-normal">Tidak tersedia</span>
  )}
</p>

          </div>
        </div>

       {/* KTP Section */}
<div className="bg-white p-4 border rounded-lg shadow-md mb-4">
  <h2 className="text-lg font-semibold mb-2">KTP</h2>
  <div className="h-40 bg-gray-200 flex items-center justify-center rounded-lg">
    <embed src={mentor.ktp} type="application/pdf" width="100%" height="100%" />
  </div>
  <a href={mentor.ktp} download="KTP.pdf" className="text-blue-500 underline">Download KTP</a>
</div>


       {/* CV Section */}
<div className="bg-white p-4 border rounded-lg shadow-md mb-6">
  <h2 className="text-lg font-semibold mb-2">Curriculum Vitae</h2>
  <div className="h-40 bg-gray-200 flex items-center justify-center rounded-lg">
    <embed src={mentor.cv} type="application/pdf" width="100%" height="100%" />
  </div>
  <a href={mentor.cv} download="CV.pdf" className="text-blue-500 underline">Download CV</a>
</div>


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

export default DetailMentorRequestContent;
