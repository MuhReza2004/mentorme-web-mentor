import { User } from "lucide-react";

const AboutContent = () => {
  return (
    <div className="px-4 py-10 md:px-20 lg:px-40 bg-white text-gray-800">
      {/* Section: Apa itu MentorMe */}
      <div className="flex flex-row items-center justify-between gap-10 mb-16">
        {/* Gambar di kiri */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src="/AssetsLandingPage/icon-14.png"
            alt="Mentor Illustration"
            className="w-40 md:w-60"
          />
        </div>

        {/* Teks di kanan */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl md:text-2xl font-bold text-teal-600 mb-4">
            Apa itu MentorMe?
          </h2>
          <p className="text-sm md:text-base text-gray-600 text-justify">
            MentoMe adalah platform edukasi yang menghubungkan mahasiswa dan
            pelajar dengan mentor melalui sesi konsultasi 1:1 dan pembelajaran
            berbasis proyek nyata. Dengan pendekatan praktis dan personal,
            MentorMe hadir untuk membantu kamu mengembangkan skill, membangun
            portofolio, serta mendapatkan arahan langsung dari orang-orang yang
            berpengalaman di bidangnya.
          </p>
        </div>
      </div>

      {/* Section: Sejarah MentorMe */}
      <div className="text-center mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-emerald-500 mb-2">
          Sejarah MentorMe
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600">
          Semua berawal dari sebuah kamar kos sederhana. Sang founder terpikir,
          "Gimana kalau ada platform yang bisa mempertemukan mahasiswa dengan
          mentor? Mahasiswa bisa belajar langsung dari ahlinya, dan di sisi
          lain, siapa pun—termasuk mahasiswa—juga bisa menjadi mentor dan
          menambah penghasilan." Dari pemikiran itulah, MentorMe lahir—sebuah
          aplikasi yang menjembatani kebutuhan belajar dan berbagi ilmu, dengan
          cara yang praktis, kolaboratif, dan berdampak nyata.
          <br />
          <br />
          Kemudian akhirnya founder membayangkan untuk membuat aplikasi
          MentorMe, tercetusnya ide yang tidak hanya berguna untuk founder tapi
          untuk orang lain di luar sana.
        </p>
      </div>

      {/* Section: Kenalan Yuk! */}
      <div className="text-center mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-teal-500 mb-4">
          Kenalan, Yuk!
        </h2>
        <p className="text-gray-600 mb-8">
          Kenalan dulu sama Founder keren dari MentorMe!
        </p>

        <div className="flex flex-col items-center gap-10 max-w-5xl mx-auto">
          {/* Baris atas: 1 orang di tengah */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center text-center">
              <img
                src="/AssetsLandingPage/zidan.JPG"
                alt="Zidan BSA"
                className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full shadow mb-2"
              />
              <p className="font-semibold text-sm">Zidan BSA</p>
              <p className="text-xs text-gray-500">
                Mobile Developer, MentorMe
              </p>
            </div>
          </div>

          {/* Baris bawah: 2x2 grid responsif */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {[
              {
                name: "Muh. Reza",
                role: "Full-stack Developer, MentorMe",
                img: "/Mentor/reza-2.webp",
              },
              {
                name: "Indira Renata Pangrean",
                role: "Data Analytics & Human Resource, MentorMe",
                img: "/Mentor/renata.webp",
              },
              {
                name: "Idama Wahda Nur",
                role: "Financial, MentorMe",
                img: "/Mentor/idama.webp",
              },
              {
                name: "Nahwa",
                role: "Digital Marketing, MentorMe",
                img: null, // Tidak ada gambar
              },
            ].map((person, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                {person.img ? (
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full shadow mb-2"
                  />
                ) : (
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full shadow mb-2 bg-gray-100 text-gray-400">
                    <User className="w-10 h-10" />
                  </div>
                )}
                <p className="font-semibold text-sm">{person.name}</p>
                <p className="text-xs text-gray-500">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section: CTA */}
      {/* Section: CTA */}
      <div className="text-center mt-16">
        <h3 className="text-lg md:text-xl font-bold text-emerald-500 mb-2">
          Ingin menjadi bagian dari MentorMe?
        </h3>
        <p className="mb-4">Download Aplikasinya Sekarang!</p>
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <a
            href="https://play.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/AssetsLandingPage/download-play-store.png"
              alt="Google Play"
              className="w-32 h-10 object-contain"
            />
          </a>
          <a
            href="https://apps.apple.com/" // ganti dengan link App Store asli
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/AssetsLandingPage/download-appstore.png"
              alt="App Store"
              className="w-32 h-10 object-contain"
            />
          </a>
        </div>

        <p className="text-base text-black">
          <span className="text-teal-600 font-bold">MentorMe</span>, Find your
          Mentor Unlock your Potential!
        </p>
      </div>
    </div>
  );
};

export default AboutContent;
