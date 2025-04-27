import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ListMentorPendingByAdmin, acceptMentor } from "../../../services/api";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

const DetailMentorRequestContent = () => {
  const { ID } = useParams();
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
      const idFromUrl = ID?.trim();
      const mentorData =
        response?.data.find((m) => m.ID.trim() === idFromUrl) || null;

      console.log("ID dari URL:", idFromUrl);
      console.log("List mentor dari API:", response?.data);
      console.log("Mentor yang ditemukan:", mentorData);
      console.log("cv mentor:", mentorData?.cv);
      console.log("ktp mentor:", mentorData?.ktp);

      setMentor(mentorData);
    } catch (error) {
      console.error("Gagal mengambil detail mentor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptMentor(mentor.ID, null, mentor.email);
      alert("Mentor berhasil diterima.");
      navigate("/DashboardAdminContent");
    } catch (error) {
      console.error("Gagal menerima mentor:", error);
      alert("Gagal menerima mentor.");
    }
  };

  const handleReject = async () => {
    const reason = prompt("Masukkan alasan penolakan:");
    if (!reason || reason.trim() === "") {
      alert("Penolakan dibatalkan.");
      return;
    }

    try {
      await acceptMentor(mentor.ID, reason.trim(), mentor.email);
      alert("Mentor berhasil ditolak.");
      navigate("/DashboardAdminContent");
    } catch (error) {
      console.error("Gagal menolak mentor:", error);
      alert("Gagal menolak mentor.");
    }
  };

  const extractUrlPath = (url) => {
    if (!url) return "";
    const parts = url.split("https://");
    if (parts.length >= 3) {
      return "https://" + parts.slice(2).join("https://");
    }
    return url;
  };

  const renderFile = (fileUrl) => {
    if (!fileUrl) {
      return <p className="text-red-500">File tidak tersedia.</p>;
    }

    const finalUrl = extractUrlPath(fileUrl);
    const isImage = /\.(jpeg|jpg|png)$/i.test(finalUrl);

    if (isImage) {
      return (
        <img
          src={finalUrl}
          alt="Document"
          className="object-contain h-40 rounded-lg"
        />
      );
    } else {
      return (
        <embed
          src={finalUrl}
          type="application/pdf"
          width="100%"
          height="400px"
          className="rounded-lg"
        />
      );
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Validasi Mentor</h1>

        {/* Profil Mentor */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <img
            src={
              extractUrlPath(mentor.picture) ||
              "https://via.placeholder.com/150"
            }
            alt="Mentor"
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="text-start md:text-left">
            <p className="text-lg font-semibold">
              Nama:{" "}
              <span className="font-normal">{mentor.fullName || "-"}</span>
            </p>
            <p className="text-lg font-semibold">
              Email: <span className="font-normal">{mentor.email || "-"}</span>
            </p>
            <p className="text-lg font-semibold">
              Ability:{" "}
              <span className="font-normal">{mentor.ability || "-"}</span>
            </p>
            <p className="text-lg font-semibold">
              Portfolio:{" "}
              {mentor.portfolio ? (
                <a
                  href={mentor.portfolio}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mentor.portfolio}
                </a>
              ) : (
                <span className="font-normal">Tidak tersedia</span>
              )}
            </p>
          </div>
        </div>

        {/* Dokumen KTP */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">KTP</h2>
          <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center min-h-[200px]">
            {renderFile(mentor.ktp)}
          </div>
          {mentor.ktp && (
            <a
              href={extractUrlPath(mentor.ktp)}
              download
              className="text-blue-500 underline mt-2 inline-block"
            >
              Download KTP
            </a>
          )}
        </div>

        {/* Dokumen CV */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Curriculum Vitae (CV)</h2>
          <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center min-h-[200px]">
            {renderFile(mentor.cv)}
          </div>
          {mentor.cv && (
            <a
              href={extractUrlPath(mentor.cv)}
              download
              className="text-blue-500 underline mt-2 inline-block"
            >
              Download CV
            </a>
          )}
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            onClick={() => navigate(-1)}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={handleReject}
          >
            Tolak
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
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
