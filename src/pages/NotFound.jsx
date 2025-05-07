import { Link } from "react-router-dom";
import Navbar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="max-w-xl mx-auto">
          {/* 404 Image */}
          <div className="mb-8 animate-bounce">
            <img
              src="/AssetsLandingPage/404.png"
              alt="404 Not Found"
              className="w-64 md:w-80 mx-auto"
            />
          </div>

          {/* Error Message - Modified for proper alignment */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            <h1 className="text-4xl font-bold text-[#379888]">404!</h1>
            <div className="w-px h-10 bg-gray-300 hidden md:block"></div>
            <p className="text-xl md:text-2xl font-medium text-gray-700">
              Maaf, Halaman Tidak Ditemukan!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
