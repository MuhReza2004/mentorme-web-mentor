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
            <h3 className="text-lg font-semibold bg-teal-600 text-white p-2 rounded-full -md w-50">
              Konsultasi 1:1
            </h3>
            <p className="text-sm text-gray-700 mt-2 max-w-md">
              Penjelasan secara ringkas mengenai fitur konsultasi, tentang apa
              itu konsultasi dan apa keuntungannya.
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
            <h3 className="text-lg font-semibold bg-teal-600 text-white p-2 rounded-full -md w-50">
              Project Marketplace
            </h3>
            <p className="text-sm text-gray-700 mt-2 max-w-md">
              Penjelasan secara ringkas mengenai fitur project marketplace,
              tentang apa itu project marketplace dan apa keuntungannya.
            </p>
          </div>
        </div>
      </div>

      {/* Kenapa Harus MentorMe */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Gambar kiri */}
          <img
            src="/AssetsLandingPage/icon-15.png"
            alt="Orang berpikir"
            className="w-40 h-40"
          />

          {/* Judul */}
          <h2 className="text-xl md:text-2xl font-bold text-emerald-600 text-center">
            Kenapa harus MentorMe?
          </h2>

          {/* Gambar kanan */}
          <img
            src="/AssetsLandingPage/icon-1.png"
            alt="Orang semangat"
            className="w-40 h-40"
          />
        </div>

        <div className="grid grid-cols-4 gap-4 justify-items-center">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex flex-col items-center text-center">
              <img
                src={`/AssetsLandingPage/benefit/benefit-${num}.png`}
                alt={`Benefit ${num}`}
                className="w-20 md:w-24"
              />
              <p className="mt-2 text-sm font-medium">Benefit {num}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Download */}
      <div className="text-center">
        <h3 className="text-lg md:text-xl font-bold mb-2">
          Download Aplikasinya Sekarang!
        </h3>
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
      </div>

      {/* FAQ (Accordion Dummy) */}
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-emerald-600 mb-6">
          Paling sering ditanyakan!
        </h2>
        <div className="space-y-4 max-w-2xl mx-auto text-left">
          {[
            {
              question: "Apa itu React?",
              answer: "React adalah library JavaScript untuk membangun UI.",
            },
            {
              question: "Apa itu Vite?",
              answer:
                "Vite adalah build tool yang cepat untuk pengembangan frontend.",
            },
            {
              question: "Apa itu Tailwind CSS?",
              answer:
                "Tailwind CSS adalah framework CSS utilitas untuk membangun desain responsif.",
            },
            {
              question: "Bagaimana cara menggunakan Vite?",
              answer:
                "Vite dapat digunakan dengan mudah melalui CLI atau integrasi dengan berbagai framework.",
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
