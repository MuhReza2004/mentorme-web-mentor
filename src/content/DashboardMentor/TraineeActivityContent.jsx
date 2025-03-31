import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reportActivityByMentor } from "../../services/api"; // Import API

const TraineeActivityContent = () => {
    const navigate = useNavigate();
    const { IDActivity } = useParams(); // Ambil ID dari URL
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        activity: "",
        documentasi: null,
    });

    // Handle perubahan teks laporan
    const handleTextChange = (e) => {
        setFormData({
            ...formData,
            activity: e.target.value,
        });
    };

    // Handle perubahan file dokumentasi
const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData((prevData) => ({
            ...prevData,
            documentasi: file, // Simpan file yang valid
        }));
    } else {
        console.warn("Tidak ada file yang dipilih.");
    }
};

    // Handle submit laporan
   const handleSubmit = async () => {
    if (!formData.activity.trim()) {
        alert("Harap isi rincian kegiatan.");
        return;
    }

    if (!formData.documentasi) {
        alert("Harap unggah dokumentasi.");
        return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("activity", formData.activity);

    // Validasi bahwa documentation bukan undefined sebelum menambahkannya ke FormData
    if (formData.documentasi instanceof File) {
        formDataToSend.append("documentasi", formData.documentasi);
    } else {
        console.error("File tidak valid atau tidak terdeteksi:", formData.documentasi);
        alert("Terjadi kesalahan pada file yang diunggah.");
        setLoading(false);
        return;
    }

    try {
        const response = await reportActivityByMentor(IDActivity, formDataToSend);
        console.log("Laporan berhasil dikirim:", response);

        if (response.code === 200) {
            alert("Laporan berhasil dikirim!");
            navigate(-1);
        } else {
            alert(`Gagal mengirim laporan: ${response.error}`);
            console.log("Activity:", formData.activity);
console.log("Documentation:", formData.documentasi);

        }
    } catch (error) {
        console.error("Gagal mengirim laporan:", error);
        alert("Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.");
    } finally {
        setLoading(false);
    }
};



    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div className="flex-1 p-6 flex justify-center items-center">
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Rincian Kegiatan</h2>
                    <textarea
                        placeholder="Rincian selama pertemuan berlangsung"
                        className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
                        value={formData.activity}
                        onChange={handleTextChange}
                    ></textarea>

                    <h2 className="text-2xl font-bold mb-4">Dokumentasi</h2>
                    <div className="relative border rounded-lg p-3">
                        <input
                            type="file"
                            className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="flex justify-end mt-6 space-x-4">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="px-6 py-2 border rounded-lg hover:bg-gray-200"
                        >
                            Batal
                        </button>
                        <button 
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            disabled={loading}
                        >
                            {loading ? "Mengirim..." : "Selesai"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TraineeActivityContent;
