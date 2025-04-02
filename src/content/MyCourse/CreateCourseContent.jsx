import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { createCourseMentor } from "../../services/api";

const CreateCourseContent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    info: "",
    linkVideo: "",
    materialName: "",
    price: "",
    learningPath: "",
    picture: null,
  });

  // Handle perubahan input teks
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle perubahan file upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = new FormData();
    courseData.append("info", formData.info);
    courseData.append("linkVideo", formData.linkVideo);
    courseData.append("materialName", formData.materialName);
    courseData.append("price", formData.price);
    courseData.append("learningPath", formData.learningPath);
    courseData.append("picture", formData.picture);

    try {
      const response = await createCourseMentor(courseData);
      alert("Course berhasil dibuat!");
      console.log("Success:", response);
      navigate("/dashboard"); // Arahkan ke halaman dashboard setelah sukses
    } catch (error) {
      alert("Gagal membuat course. Silakan coba lagi.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">Create Course</h2>

        {/* Form */}
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
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Learning Path
            </label>
            <input
              type="text"
              name="learningPath"
              value={formData.learningPath}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              // required
            />
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

          {/* Submit Button */}
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
