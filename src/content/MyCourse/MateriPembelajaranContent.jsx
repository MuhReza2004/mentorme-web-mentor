import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMySylabus } from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

const MateriPembelajaranContent = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id dari course
  const [syllabus, setSyllabus] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const res = await getMySylabus(id);
    if (res?.code === 200 && res.data) {
      console.log(res.data);

      const mapped = res.data.map((item) => ({
        ...item,
        MeetingLabel: `Pertemuan ke -${item.Meeting}`, // tambahkan field baru untuk tampilan
      }));

      const sorted = [...mapped].sort((a, b) => a.Meeting - b.Meeting);

      setSyllabus(sorted);
    }
  };
  fetchData();
}, [id]);


  return (
    <div className="bg-gray-100 min-h-screen flex">
      <main className="p-6 w-full">
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
        </header>

        <div className="mt-6 space-y-4">
          {syllabus.length > 0 ? (
            syllabus.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold">{item.MeetingLabel}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Materi: {item.MaterialNameSyllabus}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Deskripsi: {item.Description}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Tugas: {item.Task}
                  </p>
                  <button
                   onClick={() => navigate(`/DetailSyllabus/${item.SyllabusId}`)} // nanti bisa tambahkan id jika ada
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Lihat Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Belum ada materi tersedia.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MateriPembelajaranContent;
