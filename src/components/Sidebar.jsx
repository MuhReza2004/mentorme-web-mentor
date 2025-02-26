import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const name = localStorage.getItem("name");
  const location = useLocation(); // Dapatkan lokasi saat ini

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col h-screen w-64  bg-green-200 shadow-lg items-start">
      <div className="flex flex-col items-center">
        <img
          src="/src/assets/Logo/LOGO MENTORME NEW (1).png"
          alt="Logo"
          className="w-[150px] h-[150px] rounded-full flex items-center justify-center"
        />
      </div>
      <div>
        <h1>Welcome, {name}</h1>
      </div>

      <hr className="my-2 border-gray-300" />
      <nav className="flex flex-col p-4 m-4">
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
          <img src="/src/assets/Icon/home.png" className="w-6 h-6 mr-2" />
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
          <img
            src="/src/assets/Icon/certificate.png"
            className="w-6 h-6 mr-2"
          />
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
          <img src="/src/assets/Icon/mail.png" className="w-6 h-6 mr-2" />
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
          className="flex items-center p-2 text-gray-800 hover:bg-green-300 rounded-lg mt-45"
        >
          <img src="/src/assets/Icon/logout.png" className="w-6 h-6 mr-2" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default SideBar;
