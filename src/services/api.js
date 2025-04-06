import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Fungsi umum untuk menangani error
const handleApiError = (error) => {
  if (error.response) {
    console.error("Server Error:", error.response.data);
    throw new Error(error.response.data.message || "Server error");
  } else if (error.request) {
    console.error("No Response from Server:", error.request);
    throw new Error("No response from server. Please try again.");
  } else {
    console.error("Request Error:", error.message);
    throw new Error(error.message);
  }
};

// 🔹 Helper untuk mendapatkan token dari localStorage
const getAuthToken = () => {
  return localStorage.getItem("token"); // Ambil token dari localStorage
};

// 🔹 1. Registrasi Mentor
export const registerMentor = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/registration/mentor`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 2. Login Mentor
export const loginMentor = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/login/user`, formData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Simpan token ke localStorage
      localStorage.setItem("role", response.data.role.role); // Simpan token ke localStorage
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 3. Mendapatkan Aktivitas Mentor (Butuh Token)
export const getActivityMentor = async (mentorId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_URL}/api/activity/mentor/${mentorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Tambahkan token ke header Authorization
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCourseMentor = async () => {
  try {
    const token = getAuthToken();
    if (!token)
      throw new Error("Token tidak ditemukan. Silakan login kembali.");

    const response = await axios.get(`${API_URL}/api/project/all/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 Membuat Project Baru (Butuh Token)
export const createCourseMentor = async (formData) => {
  try {
    const token = getAuthToken();
    if (!token)
      throw new Error("Token tidak ditemukan. Silakan login kembali.");

    const response = await axios.post(`${API_URL}/api/project/new`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Menampilkan Data Mentor yang sudah di Acc

export const getAccpetedMentor = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login kembali.");
    }

    const response = await axios.get(`${API_URL}/api/project/accepted`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Menampilkan data mentor yang masih pending

export const getPendingMentor = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login kembali.");
    }

    const response = await axios.get(`${API_URL}/api/pending/mentor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Menampilkan data course yang ditolak

export const getRejectedMentor = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login kembali.");
    }

    const response = await axios.get(`${API_URL}/api/reject/mentor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const GetBuyProject = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_URL}/api/project/buy`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ============================================
// ✅ REPORT FEATURE SECTION
// ============================================
// Get Activity Trainee For Report
export const GetDetailActivityTrainee = async (activityId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_URL}/api/activity/${activityId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Tambahkan token ke header Authorization
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 Report Content Activity By Mentor
export const reportActivityByMentor = async (IDActivity, formData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await axios.put(`${API_URL}/api/report/${IDActivity}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ============================================
// ✅ PROJECT FEATURE SECTION
// ============================================

// 🔹 List Project Pending By Admin
export const ListProjectPendingByAdmin = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_URL}/api/project/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 Detail Project Pending By Admin
export const DetailProjectPendingByAdmin = async (projectId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_URL}/api/project/pending/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 List Project Accepted By Admin
export const ListProjectAcceptedByAdmin = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_URL}/api/project/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 Detail Project Accepted By Admin
export const DetailProjectAcceptedByAdmin = async (projectId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_URL}/api/project/all/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 List Project Rejected By Admin
export const ListProjectRejectedByAdmin = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_URL}/api/project/reject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 Detail Project Rejected By Admin
export const DetailProjectRejectedByAdmin = async (projectId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_URL}/api/project/reject/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ============================================
// ✅ LIST MENTOR FEATURE SECTION
// ============================================
// 🔹 List Mentor Rejected By Admin
export const ListMentorRejectedByAdmin = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_URL}/api/user/reject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 List Mentor Pending By Admin
export const ListMentorPendingByAdmin = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_URL}/api/mentor/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ============================================
// ✅ CHAT FEATURE SECTION
// ============================================

// 🔹 Get History Chat
export const GetHistoryChat = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_URL}/api/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 3. Memulai Chat Pertama Kali
export const StartChat = async (formData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. SIlahkan login terlebih dahulu.");
    }
    const response = await axios.post(`${API_URL}/api/chat`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
    
// // 🔹 Accept Mentor PUT
// export const acceptMentor = async (email, reason = null) => {
//   try {
//     const token = getAuthToken();
//     if (!token) {
//       throw new Error("Token tidak ditemukan. Silakan login kembali.");
//     }

//     const response = await axios.put(
//       `${API_URL}/api/accepted/${mentorId}`,
//       { reason, email }, // Body request sesuai spesifikasi API
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };


// ============================================
// ✅ MENTOR FEATURE SECTION
// ============================================
// 🔹 Update Mentor Profile
export const updateMentorProfile = async (formData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login kembali.");
    }

    const response = await axios.put(`${API_URL}/api/profile/mentor/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// ============================================
// ✅ CATEGORY FEATURE SECTION
// ============================================

// 🔹 Create Category (Admin Only)
export const createCategory = async (categoryName) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await axios.post(
      `${API_URL}/api/categories/new`,
      { name: categoryName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Berisi list category terbaru
  } catch (error) {
    handleApiError(error);
  }
};


// 🔹 Mendapatkan Semua Kategori
export const getCategories = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


// ============================================
// ✅ LEARNING PATH FEATURE SECTION
// ============================================
// 🔹 Membuat Learning Path Baru (dengan upload file)
export const createLearningPath = async (name, categoryName, pictureFile) => {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("categories", categoryName);
    formData.append("picture", pictureFile);

    const response = await axios.post(`${API_URL}/api/learn/new`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


// ============================================
// ✅ NOTIFICATION FEATURE SECTION
// ============================================
// 🔹 Membuat Notifikasi
export const createNotification = async (title, message) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${API_URL}/api/notif/new`,
      { title, message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// 🔹 Mendapatkan Semua Notifikasi
export const getAllNotifications = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/api/notif/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


// ============================================
// ✅ VOUCHER FEATURE SECTION
// ============================================

/**
 * 🔹 Membuat Voucher Baru
 * Endpoint: POST /api/voucher/new
 * Input: { name, discount, quota, expired }
 * Authorization: Required (Bearer Token)
 */
export const createVoucher = async (voucherData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${API_URL}/api/voucher/new`,
      voucherData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * 🔹 Mengambil Semua Voucher
 * Endpoint: GET /api/voucher/all
 * Authorization: Required (Bearer Token)
 * Output: Array of vouchers
 */
export const getAllVouchers = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/api/voucher/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * 🔹 Menghapus Voucher berdasarkan ID
 * Endpoint: DELETE /api/voucher/:id
 * Authorization: Required (Bearer Token)
 */
export const deleteVoucher = async (voucherId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/api/voucher/${voucherId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
