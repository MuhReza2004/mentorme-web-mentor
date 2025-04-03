import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ListMentorPendingByAdmin } from "../../../services/api"; // Sesuaikan dengan path yang benar
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

const DetailMentorRequestContent = () => {
  const { email } = useParams(); // Ambil email dari URL
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 Tambahkan state loading

  useEffect(() => {
    fetchMentorDetail();
  }, []);

  const fetchMentorDetail = async () => {
    setLoading(true);
    try {
      const response = await ListMentorPendingByAdmin();
      const mentorData = response?.data.find((m) => m.email === email) || null;
      setMentor(mentorData);
     console.log(mentorData); // 🔥 Tambahkan log untuk melihat data mentor 
    } catch (error) {
      console.error("Gagal mengambil detail mentor:", error);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Validation Mentor</h1>

        <div className="flex items-center gap-6 mb-6">
          <img 
            src={`data:image/png;base64,${mentor.picture}`} 
            alt="Mentor Image"  
            className="w-24 h-24 object-cover rounded-lg mb-4" 
          />
          <div>
            <p className="text-lg font-semibold">Nama: <span className="font-normal">{mentor.fullName}</span></p>
            <p className="text-lg font-semibold">Email: <span className="font-normal">{mentor.email}</span></p>
            <p className="text-lg font-semibold">Ability: <span className="font-normal">{mentor.ability}</span></p>
            <p className="text-lg font-semibold">Portofolio: <span className="font-normal">{mentor.portfolio}</span></p>
          </div>
        </div>

        {/* KTP Section */}
        <div className="bg-white p-4 border rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold mb-2">KTP</h2>
          <div className="h-40 bg-gray-200 flex items-center justify-center rounded-lg">
            <embed src={`data:application/pdf;base64,${mentor.ktp}`} type="application/pdf" width="100%" height="100%" />
          </div>
          <a href={`data:application/pdf;base64,${mentor.ktp}`} download="KTP.pdf" className="text-blue-500 underline">Download KTP</a>
        </div>

        {/* CV Section */}
        <div className="bg-white p-4 border rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-2">Curriculum Vitae</h2>
          <div className="h-40 bg-gray-200 flex items-center justify-center rounded-lg">
            <embed src={`data:application/pdf;base64,${mentor.cv}`} type="application/pdf" width="100%" height="100%" />
          </div>
          <a href={`data:application/pdf;base64,${mentor.cv}`} download="CV.pdf" className="text-blue-500 underline">Download CV</a>
        </div>

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded-lg">Batal</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Tolak</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Terima</button>
        </div>
      </div>
    </div>
  );
};

export default DetailMentorRequestContent;
