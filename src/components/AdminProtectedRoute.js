import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    // Jika tidak ada token, redirect ke login
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    // Jika bukan admin, redirect ke halaman mentor atau home
    return <Navigate to="/dashboard" />;
  }

  return children;
};

// ✅ Validasi PropTypes
AdminProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminProtectedRoute;
