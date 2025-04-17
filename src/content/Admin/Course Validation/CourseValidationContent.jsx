import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListProjectPendingByAdmin,
  ListProjectAcceptedByAdmin,
  ListProjectRejectedByAdmin,
} from "../../../services/api";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

// Fungsi cache TTL
const setCache = (key, data, ttl = 5 * 60 * 1000) => {
  const cacheItem = {
    value: data,
    expiry: Date.now() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(cacheItem));
};

const getCache = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  if (Date.now() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};

// Fungsi resize gambar
const resizeBase64Image = (base64Str, width, height) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = `data:image/png;base64,${base64Str}`;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL().replace("data:image/png;base64,", ""));
    };
  });
};

const CourseValidationContent = () => {
  const [selectedFilter, setSelectedFilter] = useState("Permintaan");
  const [rawCourses, setRawCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cacheKey = `courseData-${selectedFilter}`;
      const cached = getCache(cacheKey);

      if (cached) {
        setRawCourses(cached);
        setLoading(false);
        return;
      }

      try {
        let data = [];
        if (selectedFilter === "Permintaan") {
          data = await ListProjectPendingByAdmin();
        } else if (selectedFilter === "Diterima") {
          data = await ListProjectAcceptedByAdmin();
        } else if (selectedFilter === "Ditolak") {
          data = await ListProjectRejectedByAdmin();
        }

        const coursesData = data?.data || [];
        setRawCourses(coursesData);
        setCache(cacheKey, coursesData); // Simpan ke cache
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedFilter]);

  // Resize gambar
  useEffect(() => {
    const processImages = async () => {
      const resized = await Promise.all(
        rawCourses.map(async (course) => {
          if (!course.picture) return course;
          const resizedImage = await resizeBase64Image(course.picture, 96, 96);
          return { ...course, picture: resizedImage };
        })
      );
      setCourses(resized);
    };

    if (rawCourses.length > 0) {
      processImages();
    } else {
      setCourses([]);
    }
  }, [rawCourses]);

  const handleDetailClick = (ID) => {
    navigate(`/DetailCourseValidation/${ID}`);
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Validation Mentor Course</h1>

      <div className="flex space-x-2 mb-6">
        {["Permintaan", "Diterima", "Ditolak"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full ${
              selectedFilter === filter
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner size="10" color="gray-900" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-2 w-48 h-60 flex flex-col items-center text-center border"
              >
                <img
                  src={`data:image/png;base64,${course.picture}`}
                  alt="Course"
                  className="w-24 h-24 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold">{course.mentor}</h2>
                <p className="text-gray-700">Course: {course.materialName}</p>
                <p
                  className={`font-semibold ${
                    selectedFilter === "Diterima"
                      ? "text-green-500"
                      : selectedFilter === "Ditolak"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {selectedFilter}
                </p>

                {selectedFilter === "Permintaan" && (
                  <button
                    className="text-blue-600 mt-2 font-medium"
                    onClick={() => handleDetailClick(course.ID)}
                  >
                    Lihat Detail &gt;
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseValidationContent;
