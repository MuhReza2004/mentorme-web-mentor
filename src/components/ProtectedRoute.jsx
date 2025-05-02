// Pastikan ToastContainer ada di App.js
// App.js
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Sangat penting

function App() {
  return (
    <>
      {/* Konten aplikasi Anda */}
      <Routes>{/* Route-route Anda */}</Routes>

      {/* ToastContainer harus berada di luar Routes dan di level atas */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

// ProtectedRoute.js dengan perbaikan
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [redirectNow, setRedirectNow] = useState(false);
  const toastIdRef = useRef(null);

  console.log("ProtectedRoute mounted");
  console.log("Current token:", token);
  console.log("Current location:", location.pathname);

  useEffect(() => {
    // Ketika komponen mount, cek token
    if (!token) {
      console.log("No token detected. Will show toast");

      // Buat toast secara langsung tanpa pemeriksaan ref
      toastIdRef.current = toast.warning(
        "Silakan login terlebih dahulu untuk mengakses halaman ini.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId: "protected-route-warning", // Memastikan unik dan tidak duplikat
        }
      );

      console.log("Toast ID:", toastIdRef.current);

      // Delay redirect agar toast terlihat
      const timer = setTimeout(() => {
        console.log("Timer expired, redirecting now");
        setRedirectNow(true);
      }, 2000); // Waktu yang lebih lama

      return () => {
        console.log("Cleaning up timeout");
        clearTimeout(timer);
      };
    }
  }, []); // Dependency array kosong, hanya dijalankan sekali saat mount

  // Tunjukkan halaman loading selama menunggu
  if (!token && !redirectNow) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>Mengarahkan ke halaman login...</p>
        {/* Opsional: tambahkan spinner/loading indicator */}
      </div>
    );
  }

  // Redirect ke halaman login
  if (redirectNow) {
    console.log("Now navigating to /login with state:", { from: location });
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Jika ada token, tampilkan konten asli
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
