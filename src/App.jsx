import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
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
import CourseValidation from "./pages/AdminPages/CourseValidationPages/CourseValidation";
import DashboardAdmin from "./pages/AdminPages/DashboardPages/DashboardAdminPages";
import DetailMentorRequest from "./pages/AdminPages/DashboardPages/DetailMentorRequestPages";
import DetailCourseValidation from "./pages/AdminPages/CourseValidationPages/DetailCourseValidationPages";
import EditProfile from "./pages/ProfilePages/EditProfile";
import Exchange from "./pages/ProfilePages/Exchange";
import DetailExchange from "./pages/ProfilePages/DetailExchange";
import Bantuan from "./pages/BantuanPages/BantuanPages";
import CreateCategory from "./pages/AdminPages/CreateCategoryPages/CreateCategoryPages";
import CreateLearningPath from "./pages/AdminPages/CreateLearningPathPages/CreateLearningPathPages";
import CreateNotification from "./pages/AdminPages/CreateNotificationPages/CreateNotification";
import Voucher from "./pages/AdminPages/VoucherPages/VoucherPages";
import NotificationPage from "./pages/Notification/NotificationPage";
import ExchangeMoneyPage from "./pages/Exchange/ExchangeMoney/ExchangeMoneyPage";
import TraineeProgress from "./pages/DashboardPages/TraineeProgress";
import LoginPage from "./pages/Login";
import AboutPages from "./pages/LandingPages/AboutPages";
import FeaturesPage from "./pages/LandingPages/FeaturesPage";
import MentorPage from "./pages/LandingPages/MentorsPages";

function App() {
  return (
    <Router>
      {/* <SideBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mentors" element={<MentorPage />} />
        <Route path="/MyCourse" element={<MyCourse />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route path="/ProgressTrainee" element={<ProgressTrainee />} />
        <Route
          path="/TraineeActivity/:IDActivity"
          element={<TraineeActivity />}
        />
        <Route path="/TraineeProgress/:id" element={<TraineeProgress />} />
        <Route path="/CreateSyllabus/:courseId" element={<CreateSyllabus />} />
        <Route path="ChatMentor" element={<ChatMentor />} />
        <Route path="/DetailMyCourse/:id" element={<DetailMyCourse />} />
        <Route path="/DetailSyllabus/:id" element={<DetailSyllabus />} />
        <Route
          path="/MateriPembelajaran/:id"
          element={<MateriPembelajaran />}
        />
        <Route
          path="/DetailCreateSyllabus"
          element={<DetailCreateSyllabus />}
        />
        <Route
          path="/DetailActivityTrainee/:activityId"
          element={<DetailActivityTrainee />}
        />
        <Route path="/CourseValidation" element={<CourseValidation />} />
        <Route path="/About" element={<AboutPages />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/Exchange" element={<Exchange />} />
        <Route path="/Bantuan" element={<Bantuan />} />
        <Route path="/CreateNotification" element={<CreateNotification />} />
        <Route path="/CreateLearningPath" element={<CreateLearningPath />} />
        <Route path="/CreateCategory" element={<CreateCategory />} />
        <Route path="/DetailExchange" element={<DetailExchange />} />
        <Route path="/Voucher" element={<Voucher />} />
        <Route
          path="/DetailMentorRequest/:ID"
          element={<DetailMentorRequest />}
        />
        <Route
          path="/DetailCourseValidation/:id"
          element={<DetailCourseValidation />}
        />
        <Route path="/Notification" element={<NotificationPage />} />
        <Route path="/Notification" element={<NotificationPage />} />
        <Route path="/ExchangeMoney" element={<ExchangeMoneyPage />} />

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
