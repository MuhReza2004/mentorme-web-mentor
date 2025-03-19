import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaPlus, FaExclamationCircle, FaEdit } from "react-icons/fa";

const CreateSyllabusContent = () => {
      const Navigate = useNavigate();
  const [meetings, setMeetings] = useState([
    { id: 1, title: "Pertemuan 1", status: "Belum Dibuat" }
  ]);

  const addMeeting = () => {
    if (meetings.length < 4) {
      const newId = meetings.length + 1;
      setMeetings([...meetings, { id: newId, title: `Pertemuan ${newId}`, status: "Belum Dibuat" }]);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Materi Pembelajaran</h2>

        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{meeting.title}</h3>
              <button
               onClick={() => Navigate("/DetailCreateSyllabus")}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-2">
                Isi Silabus
              </button>
            </div>
            <div className="flex items-center text-red-500">
              <FaEdit className="mr-2" />
              <FaExclamationCircle className="mr-2" />
              <span>{meeting.status}</span>
            </div>
          </div>
        ))}

        <button
          onClick={addMeeting}
          disabled={meetings.length >= 4}
          className={`flex items-center px-4 py-2 rounded-lg shadow-md mt-4 ${
            meetings.length >= 4 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white"
          }`}
        >
          <FaPlus className="mr-2" /> Tambah Pertemuan
        </button>
      </div>

      {/* Submit button di pojok kanan bawah */}
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md fixed bottom-6 right-6">
        Submit
      </button>
    </div>
  );
};

export default CreateSyllabusContent;
