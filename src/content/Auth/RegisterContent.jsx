import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../src/styles.css";
import { registerMentor } from "../../services/api";
import { Eye, EyeOff } from "lucide-react";

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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateInput = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Nama lengkap wajib diisi.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email tidak valid.";
    if (formData.password.length < 8)
      newErrors.password = "Password harus minimal 8 karakter.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Password tidak cocok.";
    if (
      !formData.portfolio.trim() ||
      !/^https?:\/\/.+/.test(formData.portfolio)
    )
      newErrors.portfolio = "Link portfolio tidak valid.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("Ukuran file harus kurang dari 2MB.");
      return;
    }

    if ((name === "cv" || name === "ktp") && file.type !== "application/pdf") {
      alert("CV dan KTP harus dalam format PDF.");
      return;
    }

    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInput();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
      const response = await registerMentor(data);
      console.log(response.data);
      setShowSuccessModal(true); // Tampilkan modal sukses
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Pendaftaran gagal. Silakan coba lagi.";
      alert(errorMessage);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/login"); // Redirect ke halaman login setelah menutup modal
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 px-4 py-10">
      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mt-3">
                Pendaftaran Berhasil!
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Pendaftaran berhasil, tunggu 1x24 jam untuk verifikasi akun
                  Anda.
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                  onClick={handleModalClose}
                >
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              { name: "password", placeholder: "Password" },
              {
                name: "confirmPassword",
                placeholder: "Konfirmasi Password",
              },
              {
                name: "portfolio",
                type: "text",
                placeholder: "Link Portfolio",
              },
              { name: "ability", type: "text", placeholder: "Tentang Anda" },
            ].map((input) => {
              if (
                input.name === "password" ||
                input.name === "confirmPassword"
              ) {
                const show =
                  input.name === "password"
                    ? showPassword
                    : showConfirmPassword;
                const toggle =
                  input.name === "password"
                    ? () => setShowPassword((prev) => !prev)
                    : () => setShowConfirmPassword((prev) => !prev);
                return (
                  <div key={input.name} className="relative">
                    <input
                      name={input.name}
                      type={show ? "text" : "password"}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />
                    <button
                      type="button"
                      onClick={toggle}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-green-500"
                    >
                      {show ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {errors[input.name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[input.name]}
                      </p>
                    )}
                  </div>
                );
              }

              return (
                <div key={input.name}>
                  <input
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  />
                  {errors[input.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[input.name]}
                    </p>
                  )}
                </div>
              );
            })}

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
