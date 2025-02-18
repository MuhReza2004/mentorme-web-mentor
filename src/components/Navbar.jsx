import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <img
          src="/src/assets/Logo/LOGO MENTORME NEW (1).png"
          alt="Logo"
          className="h-20"
        />
      </div>
      <div className="flex space-x-4 gap-4 ml-2">
        <Link to="/" className="text-gray-700 hover:text-teal-600">
          Beranda
        </Link>
        <Link to="/mentors" className="text-gray-700 hover:text-teal-600">
          Mentor
        </Link>
        <Link to="/features" className="text-gray-700 hover:text-teal-600">
          Fitur
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-teal-600">
          Tentang
        </Link>
        <Link
          to="/register"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Daftar Mentor
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
