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
import CreateCourse from "./pages/CreateCourse";
import ProgressTrainee from "./pages/ProgressTrainee";
import TraineeActivity from "./pages/TraineeActivity";
import CreateSyllabus from "./pages/CreateSyllabus";

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
        <Route path="Dashboard/MyCourse" element={<MyCourse />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route path="/ProgressTrainee" element={<ProgressTrainee />} />
        <Route path="/TraineeActivity" element={<TraineeActivity />} />
        <Route path="/CreateSyllabus" element={<CreateSyllabus />} />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
