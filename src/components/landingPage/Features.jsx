export default function Features() {
  return (
    <div className="text-center space-y-12 w-full px-4 py-16 md:py-24 bg-gray-50">
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
            Penjelasan secara ringkas mengenai fitur konsultasi, tentang apa itu
            konsultasi dan apa keuntungannya.
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
  );
}
