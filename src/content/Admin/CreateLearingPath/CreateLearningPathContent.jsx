import { useState } from "react";
import { createLearningPath } from "../../../services/api";

const CreateLearningPathContent = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [picture, setPicture] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!name || !category || !picture) {
      setError("Nama, kategori, dan gambar harus diisi!");
      return;
    }

    try {
      await createLearningPath(name, category, picture);
      setMessage("Learning Path berhasil ditambahkan!");
      setName("");
      setCategory("");
      setPicture(null);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menambahkan Learning Path.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Tambah Learning Path</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Learning Path"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPicture(e.target.files[0])}
           className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Tambah
        </button>
      </form>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreateLearningPathContent;
