const benefits = [
  { image: "/images/benefit1.png", title: "harga Terjangkau" },
  { image: "/images/benefit2.png", title: "Project Nyata" },
  { image: "/images/benefit3.png", title: "Relasi Profesional" },
  { image: "/images/benefit4.png", title: "Pengembangan Skill" },
];

const courses = [
  { image: "/images/website.png", title: "Website Development" },
  { image: "/images/uiDesign.png", title: "UI/UX Design" },
  { image: "/images/mobileDeveloper.png", title: "Mobile Development" },
  { image: "/images/businessPlan.png", title: "Business Plan" },
];

export default function Benefit() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      {/* Benefit Section */}
      <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md text-center w-48"
          >
            <img
              src={benefit.image}
              alt={benefit.title}
              className="w-32 h-32 object-contain mx-auto"
            />
            <p className="mt-2 font-semibold">{benefit.title}</p>
          </div>
        ))}
      </div>

      {/* Teks di bawah Benefit */}
      <div className="text-center">
        <p className="mt-15 mb-3  bg-[#379888] text-white text-lg text-center w-[110%] md:w-[60%] rounded-sm">
          Ada banyak pilihan materi yang bisa kamu pelajari!
        </p>
      </div>

      {/* Course Section */}
      <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md text-center w-48"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-32 h-32 object-contain mx-auto"
            />
            <p className="mt-2 font-semibold">{course.title}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="mt-15 mb-3 text-[#379888] font-bold text-lg text-center w-[110%] md:w-[60%] rounded-sm">
          Berbagai Fitur Aplikasi MentorMe!
        </p>
      </div>
    </div>
  );
}
