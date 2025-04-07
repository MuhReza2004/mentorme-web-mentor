import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerMentor } from "../services/api";
import "../styles.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    portfolio: "",
    ability: "",
  });

  const [files, setFiles] = useState({ cv: null, ktp: null, picture: null });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 2MB");
      return;
    }

    if ((name === "cv" || name === "ktp") && file.type !== "application/pdf") {
      alert("CV and KTP must be in PDF format");
      return;
    }

    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        data.append(key, files[key]);
      }
    });

    setIsLoading(true);

    try {
      await registerMentor(data);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration Failed";
      alert(errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg flex max-w-4xl w-full">
        <div className="w-1/2 flex flex-col items-center justify-start ">
          <img
            alt="MentorME logo"
            className="mb-4"
            height="150"
            src="/Logo/LOGO MENTORME NEW (1).png"
            width="150"
          />
          <img
            alt="Cartoon deer holding books"
            className="mb-4"
            height="200"
            src="/Icon/Maskot.png"
            width="200"
          />
          <p className="text-center text-lg">
            To be mentor, unlock your potential
          </p>
        </div>
        <div className="w-1/2 bg-green-300 p-8 rounded-r-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Daftar Sebagai Mentor
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Nama Lengkap"
              onChange={handleChange}
              required
              className="border p-3 w-full rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              onChange={handleChange}
              required
              className="border p-3 w-full rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="border p-3 w-full rounded"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="border p-3 w-full rounded"
            />
            <input
              type="text"
              name="portfolio"
              placeholder="Portfolio Link"
              onChange={handleChange}
              required
              className="border p-3 w-full rounded"
            />
            <input
              type="text"
              name="ability"
              placeholder="Abilities"
              onChange={handleChange}
              required
              className="border p-3 w-full rounded"
            />

            {/* Upload Files */}
            {["cv", "ktp", "picture"].map((fileType) => (
              <div
                key={fileType}
                className="border p-3 rounded text-center relative cursor-pointer bg-gray-100"
              >
                <label className="block cursor-pointer">
                  <span className="text-gray-700">
                    {files[fileType]
                      ? files[fileType].name
                      : `Upload ${fileType.toUpperCase()}`}
                  </span>
                  <input
                    type="file"
                    name={fileType}
                    accept={fileType === "picture" ? "image/*" : ".pdf"}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            ))}

            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-3 rounded hover:bg-green-700 transition w-full"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Daftar"}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-center text-gray-700 mt-4">
              Sudah punya akun?{" "}
              <span
                className="text-green-600 cursor-pointer"
                onClick={handleLoginClick}
              >
                Login Disini!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
