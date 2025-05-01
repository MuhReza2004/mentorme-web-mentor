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
      const response = await loginMentor(payload); // response.data sudah di-return dari api.js
      const resData = response;

      if (resData.code === 401) {
        setError(
          resData.error || resData.message || "Email atau Password salah."
        );
        return;
      }

      localStorage.setItem("nameUser", resData.data.nameUser);
      localStorage.setItem("email", resData.data.email);
      localStorage.setItem("user", JSON.stringify(resData.data));
      localStorage.setItem("token", resData.data.token);
      localStorage.setItem("role", resData.data.role.role);
      localStorage.setItem("ProfilePicture", resData.data.pictureUser);

      if (resData.data.role.role === "MENTOR") {
        navigate("/dashboard");
      } else if (resData.data.role.role === "ADMIN") {
        navigate("/DashboardAdmin");
      } else {
        setError("Data pengguna tidak valid.");
      }
    } catch (err) {
      console.error("Terjadi kesalahan saat login:", err);
      // Ambil error dari server jika ada
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
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
      {/* Left Side */}
      <div>
        <img
          src="/Logo/LOGO MENTORME NEW (1).png"
          alt="MentorME Logo"
          className="w-40 ml-2"
        />
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <img src="/Icon/Maskot.png" alt="Mentor Mascot" className="w-64 mb-4" />
        <p className="text-gray-600 text-lg font-medium">
          To be mentor, unlock your potential
        </p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center bg-green-300 p-12 rounded-l-3xl">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Masuk Sebagai Mentor
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md transition duration-200"
          >
            {loading ? "Logging in..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Belum punya akun?{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={handleRegisterClick}
          >
            Daftar Disini!
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginContent;
