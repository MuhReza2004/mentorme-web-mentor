import { Bell, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NavbarMentor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreateClick = () => {
    navigate("/CreateCourse");
  };

  const handleBellClick = () => {
    navigate("/notification");
  };

  const showCreateCourseButton =
    location.pathname === "/MyCourse" || location.pathname === "/dashboard";

  return (
    <div className="bg-white shadow-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Search Bar */}
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notification Button */}
          <button
            onClick={handleBellClick}
            className="bg-[#7DE2D1] p-2 rounded-full flex items-center justify-center hover:bg-teal-500 transition"
          >
            <Bell className="w-5 h-5 text-white" />
          </button>

          {/* Create Course Button (for /MyCourse and /dashboard) */}
          {showCreateCourseButton && (
            <button
              onClick={handleCreateClick}
              className="bg-[#7DE2D1] px-4 py-2 rounded-xl text-white font-semibold hover:bg-teal-500 transition hover:scale-105"
            >
              Create Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarMentor;
