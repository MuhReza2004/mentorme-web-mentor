import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailSylabus, updateSyllabus } from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

const DetailSyllabusContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [syllabus, setSyllabus] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Meeting: "",
    MaterialNameSyllabus: "",
    Description: "",
    Task: "",
  });

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await getDetailSylabus(id);
      if (res?.code === 200 && res.data) {
        setSyllabus(res.data);
        setFormData({
          Meeting: res.data.Meeting,
          MaterialNameSyllabus: res.data.MaterialNameSyllabus,
          Description: res.data.Description,
          Task: res.data.Task,
        });
      }
    };
    fetchDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        meeting: parseInt(formData.Meeting),
        MaterialNameSyllabus: formData.MaterialNameSyllabus,
        description: formData.Description,
        task: formData.Task,
      };

      const res = await updateSyllabus(id, payload);
      if (res.code === 200) {
        alert("Berhasil mengupdate materi!");
        setIsEditing(false);
        setSyllabus(res.data);
      }
    } catch (error) {
      console.error("Gagal update:", error);
      alert("Gagal update data.");
    }
  };

  if (!syllabus) {
    return <p className="text-center mt-8 text-gray-500">Memuat detail materi...</p>;
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </button>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Detail Materi</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Simpan
            </button>
          )}
        </div>
      </header>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">Pertemuan</h2>
        <input
          type="number"
          name="Meeting"
          className="w-full p-2 border rounded-lg"
          value={formData.Meeting}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">Materi Pembelajaran</h2>
        <textarea
          name="MaterialNameSyllabus"
          className="w-full p-2 border rounded-lg"
          value={formData.MaterialNameSyllabus}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">Deskripsi</h2>
        <textarea
          name="Description"
          className="w-full p-2 border rounded-lg"
          value={formData.Description}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">Tugas</h2>
        <textarea
          name="Task"
          className="w-full p-2 border rounded-lg"
          value={formData.Task}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>
    </div>
  );
};

export default DetailSyllabusContent;
