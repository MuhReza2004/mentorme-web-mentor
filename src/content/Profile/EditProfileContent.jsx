import React, { useEffect, useState } from "react";
import { updateMentorProfile, getProfile } from "../../services/api";
import { Edit, Save, Upload, Check, X } from "lucide-react";

const EditProfileContent = () => {
  const [profileImage, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // State untuk menyimpan data profile asli dari server
  const [originalData, setOriginalData] = useState({
    namaLengkap: "",
    email: "",
    cv: "",
    ktp: "",
    portofolio: "",
    about: "",
    picture: "",
  });

  // State untuk menyimpan data form yang diedit
  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    cv: "",
    ktp: "",
    portofolio: "",
    about: "",
    picture: "",
  });

  // State untuk menyimpan file yang diupload
  const [fileUploads, setFileUploads] = useState({
    picture: null,
    cv: null,
    ktp: null,
  });

  // Fungsi untuk memuat data profile
  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await getProfile();
      if (response) {
        const profileData = {
          namaLengkap: response.data.fullName || "",
          email: response.data.email || "",
          cv: response.data.cv || "",
          ktp: response.data.ktp || "",
          portofolio: response.data.linkPortfolio || "",
          about: response.data.about || "",
          picture: response.data.picture || "",
        };

        // Simpan data asli untuk membandingkan perubahan nanti
        setOriginalData(profileData);
        // Gunakan data yang sama untuk form
        setFormData(profileData);

        // Set profile image jika ada
        if (response.data.picture) {
          setProfileImage(response.data.picture);
        }
      }
    } catch (error) {
      console.error("Gagal memuat profil:", error);
      setErrorMessage("Gagal memuat data profil");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  // Handler untuk perubahan field text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler untuk perubahan file
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFileUploads((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      // Create preview for profile picture
      if (name === "picture") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    }
  };

  // Fungsi untuk mengidentifikasi field yang berubah
  const getChangedFields = () => {
    const changedTextFields = {};

    // Periksa field text yang berubah
    if (formData.namaLengkap !== originalData.namaLengkap) {
      changedTextFields.fullName = formData.namaLengkap;
    }

    if (formData.about !== originalData.about) {
      changedTextFields.about = formData.about;
    }

    if (formData.portofolio !== originalData.portofolio) {
      changedTextFields.linkPortfolio = formData.portofolio;
    }

    return changedTextFields;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formDataToSend = new FormData();
      const changedFields = getChangedFields();

      // Append text fields yang berubah saja
      Object.entries(changedFields).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append files jika ada yang diupload
      if (fileUploads.picture) {
        formDataToSend.append("picture", fileUploads.picture);
      }

      if (fileUploads.cv) {
        formDataToSend.append("cv", fileUploads.cv);
      }

      if (fileUploads.ktp) {
        formDataToSend.append("ktp", fileUploads.ktp);
      }

      // Cek apakah ada perubahan (text atau file)
      const hasChanges =
        Object.keys(changedFields).length > 0 ||
        fileUploads.picture ||
        fileUploads.cv ||
        fileUploads.ktp;

      // Hanya kirim request jika ada perubahan
      if (hasChanges) {
        const response = await updateMentorProfile(formDataToSend);
        setSuccessMessage("Profil berhasil diperbarui!");
        loadProfileData(); // Reload data untuk mendapatkan data terbaru
      } else {
        setSuccessMessage("Tidak ada perubahan yang dilakukan");
      }

      setIsEditing(false);

      // Reset file uploads
      setFileUploads({
        picture: null,
        cv: null,
        ktp: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      setErrorMessage("Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  // Fungsi untuk membatalkan perubahan
  const handleCancel = () => {
    // Kembalikan formData ke nilai asli
    setFormData({ ...originalData });
    // Reset file uploads
    setFileUploads({
      picture: null,
      cv: null,
      ktp: null,
    });
    setImagePreview(null);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto my-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Profil </h1>
        <button
          onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isEditing
              ? "bg-gray-200 text-gray-700"
              : "bg-green-600 text-white hover:bg-green-700"
          } transition-colors duration-300`}
        >
          {isEditing ? (
            <>
              <X size={18} /> Batal
            </>
          ) : (
            <>
              <Edit size={18} /> Edit Profil
            </>
          )}
        </button>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
          <Check size={20} className="mr-2" />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <X size={20} className="mr-2" />
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={imagePreview || profileImage || "/default-profile.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow-md"
            />
            {isEditing && (
              <label
                htmlFor="picture"
                className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors duration-300"
              >
                <Upload size={18} />
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {formData.namaLengkap}
          </h2>
          <p className="text-gray-600">{formData.email}</p>
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tentang Saya
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Portofolio
                </label>
                <input
                  type="url"
                  name="portofolio"
                  value={formData.portofolio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload CV
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="cv"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg cursor-pointer hover:bg-gray-300 flex items-center gap-2 transition-colors duration-300"
                    >
                      <Upload size={18} />
                      {fileUploads.cv ? fileUploads.cv.name : "Pilih File CV"}
                    </label>
                    {formData.cv && !fileUploads.cv && (
                      <span className="text-sm text-gray-600">
                        CV saat ini tersedia
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload KTP
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id="ktp"
                      name="ktp"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="ktp"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg cursor-pointer hover:bg-gray-300 flex items-center gap-2 transition-colors duration-300"
                    >
                      <Upload size={18} />
                      {fileUploads.ktp
                        ? fileUploads.ktp.name
                        : "Pilih File KTP"}
                    </label>
                    {formData.ktp && !fileUploads.ktp && (
                      <span className="text-sm text-gray-600">
                        KTP saat ini tersedia
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors duration-300 disabled:bg-green-400"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Tentang Saya
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {formData.about || "Belum ada informasi"}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Informasi Lainnya
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Portofolio
                    </h4>
                    {formData.portofolio ? (
                      <a
                        href={formData.portofolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {formData.portofolio}
                      </a>
                    ) : (
                      <p className="text-gray-700">Belum ada informasi</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {formData.cv && (
                      <a
                        href={formData.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2 hover:bg-green-200 transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Lihat CV
                      </a>
                    )}

                    {formData.ktp && (
                      <a
                        href={formData.ktp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2 hover:bg-green-200 transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <circle cx="9" cy="10" r="2" />
                          <path d="M15 8h2" />
                          <path d="M15 12h2" />
                          <path d="M7 16h10" />
                        </svg>
                        Lihat KTP
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfileContent;
