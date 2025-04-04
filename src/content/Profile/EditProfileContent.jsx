import React, { useState } from "react";
import { updateMentorProfile } from "../../services/api"; // Pastikan path ini sesuai

const EditProfileContent = () => {
  const [profileImage, setProfileImage] = useState("https://www.w3schools.com/howto/img_avatar.png");
  const [formData, setFormData] = useState({
    namaLengkap: "",
    cv: null,
    ktp: null,
    portofolio: "",
    role: "",
    picture: null,
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validasi file gambar harus PNG
      if (event.target.name === "picture" && file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/jpg") {
        alert("Hanya diperbolehkan mengunggah file PNG untuk foto profil.");
        return;
      }

      setFormData({ ...formData, [event.target.name]: file });

      // Menampilkan gambar yang dipilih
      if (event.target.name === "picture") {
        setProfileImage(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("fullName", formData.namaLengkap);
    data.append("cv", formData.cv);
    data.append("ktp", formData.ktp);
    data.append("portfolio", formData.portofolio);
    data.append("ability", formData.role);
    data.append("picture", formData.picture);

    try {
      const response = await updateMentorProfile(data);
      alert("Profil berhasil diperbarui!");
      console.log(response);
    } catch (error) {
      alert("Gagal memperbarui profil. Coba lagi nanti.");
    }
  };

  return (
    <form className="flex flex-col items-center p-8" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-6">EDIT PROFILE</h1>

      {/* Foto Profile */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <img src={profileImage} alt="Profile" className="w-full h-full rounded-full border border-gray-300 object-cover" />
          <label htmlFor="picture" className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md border border-gray-200 cursor-pointer">
            ✏️
          </label>
          <input id="picture" type="file" name="picture" accept=".png, .jpeg, .jpg" className="hidden" onChange={handleFileChange} />
        </div>
        <p className="mt-2 text-sm font-semibold">FOTO PROFILE</p>
      </div>

      {/* Form Edit Profile */}
      <div className="mt-6 w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama Lengkap*</label>
          <input type="text" name="namaLengkap" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="Masukkan nama lengkap" onChange={handleInputChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">CV*</label>
          <input type="file" name="cv" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" onChange={handleFileChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">KTP*</label>
          <input type="file" name="ktp" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" onChange={handleFileChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Portofolio (Link)*</label>
          <input type="text" name="portofolio" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="Masukkan link portofolio" onChange={handleInputChange} />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Role*</label>
          <input type="text" name="role" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="Masukkan role Anda" onChange={handleInputChange} />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600">Simpan</button>
      </div>
    </form>
  );
};

export default EditProfileContent;
