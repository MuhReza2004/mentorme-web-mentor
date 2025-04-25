import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-teal-600 font-semibold border-b-2 border-teal-600"
      : "text-gray-700 hover:text-teal-600";

  return (
    <nav className="flex justify-between items-center px-10 py-4 border-b shadow-sm bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/Logo/LOGO MENTORME NEW (1).png"
          alt="MentorME Logo"
          className="h-20"
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-8 text-lg font-medium">
        <NavLink to="/" className={navLinkClass}>
          Beranda
        </NavLink>
        <NavLink to="/mentors" className={navLinkClass}>
          Mentor
        </NavLink>
        <NavLink to="/features" className={navLinkClass}>
          Fitur
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          Tentang
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive
              ? "bg-teal-700 text-white px-4 py-2 rounded"
              : "bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          }
        >
          Daftar Mentor
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
