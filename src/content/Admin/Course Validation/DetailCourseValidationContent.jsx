const DetailCourseValidationContent = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Judul dan Harga */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Validation Mentor Course</h1>
          <span className="text-lg font-semibold">Harga Project: Rp.150.000</span>
        </div>

        {/* Mentor Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Mentor"
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <p className="text-xl font-semibold">Aria Santoso</p>
            <p className="text-gray-600">HTML (Hypertext Markup Language) adalah bahasa markup...</p>
          </div>
        </div>

        {/* Video Pengantar */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Video Pengantar</h2>
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">[Video Placeholder]</span>
          </div>
        </div>

        {/* Profil Mentor */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Profil Mentor</h2>
          <p className="text-gray-700">
            Aria Santoso adalah mahasiswa tingkat akhir jurusan Teknik Informatika...
          </p>
        </div>

        {/* Role Mentor */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Role Mentor</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Web Developer</li>
            <li>Fotografer</li>
            <li>Editor</li>
          </ul>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded-lg">Batal</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Tolak</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Terima</button>
        </div>
      </div>
    </div>
  );
};

export default DetailCourseValidationContent;
