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