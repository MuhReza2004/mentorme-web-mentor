const FeaturesContent = () => {
  return (
    <div className="px-4 py-12 md:px-20 lg:px-40 bg-white text-gray-800 space-y-16">
      {/* Fitur Aplikasi MentorMe */}
      <div className="text-center space-y-12">
        <h2 className="text-xl md:text-2xl font-bold text-teal-600">
          Fitur Aplikasi MentorMe
        </h2>

        {/* Project Marketplace */}
        <div className="flex flex-row items-center gap-6 md:gap-12 text-left">
          <img
            src="/Icon/konsultasi.png"
            alt="Project Marketplace"
            className="w-64 md:w-72"
          />
          <div>
            <h3 className="text-lg font-semibold bg-teal-600 text-white p-2 rounded-full w-fit">
              Konsultasi 1:1
            </h3>
            <p className="text-sm text-gray-700 mt-2 max-w-md">
              Butuh arahan langsung? Konsultasi bareng mentor secara pribadi
              buat nanya apapun mulai dari persiapan karir, tugas, sampai
              pengembangan diri.
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
            <h3 className="text-lg font-semibold bg-teal-600 text-white p-2 rounded-full w-fit">
              Project Marketplace
            </h3>
            <p className="text-sm text-gray-700 mt-2 max-w-md">
              Belajar sambil praktek! Di sini kamu bisa beli project nyata
              sambil kursus, cocok banget buat ningkatin skill dan nambah ini
              portofolio kamu.
            </p>
          </div>
        </div>
      </div>

      {/* Kenapa Harus MentorMe */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <img
            src="/AssetsLandingPage/icon-15.png"
            alt="Orang berpikir"
            className="w-40 h-40"
          />
          <h2 className="text-xl md:text-2xl font-bold text-emerald-600 text-center">
            Kenapa harus MentorMe?
          </h2>
          <img
            src="/AssetsLandingPage/icon-1.png"
            alt="Orang semangat"
            className="w-40 h-40"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
          {[
            "Harga Terjangkau",
            "Project Nyata",
            "Relasi Profesional",
            "Pengembangan Skill",
          ].map((label, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={`/AssetsLandingPage/benefit/benefit-${index + 1}.png`}
                alt={label}
                className="w-20 md:w-24"
              />
              <p className="mt-2 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Download */}
      <div className="text-center">
        <h3 className="text-lg md:text-xl font-bold mb-2">
          Download Aplikasinya Sekarang!
        </h3>

        {/* Komentar sementara store buttons */}
        {/*
        <div className="flex justify-center gap-4 mt-4 mb-6 flex-wrap">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/AssetsLandingPage/download-play-store.png"
              alt="Get it on Google Play"
              className="w-36 h-12 object-contain"
            />
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/AssetsLandingPage/download-appstore.png"
              alt="Download on the App Store"
              className="w-36 h-12 object-contain"
            />
          </a>
        </div>
        */}

        <div className="mt-6">
          <a
            href="https://drive.google.com/file/d/1eDr63qPavXif2mqSnS1rtailBRj2y5Br/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300"
          >
            🚀 Unduh Aplikasi Sekarang (via Google Drive)
          </a>
        </div>
      </div>

      {/* FAQ (Accordion Dummy) */}
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-emerald-600 mb-6">
          Paling sering ditanyakan!
        </h2>
        <div className="space-y-4 max-w-2xl mx-auto text-left">
          {[
            {
              question: "Apa itu MentorMe?",
              answer:
                "MentorMe adalah platform yang menghubungkan mahasiswa dan mentor untuk mentoring 1:1 dan pembelajaran berbasis proyek nyata.",
            },
            {
              question: "Siapa saja yang bisa menggunakan MentorMe?",
              answer:
                " Mahasiswa, pelajar, atau siapa saja yang ingin mengembangkan skill dan mendapatkan bimbingan dari mentor",
            },
            {
              question: "Apa itu fitur Project Marketplace?",
              answer:
                "Fitur ini memungkinkan kamu membeli proyek nyata layaknya kursus. Kamu bisa belajar dari studi kasus langsung yang didampingi oleh mentor dan menambah portofolio.",
            },
            {
              question: "Bagaimana cara melakukan konsultasi 1:1?",
              answer:
                "Kamu bisa booking sesi dengan mentor, menentukan topik yang ingin dibahas, lalu berkonsultasi secara langsung melalui aplikasi.",
            },
            {
              question: "Apakah saya bisa menjadi mentor juga?",
              answer:
                " Bisa banget! Kami membuka kesempatan bagi profesional dan ahli di bidang tertentu untuk bergabung sebagai mentor di MentorMe! Semua proyek yang kamu kerjakan bisa kamu pakai sebagai bagian dari portofolio profesional.",
            },
            {
              question: "Bagaimana cara melakukan konsultasi 1:1?",
              answer:
                "Cukup download aplikasinya, daftar akun untuk menjadi trainee! Jika ingin menjadi Mentor silahkan daftarkan diri di website MentorMe!",
            },
          ].map((item, index) => (
            <details
              key={index}
              className="bg-gray-50 rounded-md shadow p-4 cursor-pointer"
            >
              <summary className="font-semibold text-sm md:text-base">
                {item.question}
              </summary>
              <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesContent;
