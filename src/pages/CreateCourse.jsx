import React, { useState } from 'react';
import { FaArrowLeft, FaListUl, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [price, setPrice] = useState('');
  const [sessions, setSessions] = useState([
    { id: 1, title: "Pertemuan 1", status: "Belum Dibuat" },
    { id: 2, title: "Pertemuan 2", status: "Belum Dibuat" },
    { id: 3, title: "Pertemuan 3", status: "Belum Dibuat" },
    { id: 4, title: "Pertemuan 4", status: "Belum Dibuat" }
  ]);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Name:', projectName);
    console.log('Project Description:', projectDescription);
    console.log('Project Category:', projectCategory);
    console.log('Video File:', videoFile);
    console.log('Price:', price);
    console.log('Sessions:', sessions);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex">
        <SideBar />
        <main className="bg-white p-8 rounded-lg shadow-lg w-full">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-700 mb-4">
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h2 className="text-2xl font-bold mb-6">Create Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="projectName" className="block text-gray-700 font-bold mb-2">Project Name</label>
              <input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
            </div>
            <div className="mb-4">
              <label htmlFor="projectDescription" className="block text-gray-700 font-bold mb-2">Project Description</label>
              <textarea id="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" rows="4" required />
            </div>
            <div className="mb-4">
              <label htmlFor="projectCategory" className="block text-gray-700 font-bold mb-2">Project Category</label>
              <select id="projectCategory" value={projectCategory} onChange={(e) => setProjectCategory(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required>
                <option value="">Select Category</option>
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="videoUpload" className="block text-gray-700 font-bold mb-2">Upload Video</label>
              <input type="file" id="videoUpload" accept="video/*" onChange={handleVideoChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Daftar Pertemuan</h3>
              {sessions.map((session) => (
                <div key={session.id} className="bg-white shadow-md rounded-lg p-4 mb-2 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{session.title}</h4>
                    <button 
                    onClick={() => navigate("/CreateSyllabus")}
                    className="bg-teal-500 text-white px-4 py-2 rounded mt-2">Isi Silabus</button>
                  </div>
                  <div className="text-red-500 flex items-center">
                    <FaListUl className="mr-2" /> <FaPen className="mr-2" /> <span>{session.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Course</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreateCourse;
