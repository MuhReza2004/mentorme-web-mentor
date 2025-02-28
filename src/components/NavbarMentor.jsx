import { Bell, Coins, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NavbarMentor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreateClick = () => {
    if (location.pathname === "/MyCourse") {
      navigate("/CreateCourse");
    } else {
      navigate("/create-ads");
    }
  };

  const handleBellClick = () => {
    navigate("/notification");
  };

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

          {/* Balance Button */}
          <button className="bg-[#7DE2D1] px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-teal-500 transition">
            <Coins className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-bold">125.75</span>
            <div className="bg-[#339989] p-1 rounded-md flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </button>

          {/* Create Button (Dinamically Changed) */}
          <button
            onClick={handleCreateClick}
            className="bg-[#7DE2D1] px-4 py-2 rounded-xl text-white font-semibold hover:bg-teal-500 transition hover:scale-105"
          >
            {location.pathname === "/MyCourse" ? "Create Course" : "Create Ads"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarMentor;
