import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/HomePage";
import Register from "./pages/Register";
import LoginPage from "./pages/Login";
import AboutPages from "./pages/LandingPages/AboutPages";
import FeaturesPage from "./pages/LandingPages/FeaturesPage";
import MentorPage from "./pages/LandingPages/MentorsPages";
import NotFound from "./pages/NotFound";

// Dashboard & Trainee Pages
import Dashboard from "./pages/Dashboard";
import MyCourse from "./pages/MyCource";
import CreateCourse from "./pages/CreateCourse";
import ProgressTrainee from "./pages/ProgressTrainee";
import TraineeActivity from "./pages/TraineeActivity";
import CreateSyllabus from "./pages/CreateSyllabus";
import DetailMyCourse from "./pages/DetailMyCourse";
import DetailSyllabus from "./pages/DetailSyllabus";
import MateriPembelajaran from "./pages/MateriPembelajaran";
import DetailCreateSyllabus from "./pages/DetailCreateSyllabus";
import DetailActivityTrainee from "./pages/DashboardPages/DetailActivityTrainee";
import TraineeProgress from "./pages/DashboardPages/TraineeProgress";
import ChatMentor from "./pages/Chat";

// Profile & Support Pages
import EditProfile from "./pages/ProfilePages/EditProfile";
import Exchange from "./pages/ProfilePages/Exchange";
import DetailExchange from "./pages/ProfilePages/DetailExchange";
import Bantuan from "./pages/BantuanPages/BantuanPages";

// Notification & Admin Pages
import NotificationPage from "./pages/Notification/NotificationPage";
import DashboardAdmin from "./pages/AdminPages/DashboardPages/DashboardAdminPages";
import DetailMentorRequest from "./pages/AdminPages/DashboardPages/DetailMentorRequestPages";
import CourseValidation from "./pages/AdminPages/CourseValidationPages/CourseValidation";
import DetailCourseValidation from "./pages/AdminPages/CourseValidationPages/DetailCourseValidationPages";
import CreateCategory from "./pages/AdminPages/CreateCategoryPages/CreateCategoryPages";
import CreateLearningPath from "./pages/AdminPages/CreateLearningPathPages/CreateLearningPathPages";
import CreateNotification from "./pages/AdminPages/CreateNotificationPages/CreateNotification";
import BuyTraineePage from "./pages/AdminPages/BuyCourseTraineePages/BuyCourseTraineePage";
import Voucher from "./pages/AdminPages/VoucherPages/VoucherPages";
import ExchangeMoneyPage from "./pages/Exchange/ExchangeMoney/ExchangeMoneyPage";
import WithdrawPage from "./pages/AdminPages/WithdrawPages/WithdrawPage";

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPages />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/mentors" element={<MentorPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MyCourse"
          element={
            <ProtectedRoute>
              <MyCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CreateCourse"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProgressTrainee"
          element={
            <ProtectedRoute>
              <ProgressTrainee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TraineeActivity/:IDActivity"
          element={
            <ProtectedRoute>
              <TraineeActivity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TraineeProgress/:id"
          element={
            <ProtectedRoute>
              <TraineeProgress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CreateSyllabus/:courseId"
          element={
            <ProtectedRoute>
              <CreateSyllabus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ChatMentor"
          element={
            <ProtectedRoute>
              <ChatMentor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DetailMyCourse/:id"
          element={
            <ProtectedRoute>
              <DetailMyCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DetailSyllabus/:id"
          element={
            <ProtectedRoute>
              <DetailSyllabus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MateriPembelajaran/:id"
          element={
            <ProtectedRoute>
              <MateriPembelajaran />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DetailCreateSyllabus"
          element={
            <ProtectedRoute>
              <DetailCreateSyllabus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DetailActivityTrainee/:activityId"
          element={
            <ProtectedRoute>
              <DetailActivityTrainee />
            </ProtectedRoute>
          }
        />

        {/* Profile Pages */}
        <Route
          path="/EditProfile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Exchange"
          element={
            <ProtectedRoute>
              <Exchange />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DetailExchange"
          element={
            <ProtectedRoute>
              <DetailExchange />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Bantuan"
          element={
            <ProtectedRoute>
              <Bantuan />
            </ProtectedRoute>
          }
        />

        {/* Admin Pages */}
        <Route
          path="/DashboardAdmin"
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CourseValidation"
          element={
            <ProtectedRoute>
              <CourseValidation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DetailCourseValidation/:id"
          element={
            <ProtectedRoute>
              <DetailCourseValidation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DetailMentorRequest/:ID"
          element={
            <ProtectedRoute>
              <DetailMentorRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CreateNotification"
          element={
            <ProtectedRoute>
              <CreateNotification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CreateLearningPath"
          element={
            <ProtectedRoute>
              <CreateLearningPath />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CreateCategory"
          element={
            <ProtectedRoute>
              <CreateCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/BuyCourseTrainee"
          element={
            <ProtectedRoute>
              <BuyTraineePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Voucher"
          element={
            <ProtectedRoute>
              <Voucher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Notification"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ExchangeMoney"
          element={
            <ProtectedRoute>
              <ExchangeMoneyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/WithdrawAdmin"
          element={
            <ProtectedRoute>
              <WithdrawPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
