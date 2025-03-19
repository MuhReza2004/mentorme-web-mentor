import { useState } from "react";

const DetailCreateSyllabusContent = () => {
  const [title, setTitle] = useState("");
  const [material, setMaterial] = useState("");
  const [task, setTask] = useState("");

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Judul</h2>
        <input
          type="text"
          placeholder="Judul Pembelajaran"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <h2 className="text-2xl font-bold mb-4">Materi Pembelajaran</h2>
        <textarea
          placeholder="Aktivitas apa saja yang akan dilaksanakan?"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-24"
        ></textarea>

        <h2 className="text-2xl font-bold mb-4">Tugas</h2>
        <div className="relative">
          <textarea
            placeholder="Masukkan Tugas yang akan diberikan"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-24"
          ></textarea>
          <span className="absolute bottom-3 right-3 text-gray-400 text-xl cursor-pointer">📎</span>
        </div>

        <div className="flex justify-between mt-6">
          <button className="border border-gray-500 text-gray-700 px-6 py-3 rounded-lg">
            Batal
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCreateSyllabusContent;
