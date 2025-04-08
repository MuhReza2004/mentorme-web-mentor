import { useEffect, useState } from "react";
import { createCategory, getCategories } from "../../../services/api";

const CreateCategoryContent = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.data || []);
    } catch (err) {
      setError("Gagal memuat kategori");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await createCategory(name);
      setMessage("Kategori berhasil ditambahkan!");
      alert("Kategori berhasil ditambahkan!");
      setName("");
      fetchCategories();
    } catch (err) {
      setError("Gagal menambahkan kategori.");
      alert("Gagal menambahkan kategori. Silakan coba lagi.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Tambah Kategori</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Kategori"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Tambah
        </button>
      </form>
      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">Daftar Kategori</h3>
      {categories.length === 0 ? (
        <p className="text-gray-500">Belum ada kategori.</p>
      ) : (
        <table className="w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nama</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border px-4 py-2">{category.id}</td>
                <td className="border px-4 py-2">{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CreateCategoryContent;
