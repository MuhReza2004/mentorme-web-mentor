import { useState } from "react";

const CourseValidationContent = () => {
  const [selectedFilter, setSelectedFilter] = useState("Permintaan");
  
  const courses = [
    {
      name: "Jerome Polan",
      course: "Pemrograman Web",
      status: "Menunggu Konfirmasi",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jerome Polan",
      course: "Pemrograman Web",
      status: "Menunggu Konfirmasi",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jerome Polan",
      course: "Pemrograman Web",
      status: "Menunggu Konfirmasi",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jerome Polan",
      course: "Pemrograman Web",
      status: "Menunggu Konfirmasi",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jerome Polan",
      course: "Pemrograman Web",
      status: "Menunggu Konfirmasi",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
   <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Validation Mentor Course</h1>
      
      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        {['Permintaan', 'Diterima', 'Ditolak'].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full ${selectedFilter === filter ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* Course Cards Grid */}
      <div className="flex flex-wrap  gap-4">
        {courses.map((course, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center border">
            <img src={course.image} alt="Course" className="w-32 h-32 object-cover rounded-lg mb-4" />
            <h2 className="text-lg font-semibold">{course.name}</h2>
            <p className="text-gray-700">Course: {course.course}</p>
            <p className="text-red-500 font-semibold">{course.status}</p>
            <button className="text-blue-600 mt-2 font-medium">Lihat Detail &gt;</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseValidationContent;
