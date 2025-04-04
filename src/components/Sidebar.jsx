import { ChevronDown, ChevronUp, Home, Layers, Mail, Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SideBar = () => {
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(true); // State untuk toggle sidebar
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk toggle dropdown

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("nameUser");
    console.log(storedName);
    if (storedRole) setRole(storedRole);
    if (storedName) setName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setRole(null);
    window.location.href = "/login";
  };

  return (
    <div className={`flex flex-col h-screen bg-green-200 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-20"}`}>
      {role === "MENTOR" && (
        <button
          className={`p-2 mt-2 rounded-full hover:bg-black-200 transition-all duration-300 
          ${isOpen ? "self-end mr-3" : "mx-auto"}
        `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      )}

      <div className="flex flex-col items-center">
        {isOpen && (
          <img
            src="/Logo/LOGO MENTORME NEW (1).png"
            alt="Logo"
            className="w-[150px] h-[150px] rounded-full transition-all duration-300"
          />
        )}
      </div>

      {/* User Info + Dropdown */}
      <div className="relative">
        <div 
          className="flex items-center space-x-2 cursor-pointer px-3"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          {isOpen && (
            <div>
              <span className="block font-bold">{name}</span>
              <span className="block text-sm">{role}</span>
            </div>
          )}
          {isOpen && (isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && isOpen && (
          <div className="absolute top-full left-3 bg-white shadow-md rounded-lg p-3 mt-2 w-48 z-10">
            <NavLink to="/EditProfile" className="block p-2 hover:bg-gray-100">Edit Profile</NavLink>
            <NavLink to="/Exchange" className="block p-2 hover:bg-gray-100">Exchange</NavLink>
            {/* <NavLink to="/history" className="block p-2 hover:bg-gray-100">History</NavLink> */}
          </div>
        )}
      </div>

      <hr className="my-2 border-gray-300 items-start" />

      <nav className="flex flex-col py-7 gap-2 px-3">
        {role === "MENTOR" ? (
          <>
            <NavLink to="/dashboard" className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${location.pathname.includes("dashboard") ? "bg-white" : ""}`}>
              <Home className="w-5 h-5 mr-2" />
              {isOpen && <span>Dashboard</span>}
            </NavLink>
            <NavLink to="/MyCourse" className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${location.pathname.includes("MyCourse") ? "bg-white" : ""}`}>
              <Layers className="w-5 h-5 mr-2" />
              {isOpen && <span>My Course</span>}
            </NavLink>
          </>
        ) : role === "ADMIN" ? (
          <>
            <NavLink to="/DashboardAdmin" className="flex items-center p-2 text-gray-800 rounded-lg w-full hover:bg-white">
              <Home className="w-5 h-5 mr-2" />
              <span>Dashboard Admin</span>
            </NavLink>
            <NavLink to="/CourseValidation" className="flex items-center p-2 text-gray-800 rounded-lg w-full hover:bg-white">
              <Layers className="w-5 h-5 mr-2" />
              <span>Course Validation</span>
            </NavLink>
          </>
        ) : null}

        <NavLink to="/ChatMentor" className="flex items-center p-2 text-gray-800 rounded-lg w-full hover:bg-white">
          <Mail className="w-5 h-5 mr-2" />
          {isOpen && <span>Chat</span>}
        </NavLink>
        <button onClick={handleLogout} className="flex items-center p-2 text-gray-800 hover:bg-green-300 rounded-lg">
          <img src="/Icon/logout.png" className="w-6 h-6 mr-2" />
          {isOpen && <span>Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default SideBar;
