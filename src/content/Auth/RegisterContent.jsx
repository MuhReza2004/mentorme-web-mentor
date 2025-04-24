import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../src/styles.css";
import { registerMentor } from "../../services/api";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const RegisterContent = () => {
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
      await registerMentor(data); // Assuming registerMentor is defined elsewhere
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-xl flex max-w-5xl w-full overflow-hidden">
        {/* LEFT SECTION */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-white p-8">
          <img
            src="/Logo/LOGO MENTORME NEW (1).png"
            alt="MentorMe Logo"
            className="w-28 mb-4"
          />
          <img src="/Icon/Maskot.png" alt="Mascot" className="w-44 mb-4" />
          <p className="text-center text-lg font-semibold text-gray-600">
            To be mentor, unlock your potential!
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-1/2 bg-white p-10">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Daftar Sebagai Mentor
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "fullName", type: "text", placeholder: "Nama Lengkap" },
              { name: "email", type: "email", placeholder: "Email" },
              { name: "password", type: "password", placeholder: "Password" },
              {
                name: "confirmPassword",
                type: "password",
                placeholder: "Konfirmasi Password",
              },
              {
                name: "portfolio",
                type: "text",
                placeholder: "Link Portfolio",
              },
              { name: "About", type: "text", placeholder: "Tentang Anda" },
            ].map((input) => (
              <input
                key={input.name}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            ))}

            {/* Upload Files */}
            <div className="space-y-3">
              {["cv", "ktp", "picture"].map((fileType) => (
                <label
                  key={fileType}
                  className="block border border-dashed border-gray-300 rounded px-4 py-4 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition"
                >
                  <span className="text-sm text-gray-600">
                    {files[fileType]
                      ? `Uploaded: ${files[fileType].name}`
                      : `Upload ${fileType.toUpperCase()} ${
                          fileType === "picture" ? "(image)" : "(PDF)"
                        }`}
                  </span>
                  <input
                    type="file"
                    name={fileType}
                    accept={fileType === "picture" ? "image/*" : ".pdf"}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded font-semibold text-white transition ${
                isLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isLoading ? "Loading..." : "Daftar"}
            </button>
          </form>

          <div className="text-center mt-5 text-sm text-gray-600">
            Sudah punya akun?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-700 font-medium cursor-pointer hover:underline"
            >
              Login disini!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterContent;
