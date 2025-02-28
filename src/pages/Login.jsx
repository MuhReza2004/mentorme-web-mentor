import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginMentor } from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginMentor(formData);
      console.log(response);
      console.log(response.code);

      if (response.code === 401) {
        const errorMessage = response.error;

        setError(errorMessage);
        // alert(errorMessage);
      }

      localStorage.setItem("name", name);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Terjadi kesalahan saat menghubungkan ke server!", error);
      // setError("Terjadi kesalahan saat menghubungkan ke server");
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
          src="/src/assets/Logo/LOGO MENTORME NEW (1).png"
          alt="MentorME Logo"
          className="w-40 ml-2"
        />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center  p-8">
        <img
          src="/src/assets/Icon/Maskot.png"
          alt="Mentor Mascot"
          className="w-64 mb-4"
        />
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
            <label className="text-gray-700  font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="text-right text-sm text-gray-700 cursor-pointer mt-1">
              Forgot Password?
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

export default Login;
