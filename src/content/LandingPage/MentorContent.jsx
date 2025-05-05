import { Hammer } from "lucide-react";

const MentorContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <Hammer size={80} className="text-teal-600 mb-6 animate-bounce" />
      <h1 className="text-2xl md:text-3xl font-bold text-teal-600 mb-4">
        Halaman Sedang Dalam Pengembangan
      </h1>
      <p className="text-gray-700 text-center max-w-md">
        Kami sedang menyiapkan sesuatu yang spesial. Silakan kembali lagi nanti!
      </p>
    </div>
  );
};

export default MentorContent;
