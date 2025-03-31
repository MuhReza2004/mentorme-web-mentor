import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/about";
import MentorsPage from "./pages/mentors";
import MyCourse from "./pages/MyCource";
import CreateCourse from "./pages/CreateCourse";
import ProgressTrainee from "./pages/ProgressTrainee";
import TraineeActivity from "./pages/TraineeActivity";
import CreateSyllabus from "./pages/CreateSyllabus";
import ChatMentor from "./pages/Chat";
import DetailMyCourse from "./pages/DetailMyCourse";
import DetailSyllabus from "./pages/DetailSyllabus";
import MateriPembelajaran from "./pages/MateriPembelajaran";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailCreateSyllabus from "./pages/DetailCreateSyllabus";
import DetailActivityTrainee from "./pages/DashboardPages/DetailActivityTrainee";

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
        <Route path="/MyCourse" element={<MyCourse />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route path="/ProgressTrainee" element={<ProgressTrainee />} />
        <Route path="/TraineeActivity/:IDActivity" element={<TraineeActivity />} />
        <Route path="/CreateSyllabus" element={<CreateSyllabus />} />
        <Route path="ChatMentor" element={<ChatMentor />} />
        <Route path="/DetailMyCourse" element={<DetailMyCourse />} />
        <Route path="/DetailSyllabus" element={<DetailSyllabus />} />
        <Route path="/MateriPembelajaran" element={<MateriPembelajaran />} />
        <Route path="/DetailCreateSyllabus" element={<DetailCreateSyllabus />} />
        <Route path="/DetailActivityTrainee/:activityId" element={<DetailActivityTrainee />} />
        <Route
          path="/dashboard"
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
