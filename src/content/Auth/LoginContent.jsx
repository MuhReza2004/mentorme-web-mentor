import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginMentor } from "../../services/api";
import { getFcmToken, removeFcmToken } from "../../services/getFcmToken";

const LoginContent = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await removeFcmToken();
      const fcmToken = await getFcmToken();

      const payload = { ...formData, fcmToken };
      const response = await loginMentor(payload);

      // Handle success response
      if (response.data) {
        localStorage.setItem("nameUser", response.data.nameUser);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role.role);
        localStorage.setItem("ProfilePicture", response.data.pictureUser);

        if (response.data.role.role === "MENTOR") {
          navigate("/dashboard");
        } else if (response.data.role.role === "ADMIN") {
          navigate("/DashboardAdmin");
        }
        return;
      }

      // Handle error response langsung dari server
      if (response.error) {
        setError(response.error);
        return;
      }
    } catch (err) {
      console.error("Login error:", err);

      // Prioritaskan properti 'error' dari response
      if (err.error) {
        setError(err.error);
      }
      // Fallback ke message jika error tidak ada
      else if (err.message) {
        setError(err.message);
      }
      // Default error
      else {
        setError("Terjadi kesalahan saat login. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Logo */}
      <div className="absolute top-4 left-4">
        <img
          src="/Logo/LOGO MENTORME NEW (1).png"
          alt="MentorME Logo"
          className="w-40"
        />
      </div>

      {/* Left Side - Content */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <img src="/Icon/Maskot.png" alt="Mentor Mascot" className="w-64 mb-4" />
        <p className="text-gray-600 text-lg font-medium">
          To be mentor, unlock your potential
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex flex-col justify-center bg-green-300 p-12 rounded-l-3xl">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Masuk Sebagai Mentor
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
            <p className="text-center font-medium">
              {error.includes("pending") ? (
                <>
                  <span className="block font-bold">
                    Status Pendaftaran Mentor
                  </span>
                  <span>
                    Akun Anda sedang dalam proses verifikasi oleh tim kami.
                  </span>
                  <span className="block mt-2">
                    Silakan tunggu konfirmasi lebih lanjut.
                  </span>
                </>
              ) : (
                error
              )}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            } text-white font-bold py-2 rounded-md transition duration-200 flex items-center justify-center`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Belum punya akun?{" "}
          <button
            onClick={handleRegisterClick}
            className="text-green-600 font-semibold hover:underline focus:outline-none"
          >
            Daftar Disini!
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginContent;
