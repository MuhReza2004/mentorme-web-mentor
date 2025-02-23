const Footer = () => {
  return (
    <footer className="bg-[#379888] text-white py-8 mt-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-4 md:grid-cols-4 gap-8 text-center md:text-left">
        <div className="flex flex-col justifty-start items-start md:items-start">
          <img
            src="/src/assets/Icon/Maskot.png"
            alt="MentorMe Logo"
            className="w-16 mb-2 "
          />
          <p className="text-sm text-start">
            Platform mentoring yang menghubungkan mentor profesional dengan
            trainee
          </p>
        </div>
        <div className="ml-10">
          <h2 className="text-lg font-semibold text-start">Tautan</h2>
          <ul className="mt-2 space-y-2 text-start">
            <li>
              <a href="#" className="hover:underline">
                Beranda
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Mentor
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Fitur
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Tentang
              </a>
            </li>
          </ul>
        </div>
        <div className="text-start">
          <h2 className="text-lg font-semibold">Hubungi Kami</h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li>Email: mentormeid1@gmail.com</li>
            <li>Phone: +62 851-8306-0349</li>
            <li>Alamat: Jl. Veteran, Makassar</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Ikuti Kami</h2>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a
              href="https://www.instagram.com/mentorme_id/"
              className="text-white text-2xl hover:text-gray-200"
            >
              <img
                src="/src/assets/Logo/instagram.png"
                alt="instagram logo"
                className="w-full h-[40px]"
              />
            </a>
            <a
              href="https://www.tiktok.com/@mentorme_id"
              className="text-white text-2xl hover:text-gray-200"
            >
              <img
                src="/src/assets/Logo/tiktok.png"
                alt="instagram logo"
                className="w-full h-[40px]"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-white opacity-50 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} MentorMe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
