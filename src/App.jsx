import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage from "./pages/about";
import MentorsPage from "./pages/mentors";
import AdminDashboard from "./pages/DashboardAdmin";
import MyCourse from "./pages/MyCource";
import SideBar from "./components/Sidebar";
import CreateCourse from "./pages/CreateCourse";

function App() {
  return (
    <Router>
      {/* <SideBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/MyCourse" element={<MyCourse />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
