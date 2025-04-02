import { ChevronDown, Home, Layers, Mail } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "/src/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const SideBar = () => {
  const location = useLocation();
  const [role, setRole] = useState(null); // Default null
  const [name, setName] = useState("");

  // Ambil role dari localStorage saat pertama kali render
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");
    if (storedRole) {
      console.log("Role loaded from localStorage:", storedRole);
      setRole(storedRole);
    }

      if (storedName) {
    console.log("Name loaded from localStorage:", storedName);
    setName(storedName); // Simpan ke state
  }
  }, []);

  useEffect(() => {
    console.log("Updated Role in Sidebar:", role);
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role"); // Hapus role saat logout
    setRole(null); // Update state agar sidebar berubah
    window.location.href = "/login";
  };
  return (
    <div className="flex flex-col h-screen w-64 bg-green-200 shadow-lg">
      <div className="flex flex-col items-center">
        <img
          src="/Logo/LOGO MENTORME NEW (1).png"
          alt="Logo"
          className="w-[150px] h-[150px] rounded-full flex items-center justify-center"
        />
      </div>

      <div className="flex items-center space-x-2 cursor-pointer px-3">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <span className="block font-bold">{name}</span>
          <span className="block text-sm">{role}</span>
        </div>
        <ChevronDown size={16} />
      </div>

      <hr className="my-2 border-gray-300 items-start" />
      <nav className="flex flex-col py-7 gap-2 px-3">
        {role === "MENTOR" ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 text-gray-800 rounded-lg w-full ${
                  isActive ||
                  location.pathname.includes("ProgressTrainee") ||
                  location.pathname.includes("TraineeActivity")
                    ? "bg-white"
                    : "hover:bg-white"
                }`
              }
            >
              <Home className="w-5 h-5 mr-2" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/MyCourse"
              className={({ isActive }) =>
                `flex items-center p-2 text-gray-800 rounded-lg w-full ${
                  isActive ||
                  location.pathname.includes("CreateCourse") ||
                  location.pathname.includes("DetailMyCourse")
                    ? "bg-white"
                    : "hover:bg-white"
                }`
              }
            >
              <Layers className="w-5 h-5 mr-2" />
              <span>My Course</span>
            </NavLink>
          </>
        ) : role === "ADMIN" ? (
          <>
            <NavLink
              to="/DashboardAdmin"
              className={({ isActive }) =>
                `flex items-center p-2 text-gray-800 rounded-lg w-full ${
                  isActive ? "bg-white" : "hover:bg-white"
                }`
              }
            >
              <Home className="w-5 h-5 mr-2" />
              <span>Dashboard Admin</span>
            </NavLink>
            <NavLink
              to="/CourseValidation"
              className={({ isActive }) =>
                `flex items-center p-2 text-gray-800 rounded-lg w-full ${
                  isActive ? "bg-white" : "hover:bg-white"
                }`
              }
            >
              <Layers className="w-5 h-5 mr-2" />
              <span>Course Validation</span>
            </NavLink>
          </>
        ) : null}

        <NavLink
          to="/ChatMentor"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-800 rounded-lg w-full ${
              isActive ? "bg-white" : "hover:bg-white"
            }`
          }
        >
          <Mail className="w-5 h-5 mr-2" />
          <span>Chat</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-800 rounded-lg w-full ${
              isActive ? "bg-white" : "hover:bg-white"
            }`
          }
        >
          <img src="/Icon/settings.png" className="w-6 h-6 mr-2" />
          <span>Settings</span>
        </NavLink>
        <NavLink
          to="/help-center"
          className={({ isActive }) =>
            `flex items-center p-2 text-gray-900 rounded-lg w-full ${
              isActive ? "bg-white" : "hover:bg-white"
            }`
          }
        >
          <img src="/Icon/message-circle-question.png" className="w-6 h-6 mr-2" />
          <span>Help Center</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center p-2 text-gray-800 hover:bg-green-300 rounded-lg"
        >
          <img src="/Icon/logout.png" className="w-6 h-6 mr-2" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default SideBar;
