import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 border-b shadow-sm bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/src/assets/Logo/LOGO MENTORME NEW (1).png"
          alt="MentorME Logo"
          className="h-20"
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-8 text-lg font-medium align-items ">
        <Link to="/" className="text-gray-700 hover:text-teal-600 ">
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
      </ul>
    </nav>
  );
};

export default Navbar;
