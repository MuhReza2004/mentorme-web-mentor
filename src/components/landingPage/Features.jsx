export default function Features() {
  return (
    <div className="flex  md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16 mt-30">
      <div className="flex flex-row items-center gap-40">
        <div className="relative">
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
            <div className="grid grid-cols-3 gap-1">
              <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
              <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
              <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
              <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
              <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
              <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
              <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
              <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
              <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
            </div>
          </div>
          <img
            alt="Screenshot of 1:1 Consultation feature on a mobile phone production app"
            className="w-40 h-auto"
            height="300"
            src="/Icon/konsultasi.png"
            width="150"
          />
        </div>
        <div className="mt-4 text-center">
          <div className="bg-teal-500 text-white px-4 py-1 rounded-full inline-block mb-2">
            Konsultasi 1:1
          </div>
          <p className="text-gray-700">
            Penjelasan secara ringkas mengenai fitur konsultasi, tentang apa itu
            project marketplace dan apa keuntungannya.
          </p>
        </div>
      </div>
    </div>
  );
}
