import { ChevronDown, Home, Layers, Mail } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  // const name = localStorage.getItem("name");
  const location = useLocation(); // Dapatkan lokasi saat ini

  const user = {
    photo: "https://www.w3schools.com/howto/img_avatar.png", // Placeholder image
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-green-200 shadow-lg ">

      <div className="flex flex-col items-center">
        <img
          src="/src/assets/Logo/LOGO MENTORME NEW (1).png"
          alt="Logo"
          className="w-[150px] h-[150px] rounded-full flex items-center justify-center"
        />
      </div>

      <div className="flex items-center space-x-2 cursor-pointer px-3">
        <img src={user.photo} alt="User" className="w-8 h-8 rounded-full" />
        <div>
          <span className="block font-bold">{user.name}</span>
          <span className="block text-sm">{user.email}</span>
        </div>
        <ChevronDown size={16} />
      </div>

      <hr className="my-2 border-gray-300 items-start " />
      <nav className="flex flex-col py-7 gap-2 px-3">
        <NavLink
          to="/Dashboard"
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
              isActive || location.pathname.includes("CreateCourse")
                ? "bg-white"
                : "hover:bg-white"
            }`
          }
        >
          <Layers className="w-5 h-5 mr-2" />

          <span>My Course</span>
        </NavLink>
        <NavLink
          to="/chat"
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
          <img src="/src/assets/Icon/settings.png" className="w-6 h-6 mr-2" />
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
          <img
            src="/src/assets/Icon/message-circle-question.png"
            className="w-6 h-6 mr-2"
          />
          <span>Help Center</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center p-2 text-gray-800 hover:bg-green-300 rounded-lg mt-35"
        >
          <img src="/src/assets/Icon/logout.png" className="w-6 h-6 mr-2" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default SideBar;
