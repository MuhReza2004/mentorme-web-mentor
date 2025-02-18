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

  const [files, setFiles] = useState({
    cv: null,
    ktp: null,
    picture: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 2MB");
      e.target.value = "";
      return;
    }

    if ((name === "cv" || name === "ktp") && file.type !== "application/pdf") {
      alert("CV and KTP must be uploaded in PDF format");
      e.target.value = "";
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
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

    try {
      const response = await registerMentor(data);
      console.log("Registration Successful", response);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed", error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center text-green-600">
          Daftar Sebagai Mentor
        </h2>
        <p className="text-center mb-6 text-gray-600">
          To be a mentor, unlock your potential
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Nama Lengkap"
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="portofolio"
            placeholder="Portfolio Link"
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="ability"
            placeholder="Abilities"
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Upload CV (PDF only, max 2MB):
            </label>
            <input
              type="file"
              name="cv"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Upload KTP (PDF only, max 2MB):
            </label>
            <input
              type="file"
              name="ktp"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Upload Picture (Image only, max 2MB):
            </label>
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-3 px-4 rounded hover:bg-green-700 transition w-full"
          >
            Daftar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
