import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
      {/* Emoji SVG dengan animasi */}
      <div className="relative animate-bounce-slow">
        <svg
          className="w-56 h-56"
          viewBox="0 0 226 249.135"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="113" cy="113" fill="#FFE585" r="109" />
          <circle cx="68.732" cy="93" fill="#6E6E96" r="9" />
          <circle cx="156.398" cy="93" fill="#6E6E96" r="9" />
          <ellipse
            cx="67.732"
            cy="140.894"
            fill="#FF0000"
            opacity="0.18"
            rx="17.372"
            ry="8.106"
          />
          <ellipse
            cx="154.88"
            cy="140.894"
            fill="#FF0000"
            opacity="0.18"
            rx="17.371"
            ry="8.106"
          />
          <circle
            cx="113"
            cy="113"
            fill="none"
            r="109"
            stroke="#6E6E96"
            strokeWidth="8"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="text-center mt-6">
        <h1 className="text-6xl font-bold text-gray-600 tracking-widest mb-2">
          404
        </h1>
        <p className="text-xl text-gray-500">
          Maaf, halaman yang kamu cari tidak ditemukan.
        </p>
      </div>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-gray-200 text-gray-600 rounded-md hover:shadow-md transition font-mono text-lg"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
