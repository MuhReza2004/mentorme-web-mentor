export default function Features() {
  return (
    <div className="text-center space-y-12 w-full px-4 py-16 md:py-24 bg-gray-50">
      <h2 className="text-xl md:text-2xl font-bold text-teal-600">
        Fitur Aplikasi MentorMe
      </h2>

      {/* Silabus Belajar */}
      <div className="flex flex-row-reverse items-center gap-6 md:gap-12 text-left">
        <img
          src="/AssetsLandingPage/silabus-1.png"
          alt="Konsultasi 1:1"
          className="w-64 md:w-72"
        />
        <div>
          <h3 className="text-lg font-semibold bg-teal-600 text-white p-2 rounded-full -md w-50 flex items-center justify-center">
            Silabus Belajar
          </h3>
          <p className="text-sm text-gray-700 mt-2 max-w-md">
            Belajar jadi lebih terarah! Silabus belajar yang sudah disusun
            mentor siap membantumu belajar dengan lebih terstruktur dan efisien.
          </p>
        </div>
      </div>
      {/* Project Marketplace */}
      <div className="flex flex-row items-center gap-6 md:gap-12 text-left">
        <img
          src="/Icon/konsultasi.png"
          alt="Project Marketplace"
          className="w-64 md:w-72"
        />
        <div>
          <h3 className="text-lg font-semibold bg-teal-600 text-white p-2 rounded-full -md w-50 flex items-center justify-center">
            Konsultasi 1:1
          </h3>
          <p className="text-sm text-gray-700 mt-2 max-w-md">
            Butuh arahan langsung? Konsultasi bareng mentor secara pribadi buat
            nanya apapun mulai dari persiapan karir, tugas, sampai pengembangan
            diri.
          </p>
        </div>
      </div>

      {/* Konsultasi 1:1 */}
      <div className="flex flex-row-reverse items-center gap-6 md:gap-12 text-left">
        <img
          src="/Icon/marketplace.png"
          alt="Konsultasi 1:1"
          className="w-64 md:w-72"
        />
        <div>
          <h3 className="text-lg font-semibold bg-teal-600 text-white p-2 rounded-full -md w-50 flex items-center justify-center">
            Project Marketplace
          </h3>
          <p className="text-sm text-gray-700 mt-2 max-w-md">
            Belajar sambil praktek! Di sini kamu bisa beli project nyata sambil
            kursus, cocok banget buat ningkatin skill dan nambah ini portofolio
            kamu.
          </p>
        </div>
      </div>
    </div>
  );
}
