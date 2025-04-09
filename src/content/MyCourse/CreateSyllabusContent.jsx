import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createSyllabus } from "../../services/api";

const CreateSyllabusContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const initialData = [
    { meeting: "", MaterialNameSyllabus: "", description: "", task: "", success: false },
    { meeting: "", MaterialNameSyllabus: "", description: "", task: "", success: false },
    { meeting: "", MaterialNameSyllabus: "", description: "", task: "", success: false },
    { meeting: "", MaterialNameSyllabus: "", description: "", task: "", success: false },
  ];

  const [formData, setFormData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState("");

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`syllabusFormData-${courseId}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [courseId]);

  const handleChange = (index, e) => {
    const newFormData = [...formData];
    newFormData[index][e.target.name] = e.target.value;
    setFormData(newFormData);
    localStorage.setItem(`syllabusFormData-${courseId}`, JSON.stringify(newFormData));
  };

  const handleSingleSubmit = async (index) => {
    const data = formData[index];
    try {
      const res = await createSyllabus(courseId, data);
      if (res.code === 201) {
        const updated = [...formData];
        updated[index].success = true;
        setFormData(updated);
        setErrorMessage("");
        localStorage.setItem(`syllabusFormData-${courseId}`, JSON.stringify(updated));

        const allSuccess = updated.every((item) => item.success);
        if (allSuccess) {
          localStorage.removeItem(`syllabusFormData-${courseId}`);
        }
      } else {
        console.error("Gagal membuat syllabus:", res?.error);
        setErrorMessage(res?.error || "Gagal membuat syllabus.");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h2 className="text-2xl font-bold mb-6">Create Syllabus</h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold">{errorMessage}</div>
        )}

        {formData.map((data, index) => {
          const canShow = index === 0 || formData[index - 1].success;

          return canShow ? (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 mb-6"
            >
              <h3 className="text-lg font-bold mb-2">Pertemuan {index + 1}</h3>

              {data.success && (
                <div className="mb-2 text-green-600 font-semibold">
                  Pertemuan {index + 1} berhasil dibuat!
                </div>
              )}

              <div className="mb-4">
                <label className="block font-semibold mb-2">Pertemuan ke-?</label>
                <input
                  type="text"
                  name="meeting"
                  value={data.meeting}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border rounded-lg p-2"
                  placeholder={`Contoh: Pertemuan ke-${index + 1}`}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Nama Materi Trainee</label>
                <input
                  type="text"
                  name="MaterialNameSyllabus"
                  value={data.MaterialNameSyllabus}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border rounded-lg p-2"
                  placeholder="Contoh: Pengenalan React"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Deskripsi</label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border rounded-lg p-2"
                  rows={3}
                  placeholder="Deskripsikan materi dan pembelajaran"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Task</label>
                <textarea
                  name="task"
                  value={data.task}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border rounded-lg p-2"
                  rows={3}
                  placeholder="Tugas yang harus dikerjakan"
                  required
                ></textarea>
              </div>

              <button
                type="button"
                onClick={() => handleSingleSubmit(index)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Submit Pertemuan {index + 1}
              </button>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default CreateSyllabusContent;
