import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { createCourseMentor, getAllLearnPath } from "../../services/api";

const CreateCourseContent = () => {
  const navigate = useNavigate();

  const [learningPaths, setLearningPaths] = useState([]);
  const [formData, setFormData] = useState({
    info: "",
    linkVideo: "",
    materialName: "",
    price: "",
    learningPath: "",
    picture: null,
    learningMethod: "",
  });

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        const res = await getAllLearnPath();
        if (res?.code === 200) {
          setLearningPaths(res.data || []);
        }
      } catch (error) {
        console.error("Gagal mengambil learning path:", error);
      }
    };
    fetchLearningPaths();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const numberString = value.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    const formatted =
      split[1] !== undefined ? "Rp " + rupiah + "," + split[1] : "Rp " + rupiah;

    setFormData({
      ...formData,
      price: formatted,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = new FormData();
    courseData.append("info", formData.info);
    courseData.append("linkVideo", formData.linkVideo);
    courseData.append("materialName", formData.materialName);
    courseData.append("price", formData.price.replace(/[^\d]/g, "")); // hanya angka
    courseData.append("learningPath", formData.learningPath);
    courseData.append("picture", formData.picture);
    courseData.append("learningMethod", formData.learningMethod);

    try {
      const response = await createCourseMentor(courseData);
      console.log("RESPON DARI API:", response);

      if (response?.code === 201) {
        const courseId = response.data.id;
        alert("Course berhasil dibuat!");
        navigate(`/CreateSyllabus/${courseId}`);
      } else {
        throw new Error("Response tidak valid");
      }
    } catch (error) {
      alert("Gagal membuat course. Silakan coba lagi.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h2 className="text-2xl font-bold mb-6">Create Course</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Deskripsi Course
            </label>
            <input
              type="text"
              name="info"
              value={formData.info}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Link Video
            </label>
            <input
              type="text"
              name="linkVideo"
              value={formData.linkVideo}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Project Name
            </label>
            <input
              type="text"
              name="materialName"
              value={formData.materialName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handlePriceChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Learning Path
            </label>
            <select
              name="learningPath"
              value={formData.learningPath}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="">Pilih Learning Path</option>
              {learningPaths.map((path) => (
                <option key={path.ID} value={path.name}>
                  {path.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Learning Method
            </label>
            <select
              name="learningMethod"
              value={formData.learningMethod}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="">Pilih Metode Pembelajaran</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Upload Picture
            </label>
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseContent;
