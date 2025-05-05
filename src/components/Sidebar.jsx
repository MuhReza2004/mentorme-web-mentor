import {
  ChevronDown,
  ChevronUp,
  Home,
  Layers,
  Mail,
  Menu,
  Gift,
  FolderPlus,
  BellPlus,
  BookOpenCheck,
  CircleHelp,
  Wallet,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteToken, messaging } from "../firebaseConfig";

const SideBar = () => {
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("nameUser");
    const storedProfilePicture = localStorage.getItem("ProfilePicture");

    if (storedRole) setRole(storedRole);
    if (storedName) setName(storedName);

    if (storedProfilePicture) {
      const httpsIndex = storedProfilePicture.lastIndexOf("https://");
      const cleanedProfilePicture =
        httpsIndex !== -1
          ? storedProfilePicture.substring(httpsIndex)
          : storedProfilePicture;

      setProfilePicture(cleanedProfilePicture);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await deleteToken(messaging);
      console.log("✅ FCM token deleted");
    } catch (err) {
      console.error("❌ Error deleting FCM token:", err);
    }
    localStorage.clear();
    navigate("/login");
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const renderMentorLinks = () => (
    <>
      <NavLink
        to="/dashboard"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          location.pathname.includes("/dashboard") ? "bg-white" : ""
        }`}
      >
        <Home className="w-5 h-5 mr-2" />
        {isOpen && <span>BERANDA</span>}
      </NavLink>
      <NavLink
        to="/MyCourse"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          [
            "/MyCourse",
            "/DetailMyCourse",
            "/MateriPembelajaran",
            "/DetailSyllabus",
          ].some((path) => location.pathname.includes(path))
            ? "bg-white"
            : ""
        }`}
      >
        <Layers className="w-5 h-5 mr-2" />
        {isOpen && <span>KURSUS SAYA</span>}
      </NavLink>
      <NavLink
        to="/Bantuan"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          location.pathname.includes("/Bantuan") ? "bg-white" : ""
        }`}
      >
        <CircleHelp className="w-5 h-5 mr-2" />
        {isOpen && <span>BANTUAN</span>}
      </NavLink>
    </>
  );

  const renderAdminLinks = () => (
    <>
      <NavLink
        to="/DashboardAdmin"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          location.pathname.includes("/DashboardAdmin") ? "bg-white" : ""
        }`}
      >
        <Home className="w-5 h-5 mr-2" />
        {isOpen && <span>DASHBOARD</span>}
      </NavLink>
      <NavLink
        to="/CourseValidation"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          location.pathname.includes("/CourseValidation") ? "bg-white" : ""
        }`}
      >
        <BookOpenCheck className="w-5 h-5 mr-2" />
        {isOpen && <span>COURSE VALIDATION</span>}
      </NavLink>
      <NavLink
        to="/Voucher"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          location.pathname.includes("/Voucher") ? "bg-white" : ""
        }`}
      >
        <Gift className="w-5 h-5 mr-2" />
        {isOpen && <span>VOUCHER</span>}
      </NavLink>
      <NavLink
        to="/CreateCategory"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          location.pathname.includes("/CreateCategory") ? "bg-white" : ""
        }`}
      >
        <FolderPlus className="w-5 h-5 mr-2" />
        {isOpen && <span>CREATE CATEGORY</span>}
      </NavLink>
      <NavLink
        to="/CreateLearningPath"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          location.pathname.includes("/CreateLearningPath") ? "bg-white" : ""
        }`}
      >
        <BookOpenCheck className="w-5 h-5 mr-2" />
        {isOpen && <span>LEARNING PATH</span>}
      </NavLink>
      <NavLink
        to="/BuyCourseTrainee"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          location.pathname.includes("/BuyCourseTrainee") ? "bg-white" : ""
        }`}
      >
        <Layers className="w-5 h-5 mr-2" />
        {isOpen && <span>BUY COURSE</span>}
      </NavLink>
      <NavLink
        to="/WithdrawAdmin"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          location.pathname.includes("/BuyCourseTrainee") ? "bg-white" : ""
        }`}
      >
        <Wallet className="w-5 h-5 mr-2" />
        {isOpen && <span>BUY COURSE</span>}
      </NavLink>
      <NavLink
        to="/CreateNotification"
        onClick={handleLinkClick}
        className={`flex items-center p-2 rounded-lg w-full hover:bg-white ${
          location.pathname.includes("/CreateNotification") ? "bg-white" : ""
        }`}
      >
        <BellPlus className="w-5 h-5 mr-2" />
        {isOpen && <span>NOTIFICATION</span>}
      </NavLink>
    </>
  );

  return (
    <div
      className={`flex flex-col min-h-screen bg-green-200 shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {role === "MENTOR" && (
        <button
          className={`p-2 mt-2 rounded-full hover:bg-black-200 transition-all duration-300 ${
            isOpen ? "self-end mr-3" : "mx-auto"
          }`}
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

      <div className="relative">
        <div
          className="flex items-center space-x-2 cursor-pointer px-3"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            src={profilePicture || "/default-avatar.png"}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          {isOpen && (
            <div>
              <span className="block font-bold">{name}</span>
              <span className="block text-sm">{role}</span>
            </div>
          )}
          {isOpen &&
            (isDropdownOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            ))}
        </div>

        {isDropdownOpen && isOpen && role === "MENTOR" && (
          <div className="absolute top-full left-3 bg-white shadow-md rounded-lg p-3 mt-2 w-48 z-10">
            <NavLink
              to="/EditProfile"
              onClick={handleLinkClick}
              className="block p-2 hover:bg-gray-100"
            >
              EDIT PROFIL
            </NavLink>
            <NavLink
              to="/Exchange"
              onClick={handleLinkClick}
              className="block p-2 hover:bg-gray-100"
            >
              TARIK TUNAI
            </NavLink>
          </div>
        )}
      </div>

      <hr className="my-2 border-gray-300 items-start" />

      <nav className="flex flex-col py-7 gap-2 px-3">
        {role === "MENTOR" && renderMentorLinks()}
        {role === "ADMIN" && renderAdminLinks()}

        <NavLink
          to="/ChatMentor"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg w-full hover:bg-white ${
              isActive ? "bg-white" : ""
            }`
          }
        >
          <Mail className="w-5 h-5 mr-2" />
          {isOpen && <span>CHAT</span>}
        </NavLink>

        <button
          onClick={() => {
            handleLogout();
            handleLinkClick();
          }}
          className="flex items-center p-2 text-gray-800 hover:bg-green-300 rounded-lg"
        >
          <img src="/Icon/logout.png" className="w-6 h-6 mr-2" />
          {isOpen && <span>KELUAR</span>}
        </button>
      </nav>
    </div>
  );
};

export default SideBar;
